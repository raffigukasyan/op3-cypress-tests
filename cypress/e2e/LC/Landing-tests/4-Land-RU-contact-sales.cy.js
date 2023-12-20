describe('4. Land-RU-contact-sales', () => {
    beforeEach(() => {
        cy.visit('https://org-online.ru/');
    });

    it('should move to login page', function () {
        cy.wait(2000);
        //cy.get(" →").eq(0).should('be.visible').click();'[id="headlessui-menu-item-:r4:"]'
        cy.wait(1000);
        cy.get('[class="text-base font-medium text-blue-700 hover:text-blue-600"]').contains("Связаться").click();

    });
})
