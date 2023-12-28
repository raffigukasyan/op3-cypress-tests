describe('2-Auth-RU-login-valid.cy.js', () => {
    before(() => {
        cy.visit(Cypress.config().baseUrl);
        cy.changeLangAuth();
    });

    it('should move to login page and log in', function () {
        const username = Cypress.env('email');
        const password = Cypress.env('password');


        cy.xpath("//input[@id='email']", { timeout: 10000 }).should('be.visible');
        cy.xpath("//input[@id='email']", { timeout: 10000 }).type(username);

        cy.xpath("//input[@id='password']", { timeout: 10000 }).should('be.visible');
        cy.xpath("//input[@id='password']", { timeout: 10000 }).type(password, { log: false });

        cy.xpath("//button[@type='submit']", { timeout: 10000}).should('be.visible');
        cy.xpath("//button[@type='submit']", { timeout: 10000}).click();
        cy.wait(3000);
        cy.xpath("//h2[text()='Учебный центр']").should('be.visible');

    });
})
