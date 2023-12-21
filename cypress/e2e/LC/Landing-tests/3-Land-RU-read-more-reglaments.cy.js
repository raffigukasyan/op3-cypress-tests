describe('3. Land-RU-read-more-reglaments', () => {
    beforeEach(() => {
        cy.visit('https://org-online.ru/');
    });

    it('should move to login page', function () {
        cy.wait(2000);
        cy.get('a[href*="/policy"]').eq(0).should('be.visible').click();
    });
})
