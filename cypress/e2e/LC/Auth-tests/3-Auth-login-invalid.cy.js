describe('3-Auth-login-invalid.cy.js', () => {
    beforeEach(() => {
        cy.visit(Cypress.config().authUrl);
    });

    // it('should show landing page', function () {
    //     cy.xpath("//span[@class='block text-white']").should('be.visible');
    // });

    it('should move to login page and type wrong login/password', function () {
        const username = Cypress.env('email')
        const password = Cypress.env('password')

        const wrong_username = Cypress.env('wrong_email')
        const wrong_password = Cypress.env('wrong_password')

        cy.xpath("//input[@id='email']", { timeout: 10000 }).should('be.visible');
        cy.xpath("//input[@id='email']", { timeout: 10000 }).clear();
        cy.xpath("//input[@id='email']", { timeout: 10000 }).type(wrong_username);

        cy.xpath("//input[@id='password']", { timeout: 10000 }).should('be.visible');
        cy.xpath("//input[@id='password']", { timeout: 10000 }).clear();
        cy.xpath("//input[@id='password']", { timeout: 10000 }).type(password, { log: false });

        cy.xpath("//button[@type='submit']", { timeout: 10000 }).should('be.visible');
        cy.xpath("//button[@type='submit']", { timeout: 10000}).click();

        cy.wait(1500);
        cy.contains("Неверное имя пользователя или пароль.").should('be.visible');
        cy.wait(1000);
        cy.xpath("//input[@id='email']", { timeout: 10000 }).clear();
        cy.xpath("//input[@id='email']", { timeout: 10000 }).type(username);
        cy.xpath("//input[@id='password']", { timeout: 10000 }).clear();
        cy.xpath("//input[@id='password']", { timeout: 10000 }).type(wrong_password, { log: false });

        cy.xpath("//button[@type='submit']", { timeout: 10000}).click();
        cy.wait(1000);
        cy.contains("Неверное имя пользователя или пароль.").should('be.visible');
    });
})
