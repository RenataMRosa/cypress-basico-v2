/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste'

        cy.get('input[name="firstName"]').type('Renata')
        cy.get('input[name="lastName"]').type('Rosa')
        cy.get('input[type="email"]').type('renata@exemplo.com')
        cy.get('textarea[name="open-text-area"]').type(longText, { delay : 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Renata')
        cy.get('#lastName').type('Rosa')
        cy.get('#email').type('renata.com')
        cy.get('#open-text-area').type('teste')
    //  cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
         cy.get('#phone')
           .type('abcdef')
           .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Renata')
        cy.get('#lastName').type('Rosa')
        cy.get('#email').type('renata@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
    //  cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa o campo nome', function(){
        cy.get('#firstName')
          .type('Renata')
          .should('have.value', 'Renata')
          .clear()
          .should('have.value','')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    //  cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
  })
  