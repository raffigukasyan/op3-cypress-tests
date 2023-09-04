const {MailSlurp} = require("mailslurp-client");
const {recurse} = require("cypress-recurse");

describe('A2. Register user', () => {
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
        cy.location('pathname').should('eq', '/learning/courses')
    });
});
