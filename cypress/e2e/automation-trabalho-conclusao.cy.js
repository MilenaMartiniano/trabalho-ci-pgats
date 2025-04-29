

// 1, 2, 3, 4, 5, 11, 12, 16, 17 e 22

import cadastro from "../pages/cadastro";
import login from "../pages/login";
import menu from "../pages/menu";

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com')
    });


    it('Caso de teste 1: Registrar usuário', () => {
        cadastro.preencherFormulario()

    cy.get('i.fa-user').parent().should('contain', Cypress.env('signUpName'))
    

        
    });

    it('Caso de teste 2: Login do usuário com e-mail e senha corretos', () => {

        menu.irParaLoginCadastro() 

        login.preencherLogin('milena@email.com.br', '123456')
        cy.get('i.fa-user').parent().should('contain', 'Milena')
        
    });

    it('Caso de teste 3: Login de usuário com e-mail e senha incorretos', () => {

    
        menu.irParaLoginCadastro() 

        login.preencherLogin('testeabc@abc.com', '000000')

        cy.get(`.login-form form p`).parent().should('contain', 'Your email or password is incorrect!')

        
    });

    it('Caso de teste 4: Sair do usuário', () => {

        menu.irParaLoginCadastro()
      login.preencherLogin('milena@email.com.br', '123456' )

        cy.get('i.fa-user').parent().should('contain', 'Milena')

        //ação proncipal
        cy.contains('Logout').click()

        //assert
    
        cy.url().should('contain', 'login')
        cy.contains("Login to your account").should("be.visible");
        
    });

    it('Caso de teste 5: Registrar usuário com e-mail existente', () => {
        menu.irParaLoginCadastro() 

        cadastro.iniciarCadastro(`milena@email.com.br`)

        //assert
        cy.get(`.signup-form form p`).should('be.visible').and('contain', 'Email Address already exist!')
        
    });

    it('Caso de teste 11: Verificar assinatura na página do carrinho', () => {

        cy.contains(`Cart`).click()

        cy.url().should('include', '/view_cart')
        cy.contains('Subscription').should('be.visible')

        cy.get('input#susbscribe_email')
            .scrollIntoView()
            .type('milena@email.com')
            cy.get('button#subscribe').click()

            cy.get('.alert-success')
            .should('be.visible')
            .and('contain', 'You have been successfully subscribed!')


    });

    it('Caso de teste 12: Adicionar produtos ao carrinho', () => {
        
        menu.irParaProdutos()

        cy.url().should('include', '/products')
        cy.get('.title').should('be.visible').and('contain', 'All Products')

       
        cy.get('.productinfo.text-center').eq(0).contains('Add to cart').click()
        cy.contains('Continue Shopping').click()

       
        cy.get('.productinfo.text-center').eq(1).contains('Add to cart').click()
        cy.contains('View Cart').click()
        cy.url().should('include', '/view_cart')

      
        cy.get('.cart_description').should('have.length.at.least', 2)

       
        cy.get('.cart_price').should('have.length.at.least', 2).and('be.visible')
        cy.get('.cart_quantity').should('have.length.at.least', 2).and('be.visible')
        cy.get('.cart_total_price').should('have.length.at.least', 2).and('be.visible')

    });


    it('Caso de teste 16: Fazer pedido com login antes de finalizar a compra', () => {
            const timestamp = Date.now()
            const nome = 'Teste QA'
            const email = `tester-${timestamp}@mail.com`
            const senha = '123456'
            Cypress.env('signUpName', nome)
          

          //  cy.visit('https://automationexercise.com')
          
            cy.get('body').should('contain.text', 'Home')
          
  
            cy.contains('Signup / Login').click()
          
    
            cy.get('[data-qa="signup-name"]').type(nome)
            cy.get('[data-qa="signup-email"]').type(email)
            cy.contains('button', 'Signup').click()
          
    

            cadastro.preencherFormulario()

            cy.get('i.fa-user').parent().should('contain', Cypress.env('signUpName'))

          

            cy.contains(`Logged in as ${Cypress.env('signUpName')}`, { timeout: 10000 }).should('be.visible')
          

            cy.visit('https://automationexercise.com/products')
            cy.get('.product-overlay').first().invoke('show')
            cy.contains('Add to cart').click()
            cy.contains('Continue Shopping').click()
          
  
            cy.contains('Cart').click()
          
   
            cy.url().should('include', '/view_cart')
          

            cy.contains('Proceed To Checkout').click()
          

            cy.contains('Address Details').should('be.visible')
            cy.get('textarea[name="message"]').type('Este pedido é um presente')
            cy.contains('Place Order').click()
          
            //Preencher pagamento
            cy.get('[data-qa="name-on-card"]').type('Tester Milena QA')
            cy.get('[data-qa="card-number"]').type('4859647854123')
            cy.get('[data-qa="cvc"]').type('123')
            cy.get('[data-qa="expiry-month"]').type('12')
            cy.get('[data-qa="expiry-year"]').type('2026')
            cy.contains('Pay and Confirm Order').click()
          
     
            cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
          
            //Excluir conta
            cy.contains('Delete Account').click()
          
            cy.contains('Account Deleted!').should('be.visible')
            cy.contains('Continue').click()
          })

    it('Caso de teste 17: Remover produtos do carrinho', () => {

        cy.contains('Home').should('be.visible')


        cy.contains('Products').click()
        cy.get('.product-image-wrapper').first().within(() => {
          cy.contains('Add to cart').click()
        })
      
  
        cy.contains('Continue Shopping').click()
      

        cy.contains('Cart').click()
      

        cy.url().should('include', '/view_cart')
        cy.get('.cart_info').should('be.visible')
      

        cy.get('.cart_quantity_delete').first().click()
      
 
        cy.get('.cart_info tbody tr').should('have.length', 0)
        
    });

    it('Caso de teste 22: Adicionar ao carrinho a partir de Itens recomendados', () => {

        cy.scrollTo('bottom')
        cy.contains('recommended items').should('be.visible')

        cy.get('.recommended_items .productinfo.text-center').first().within(() => {
            cy.get('.add-to-cart').click({ force: true })
          })
        
          cy.contains('View Cart').click()
        
   
          cy.url().should('include', '/view_cart')
          cy.get('.cart_info').should('be.visible')

        
    });
    
  })

    

