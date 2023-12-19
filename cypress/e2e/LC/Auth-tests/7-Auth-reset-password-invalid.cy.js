const {recurse} = require("cypress-recurse");
describe('7-Auth-reset-password-invalid.cy.js', () => {

    it('requesting reset-password-email', function () {
        cy.visit(Cypress.config().forgotPassURL);

        cy.contains("Забыли пароль?").should('be.visible');
        cy.contains("Забыли пароль?").click();

        cy.wait(1000);

        cy.xpath("//input[@id='email']", { timeout: 10000 }).type('forgotPasswordEmail');
        cy.contains("Ссылка для сброса пароля электронной почты").should('be.visible');
        cy.contains("Ссылка для сброса пароля электронной почты").click();
    });

    it('getting last email', function () {
        cy.wait(3500);
        recurse(
            () => cy.task('getLastEmailFromMailRu'), // Cypress commands to retry
            Cypress._.isObject, // keep retrying until the task returns an object
            {
                timeout: 180000, // retry up to 3 minutes
                delay: 5000, // wait 5 seconds between attempts
            },
        )
            .its('html')
            .then((html) => {
                console.log(html);
                cy.document({ log: false }).invoke({ log: false }, 'write', html)
            })
        cy.get('[class="button button-primary"]').should('have.attr', 'href').then(($btn) => {
            cy.visit($btn);
        });
        cy.wait(5000);
        cy.xpath("//input[@id='email']", { timeout: 10000 }).should('be.visible');
        cy.xpath("//input[@id='password']", { timeout: 10000 }).should('be.visible');
        cy.xpath("//input[@id='password_confirmation']", { timeout: 10000 }).should('be.visible');
        cy.get('button').should('be.visible');
    });
    it('try in-valid passwords', function () {
        cy.wait(3500);

        cy.xpath("//input[@id='email']", { timeout: 10000 }).should('be.visible');


        cy.xpath("//input[@id='password']", { timeout: 10000 }).should('be.visible');
        cy.xpath("//input[@id='password']", { timeout: 10000 }).type(password);

        cy.xpath("//input[@id='password_confirmation']", { timeout: 10000 }).should('be.visible');
        cy.xpath("//input[@id='password_confirmation']", { timeout: 10000 }).type(wrong_password);

        cy.get('button').should('be.visible').click();
        cy.wait(1000);
        //cy.contains
        cy.wait(2000);

        cy.xpath("//input[@id='password']", { timeout: 10000 }).clear();
        cy.xpath("//input[@id='password']", { timeout: 10000 }).type(wrong_password);

        cy.xpath("//input[@id='password_confirmation']", { timeout: 10000 }).clear();
        cy.xpath("//input[@id='password_confirmation']", { timeout: 10000 }).type(password);

        cy.get('button').click();
        cy.wait(1000);
        //cy.contains
    });
})
