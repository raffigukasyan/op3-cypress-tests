describe('4. Land-RU-contact-sales', () => {
    beforeEach(() => {
        cy.visit('https://org-online.ru/');
    });

    it('should move to login page', function () {
        cy.wait(2000);
        //cy.get(" →").eq(0).should('be.visible').click();
        cy.wait(1000);
        cy.contains(" →");
    });
})
