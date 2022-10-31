const { MailSlurp } = require('mailslurp-client');

// set your api key with an environment variable `CYPRESS_API_KEY` or configure using `env` property in config file
// (cypress prefixes environment variables with CYPRESS)
const apiKey = Cypress.env('API_KEY')
const mailslurp = new MailSlurp({ apiKey });

Cypress.Commands.add("createInbox", () => {
    return mailslurp.createInbox();
});

Cypress.Commands.add("waitForLatestEmail", (inboxId) => {
    // how long we should hold connection waiting for an email to arrive
    const timeoutMillis = 30_000;
    return mailslurp.waitForLatestEmail(inboxId, timeoutMillis)
});

Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://itdelta.learn.company-policy.com/login', { timeout: 10000 });

    cy.xpath("//input[@id='email']", { timeout: 10000 }).type(email);
    cy.xpath("//input[@id='password']", { timeout: 10000 }).type(password);

    cy.xpath("//button[@type='submit']", { timeout: 10000}).click();

    cy.xpath("//h2[text()='Learning center']").should('be.visible');
});

Cypress.Commands.add('admin', (email, password) => {
    cy.login(email, password);

    cy.xpath("(//button[@class='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'])[1]").click();
    cy.xpath("//a[@href='https://itdelta.learn.company-policy.com/admin']").click();
});

Cypress.Commands.add('question', (questionName, questionType) => {
    cy.xpath("//h2[text()='Edit lesson']").click();
    cy.xpath("//div[@class='flex items-center cursor-pointer mb-3']").click();
    cy.wait(1500);
    cy.xpath("(//input[@type='text'])[1]").type(questionName);
    cy.xpath("(//input[@type='text'])[2]").type(questionName + questionType);
    cy.xpath("//button[@role='switch']").click();
    cy.xpath("(//div[@role='radio'])[" + questionType + "]").click({force:true});
    cy.xpath("//input[@type='number']").type(10);
    cy.xpath("//button[text()='Save']").click();
});
