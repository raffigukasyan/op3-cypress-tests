const {recurse} = require("cypress-recurse");
describe('4. check if forgot-password-mail-link-is-valid', () => {
        /*before(() => {
            //cy.log('');
            //cy.log('');
            let email = '';
    });*/

    /*
    Host	imap.mail.ru
    Port	993
    Security	TLS
    Username	proguniversal@mail.ru
    Password	EYUvahRRYRv02rSJh2DM   // this is imap.mail.ru external app password for proguniversal@mail.ru
    */

    //https://t-zanj7qw9.org-online.ru/login



    it('should move to login page and type wrong login/password', function () {
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
})
