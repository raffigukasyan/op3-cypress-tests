describe('2-Auth-login-valid.cy.js', () => {
    beforeEach(() => {
        cy.visit(Cypress.config().authUrl);
    });

    // it('should show landing page', function () {
    //     cy.xpath("//span[@class='block text-white']").should('be.visible');
    // });

    it('should move to login page and log in', function () {
        const username = Cypress.env('email')
        const password = Cypress.env('password')

        cy.xpath("//input[@id='email']", { timeout: 10000 }).should('be.visible');
        cy.xpath("//input[@id='email']", { timeout: 10000 }).type(username);

        cy.xpath("//input[@id='password']", { timeout: 10000 }).should('be.visible');
        cy.xpath("//input[@id='password']", { timeout: 10000 }).type(password, { log: false });

        cy.xpath("//button[@type='submit']", { timeout: 10000}).should('be.visible');
        cy.xpath("//button[@type='submit']", { timeout: 10000}).click();
        cy.wait(1500);
        cy.visit(Cypress.config().authUrl);
        cy.wait(1500);
        cy.xpath("//h2[text()='Учебный центр']").should('be.visible');

    });
})
