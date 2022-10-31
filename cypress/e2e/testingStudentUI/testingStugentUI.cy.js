describe('Authenticated student test', () => {
    it('should scroll page, open course and travel him', function () {
        cy.xpath("//h3[text()='Linux']")
            .click();

        cy.xpath("//p[text()='Переменная PATH в Linux']", { timeout: 10000})
            .click();

        cy.xpath("//h1[text()]", { timeout: 5000}).should('be.visible')

        cy.xpath("//p[text()='Переменные окружения в Linux']", { timeout: 10000 })
        .click();

        cy.xpath("//h1[text()='Переменные окружения в Linux']", { timeout: 10000 }).should('be.visible')
    });

    it('should change language', function () {
        cy.xpath("//button[@class='h-8 w-8 max-w-xs bg-white flex items-center border-2 border-gray-300 justify-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-50']")
            .click();

        cy.xpath("//a[text()='ru']").click()

        cy.xpath("//h2[text()='Учебный центр']").should('be.visible');
    });
})
