describe('2-Auth-RU-login-valid.cy.js', () => {
    before(() => {
        cy.visit(Cypress.config().baseUrl);
    });

    // it('should show landing page', function () {
    //     cy.xpath("//span[@class='block text-white']").should('be.visible');
    // });

    it('should move to login page and log in', function () {
        const username = Cypress.env('authEmail')
        const password = Cypress.env('authPassword')

        cy.wait(1500)
        cy.get('[aria-haspopup="menu"]').click({force: true});

        cy.xpath("//input[@id='email']", { timeout: 10000 }).should('be.visible');
        cy.xpath("//input[@id='email']", { timeout: 10000 }).type(username);

        cy.xpath("//input[@id='password']", { timeout: 10000 }).should('be.visible');
        cy.xpath("//input[@id='password']", { timeout: 10000 }).type(password, { log: false });

        cy.xpath("//button[@type='submit']", { timeout: 10000}).should('be.visible');
        cy.xpath("//button[@type='submit']", { timeout: 10000}).click();
        cy.wait(1500);
        cy.visit(Cypress.config().baseUrl);
        cy.wait(1500);
        cy.xpath("//h2[text()='Учебный центр']").should('be.visible');

    });
})
