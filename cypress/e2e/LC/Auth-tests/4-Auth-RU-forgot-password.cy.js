const {recurse} = require("cypress-recurse");
describe('4-Auth-RU-forgot-password.cy.js', () => {

    it('requesting reset-password-email', function () {
        const email = Cypress.env('mailRuEmail');
        cy.visit(Cypress.config().authUrl);

        cy.contains("Забыли пароль?").should('be.visible');
        cy.contains("Забыли пароль?").click();

        cy.wait(65000); //временное решение - org-online.ru высылает письмо сброса пароля  с ограничением, 1 раз в минуту

        cy.xpath("//input[@id='email']", {timeout: 10000}).type(email);
        cy.wait(1000);
        cy.contains("Ссылка для сброса пароля электронной почты").should('be.visible').click();
        cy.wait(1000);
        cy.contains("Ссылка на сброс пароля была отправлена!").should('be.visible');
    });



})
