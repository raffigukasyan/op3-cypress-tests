const {MailSlurp} = require("mailslurp-client");

describe("1. Invite user by 2 ways", () => {
    beforeEach(() => {
        cy.admin(Cypress.env('email'), Cypress.env('password'));
    });

    // Create inbox for testing invite
    let inboxId;
    let emailAddress;
    it('can generate a new email address', () => {
        cy.createInbox().then(inbox => {
            assert.isDefined(inbox)

            inboxId = inbox.id
            emailAddress = inbox.emailAddress;
        });
    });

    it('should invite by user menu', function () {
        // Go to invite user page
        cy.xpath("(//button[@class='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'])[1]").click();
        cy.xpath("//a[@href='https://itdelta.learn.company-policy.com/invite-user']").click();

        // Input credentials
        cy.xpath("//*[@id='email']").type(emailAddress);
        cy.xpath("//button[text()='Select groups']").click();
        cy.xpath("//li[text()='Кандидаты Frontend']").click();
        cy.xpath("//button[text()='Save']").click();

        // Assert user have role
        cy.xpath("//li//button").should('be.visible');

        // Click on submit button
        cy.xpath("//button[@type='submit']").click();

        // Assert user invited
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
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
    });

    it('accept invitation', function () {
        cy.xpath("(//button[@class='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'])[1]").click();
        cy.xpath("//a[@href='https://itdelta.learn.company-policy.com/logout']").click();

        cy.wait(2000);
        cy.visit(confirmationLink);

        cy.xpath("//*[@id='first-name']").type('QA');
        cy.xpath("//*[@id='last-name']").type('TEST')
        cy.xpath("//*[@id='password']").type(Cypress.env('password'));
        cy.xpath("//*[@id='new_password']").type(Cypress.env('password'));

        cy.xpath("(//button[@type='submit'])[1]").click();

        cy.xpath("//h2[text()='Learning center']").should('be.visible');
    });

    it('should invite by admin tools', function () {
        // Go to add user page
        cy.xpath("//a[text()='Users']").click();
        cy.xpath("//button[text()='Add user']").click();

        // Input credentials
        cy.xpath("(//input[@type='text'])[1]").type(String(Math.random() * 100));
        cy.xpath("(//input[@type='text'])[2]").type("QA");
        cy.xpath("//input[@type='email']").type("testAddUser+" + Math.random() * 100 + "@lc.com");
        cy.xpath("//input[@type='tel']").type("+7999" + Math.random() * 100);
        cy.xpath("(//input[@type='password'])[1]").type(Cypress.env('password'));
        cy.xpath("(//input[@type='password'])[2]").type(Cypress.env('password'));

        // Click on submit button
        cy.xpath("//button[text()='Save']").click();

        // Assert user invited
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
    });
});
