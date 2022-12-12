describe('A. Login test', () => {
    beforeEach(() => {
        console.log('1111111: ' + Cypress.config().baseUrl);
        cy.visit(Cypress.config().baseUrl);
    });

    it('should show landing page', function () {
        cy.xpath("//span[@class='block text-white']").should('be.visible');
    });

    it('should move to login page and log in', function () {
        const username = Cypress.env('email')
        const password = Cypress.env('password')

        cy.xpath("//a[@class='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900']").click();

        cy.xpath("//input[@id='email']", { timeout: 10000 }).type(username);
        cy.xpath("//input[@id='password']", { timeout: 10000 }).type(password, { log: false });

        cy.xpath("//button[@type='submit']", { timeout: 10000}).click();

        cy.xpath("//h2[text()='Learning center']").should('be.visible');
    });
})
