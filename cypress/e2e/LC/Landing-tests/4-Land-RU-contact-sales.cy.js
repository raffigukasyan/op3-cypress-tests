describe('4. Land-RU-contact-sales', () => {
    beforeEach(() => {
        cy.visit('https://org-online.ru/');
    });

    it("Click contact sales to check for modal box", function () {
        cy.wait(2000);
        cy.get('[class="text-base font-medium text-blue-700 hover:text-blue-600"]').eq(0).contains("Связаться").click();
        cy.wait(1000);
        cy.contains("Отправить нам сообщение");

    });
})
