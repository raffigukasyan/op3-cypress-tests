const {MailSlurp} = require("mailslurp-client");
const {recurse} = require("cypress-recurse");

describe('A2. Register user', () => {
    let userEmail;
    let userName;
    let code;
    let page = document.createElement('div');

    before(() => {
        cy.task("getUserEmail").then((user) => {
            cy.log(user.email);
            cy.log(user.pass);
            userEmail = user.email;
            userName = user.email.replace("@ethereal.email", "");
        })
    })

    it('can generate a new email address and sign up', () => {
      cy.visit(Cypress.config().registerUrl);

        // Type Email
        cy.xpath("//input[@id='email']").type(userEmail);
        cy.xpath("//button[@type='submit']").click();
        cy.wait(3500);

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
                    //console.log(html);
                    page.innerHTML = html;
                    let p = page.querySelectorAll('p')
                    code = parseInt(p[0].innerText.replace(/[^\d]/g, ''));


                    // Confirmation Email
                    cy.xpath("//input[@id='code']").type(code);
                    cy.xpath("//button[@type='submit']").click();
                    cy.wait(2000);
                })

        // Type credentials
        cy.xpath("//input[@id='name']").type(String(Math.random() * 100));
        cy.xpath("//input[@id='last_name']").type(String(Math.random() * 100));
        cy.xpath("//input[@id='password']").type(Cypress.env('password'), { log: false });
        cy.xpath("//input[@id='password_confirmation']").type(Cypress.env('password'), { log: false });

        // Click on submit button
       cy.xpath("//button[@type='submit']").click();
       cy.wait(3800);
       cy.location('pathname').should('eq', '/learning/courses')
    });



});
