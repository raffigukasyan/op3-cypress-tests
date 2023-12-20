describe('2. Land-RU-read-more-study', () => {
    beforeEach(() => {
        cy.visit('https://org-online.ru/');
    });

    it('should click study button', function () {
        cy.wait(2000);
        cy.get('a[href*="/learning-center"]').eq(0).should('be.visible').click();
    });
})


//href="/learning-center"