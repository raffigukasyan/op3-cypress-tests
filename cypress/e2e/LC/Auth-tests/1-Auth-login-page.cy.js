describe('1. Auth-login-page', () => {
    beforeEach(() => {
        cy.visit(Cypress.config().authUrl);
    });

    it('should move to login page', function () {

        cy.xpath("//input[@id='email']", { timeout: 10000 }).should('be.visible');

        cy.xpath("//input[@id='password']", { timeout: 10000 }).should('be.visible');

        cy.xpath("//button[@type='submit']", { timeout: 10000}).should('be.visible');

        cy.xpath("//h2[text()='Учебный центр']").should('be.visible');

    });
})
