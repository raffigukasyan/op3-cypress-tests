describe('1. Auth-login-page', () => {
    before(() => {
        cy.visit(Cypress.config().baseUrl)
        cy.changeLangAuth();
    });

    it('should move to login page', function () {
        cy.wait(1000);
        cy.xpath("//input[@id='email']", { timeout: 10000 }).should('be.visible');

        cy.xpath("//input[@id='password']", { timeout: 10000 }).should('be.visible');

        cy.xpath("//button[@type='submit']", { timeout: 10000}).should('be.visible');

        cy.xpath("//h2[text()='Войти']").should('be.visible');

    });
})
