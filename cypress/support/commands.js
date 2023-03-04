Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Renata')
    cy.get('#lastName').type('Rosa')
    cy.get('#email').type('renata@gmail.com')
    cy.get('#open-text-area').type('teste')
//  cy.get('button[type="submit"]').click() 
    cy.contains('button', 'Enviar').click()
})