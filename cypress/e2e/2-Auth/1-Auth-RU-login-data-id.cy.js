describe('2-Auth-RU-login-valid.cy.js', () => {
    const username = Cypress.env('email');
    const password = Cypress.env('password');
    const wrong_username = 'wrong_.ajshd@ajdhajszxmcbnqwdot.wrong';
    const wrong_password = 'wrong_wrong_wrong_wrong_wrong_';
    beforeEach(() => {
        cy.visit(Cypress.config().baseUrl);
        cy.changeLangAuth();
    });

    //cy.get('[data-project-id="7"]').click()
    it('should move to login page and log in', function () {
        cy.get('[data-test-id="email_input"]').should('be.visible').type(username);

        cy.get('[data-test-id="password_input"]').should('be.visible').type(password, { log: false });

        cy.get('[data-test-id="submit_button"]').should('be.visible').click();
        cy.wait(3000);
        cy.visit('/')
        cy.xpath("//h2[text()='Учебный центр']").should('be.visible');
    });

    it('should move to login page and type wrong login/password', function () {

        cy.get('[data-test-id="email_input"]').should('be.visible').clear().type(wrong_username);

        cy.get('[data-test-id="password_input"]').should('be.visible').clear().type(password, { log: false });

        cy.get('[data-test-id="submit_button"]').should('be.visible').click();

        cy.wait(1500);
        cy.contains("Неверное имя пользователя или пароль.").should('be.visible');
        cy.wait(1000);
        cy.get('[data-test-id="email_input"]').should('be.visible').clear().type(username);

        cy.get('[data-test-id="password_input"]').should('be.visible').clear().type(wrong_password, { log: false });

        cy.get('[data-test-id="submit_button"]').should('be.visible').click();
        cy.wait(1000);
        cy.contains("Неверное имя пользователя или пароль.").should('be.visible');
    });
})
