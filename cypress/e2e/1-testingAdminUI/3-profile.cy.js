describe("E. Profile editing", () => {
    beforeEach(() => {
        cy.admin(Cypress.env('email'), Cypress.env('password'), { log: false });
    });

    it('should assert profile page', function () {
        // Go to editing profile page
        cy.xpath("//button[@class='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-50']").click();
        cy.xpath("//a[@href='https://itdelta.learn.company-policy.com/profile']").click();

        // Input credentials
        cy.xpath("//h1[text()='User Profile']").should('be.visible');
        cy.xpath("//input[@id='new_password']").clear().type(Cypress.env("password"));
        cy.xpath("//button[@type='submit']").should('be.disabled');
        cy.xpath("//input[@id='password']").clear().type(Cypress.env("password"));
        cy.xpath("//button[@type='submit']").click();

        // Assert user registered
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
    });
});
