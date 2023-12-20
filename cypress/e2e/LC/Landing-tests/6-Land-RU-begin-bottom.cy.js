describe('6. Land-RU-begin-bottom', () => {
    beforeEach(() => {
        cy.visit('https://org-online.ru/');
    });
    it('should click bottom begin button', function () {
        cy.wait(2000);
        cy.get('a[href*="register"]').eq(2).should('be.visible').click();
    });
})
