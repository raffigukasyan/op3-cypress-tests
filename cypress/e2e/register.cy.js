const {MailSlurp} = require("mailslurp-client");

describe('B. Register user', () => {
    // Create inbox for testing invite
    let inboxId;
    let emailAddress;
    it('can generate a new email address and sign up', () => {
        cy.createInbox().then(inbox => {
            assert.isDefined(inbox)

            inboxId = inbox.id
            emailAddress = inbox.emailAddress;

            cy.visit(Cypress.config().baseUrl);

            // Click on register button
            cy.xpath("//a[@href='/register']").click();

            // Type credentials
            cy.xpath("//input[@id='name']").type(String(Math.random() * 100));
            cy.xpath("//input[@id='email']").type(emailAddress);
            cy.xpath("//input[@id='password']").type(Cypress.env('password'));
            cy.xpath("//input[@id='password_confirmation']").type(Cypress.env('password'));

            // Click on submit button
            cy.xpath("//button[@type='submit']").click();
        });
    });

    let confirmationLink;
    it('can receive the confirmation email and extract the code', () => {
        const apiKey = Cypress.env('API_KEY')
        const mailslurp = new MailSlurp({ apiKey });

        // wait for an email in the inbox
        cy.waitForLatestEmail(inboxId).then(async email => {
            // verify we received an email
            assert.isDefined(email);

            // verify that email contains the code

            const linkResult = await mailslurp.emailController.getEmailLinks({
                emailId: email.id,
            });

            confirmationLink = linkResult.links[1];
        });

        cy.visit(confirmationLink);
    });
});
