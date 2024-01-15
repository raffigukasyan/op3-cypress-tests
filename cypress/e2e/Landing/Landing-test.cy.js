describe('Landing-Test.js', () => {
    beforeEach(() => {
        const ctx = Cypress.mocha.getRunner().suite.ctx
        if (Cypress.config().baseUrl !== 'http://tenant1.localhost:8001/') {
            ctx.skip();
        }
    })
    let landingUrl = 'https://org-online.ru';

    it('should move to landing and perform tests', function () {
        cy.visit(landingUrl);
        cy.xpath("//a[text()='Начать']", { timeout: 10000 }).eq(0).should('be.visible').click();
        //cy.wait(2500);
        cy.url().should('include', '/register');
        cy.wait(2500);
        cy.visit(landingUrl);
        cy.xpath("//a[text()='Начать']", { timeout: 10000 }).eq(1).should('be.visible').click();
        //cy.wait(2500);
        cy.url().should('include', '/register');
        cy.wait(2500);
        cy.visit(landingUrl);
        cy.xpath("//a[text()='Подробнее']", { timeout: 10000 }).eq(0).should('be.visible').click();
        //cy.wait(2500);
        cy.url().should('include', '/learning-center');
        cy.wait(2500);
        cy.visit(landingUrl);
        cy.xpath("//a[text()='Подробнее']", { timeout: 10000 }).eq(1).should('be.visible').click();
        //cy.wait(2500);
        cy.url().should('include', '/policy');
        cy.visit(landingUrl);
    });
});
