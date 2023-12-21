describe('1. Land-RU-begin-top', () => {
    beforeEach(() => {
        cy.visit('https://org-online.ru/');
    });

    it('should click top begin button', function () {
        cy.wait(2000);
        cy.get('a[href*="register"]').eq(1).should('be.visible').click();
    });
})
