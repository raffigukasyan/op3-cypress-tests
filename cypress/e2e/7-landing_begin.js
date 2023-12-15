describe('Landing1. Begin test', () => {
    beforeEach(() => {
        cy.visit(Cypress.config().landingUrl);
    });


    /*it('should move to login page and log in', function () {
        const username = Cypress.env('email')
        const password = Cypress.env('password')

        //cy.xpath("//a[@class='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900']").click();

        cy.xpath("//input[@id='email']", { timeout: 10000 }).type(username);
        cy.xpath("//input[@id='password']", { timeout: 10000 }).type(password, { log: false });

        cy.xpath("//button[@type='submit']", { timeout: 10000}).click();
        cy.wait(2500);

        cy.xpath("//h2[text()='Learning center']").should('be.visible');
    });*/
})
