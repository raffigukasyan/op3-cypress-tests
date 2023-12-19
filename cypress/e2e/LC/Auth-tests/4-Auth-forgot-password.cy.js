const {recurse} = require("cypress-recurse");
describe('4-Auth-forgot-password.cy.js', () => {

    it('should move to login page and click "forgot password"', function () {
        cy.visit(Cypress.config().authUrl);
        cy.contains("Забыли пароль?").should('be.visible');
        cy.contains("Забыли пароль?").click();
        cy.wait(3000);
        cy.xpath("//input[@id='email']", { timeout: 10000 }).should('be.visible');
        cy.contains("Ссылка для сброса пароля электронной почты").should('be.visible');
    });



})
