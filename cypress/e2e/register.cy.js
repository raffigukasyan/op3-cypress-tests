const {MailSlurp} = require("mailslurp-client");
const {recurse} = require("cypress-recurse");

describe('B. Register user', () => {
    let userEmail;
    let userName;
    let confirmationLink;

    before(() => {
        cy.task("getUserEmail").then((user) => {
            cy.log(user.email);
            cy.log(user.pass);
            userEmail = user.email;
            userName = user.email.replace("@ethereal.email", "");
        })
    })

    it('can generate a new email address and sign up', () => {
        cy.visit(Cypress.config().baseUrl);

        // Click on register button
        cy.xpath("//a[@href='/register']").click();

        // Type credentials
        cy.xpath("//input[@id='name']").type(String(Math.random() * 100));
        cy.xpath("//input[@id='email']").type(userEmail);
        cy.xpath("//input[@id='password']").type(Cypress.env('password'), { log: false });
        cy.xpath("//input[@id='password_confirmation']").type(Cypress.env('password'), { log: false });

        // Click on submit button
        cy.xpath("//button[@type='submit']").click();
    });

    it('can receive the confirmation email and extract the code', () => {
        cy.wait(1000);
        recurse(
            () => cy.task('getLastEmail'), // Cypress commands to retry
            Cypress._.isObject, // keep retrying until the task returns an object
            {
                timeout: 60000, // retry up to 1 minute
                delay: 5000, // wait 5 seconds between attempts
            },
        )
        .its('html')
        .then((html) => {
            cy.document({ log: false }).invoke({ log: false }, 'write', html)
        })
        cy.xpath("//a[@class='button button-primary']").should('have.attr', 'href').then((href) => {
            confirmationLink = href;
        });
    });
});
