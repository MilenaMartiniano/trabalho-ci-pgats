class Cadastro {
    preencherFormulario(){
        const timestamp = new Date().getTime()

        cy.visit('https://automationexercise.com')

       cy.contains('Signup').click() //alternativa 2

        const signUpName = 'Tester QA'

        Cypress.env('signUpName', signUpName)


 cy.get('[data-qa="signup-name"]').type(Cypress.env('signUpName'))

 cy.get('[data-qa="signup-email"]').type(`tester-${timestamp}@mail.com`)
 cy.contains('button', 'Signup').click()


cy.get('input[type=radio]').check('Mrs')
cy.get('[type=password]').type('12345', {log: false})
cy.get('[data-qa="days"]').select('14')
cy.get('[data-qa="months"]').select('9')
cy.get('[data-qa="years"]').select('1995')

cy.get('input[type=checkbox]#newsletter').check()
cy.get('input[type=checkbox]#optin').check()

cy.get('[data-qa="first_name"]').type('Marques')
cy.get('[data-qa="last_name"]').type('Luiz')
cy.get('[data-qa="address"]').type('box 01')
cy.get('[data-qa="country"]').select('Canada')
cy.get('[data-qa="state"]').type('Andre')
cy.get('[data-qa="city"]').type('Sao Paulo')
cy.get('[data-qa="zipcode"]').type('04552-00')
cy.get('[data-qa="mobile_number"]').type('11 85497641')
cy.get('[data-qa="create-account"]').click()

cy.url().should('includes', 'account_created')

cy.get('[data-qa="account-created"]').should('be.visible')
cy.get('[data-qa="continue-button"]').click()
    }

    iniciarCadastro (usuario){
        cy.get('[data-qa="signup-name"]').type('milena')
        cy.get('[data-qa="signup-email"]').type(usuario)
        cy.contains('button', 'Signup').click()
    }

    
}

export default new Cadastro()
