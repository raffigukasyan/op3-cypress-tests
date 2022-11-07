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
    cy.wait(1500);
});

Cypress.Commands.add('question', (questionName, questionType) => {
    cy.wait(1500);
    cy.xpath("//h2[text()='Edit lesson']").click();
    cy.xpath("//div[@class='flex items-center cursor-pointer mb-3']").click();
    cy.xpath("//*[text()='Создание вопроса']").should('be.visible');
    cy.xpath("(//input[@type='text'])[1]").type(questionName);
    cy.xpath("(//input[@type='text'])[2]").type(questionName + questionType);
    cy.xpath("//button[@role='switch']").click();
    cy.xpath("(//div[@role='radio'])[" + questionType + "]").click({force:true});
    cy.xpath("//input[@type='number']").type(10);
    cy.xpath("//button[text()='Save']").click();
});

Cypress.Commands.add('addAnswers', (answer) => {
    cy.xpath("(//*[@class='w-5 h-5 mx-1 text-blue-600 hover:text-red-900 cursor-pointer'])[" + answer + "]").click();
    cy.xpath("//*[text()='Редактирование вопроса']");

    cy.xpath("//*[@class='w-6 h-6 mb-1 text-blue-600 hover:text-blue-900 cursor-pointer']").click();
    cy.xpath("//*[text()='Создание ответа']").should('be.visible');
    cy.xpath("//input[@type='text']").type(Cypress.env('answer1'));
    cy.xpath("(//button[@role='switch'])[1]").click();
    cy.xpath("(//button[@role='switch'])[2]").click();
    cy.xpath("//button[text()='Save']").click();

    cy.xpath("//*[@class='w-6 h-6 mb-1 text-blue-600 hover:text-blue-900 cursor-pointer']").click();
    cy.xpath("//*[text()='Создание ответа']").should('be.visible');
    cy.xpath("//input[@type='text']").type(Cypress.env('answer2'));
    cy.xpath("(//button[@role='switch'])[1]").click();
    cy.xpath("//button[text()='Save']").click();

    cy.xpath("//*[text()='Редактирование вопроса']");
    cy.xpath("//button[text()='Cancel']").click();
    cy.xpath("//*[text()='Edit lesson']");
});

Cypress.Commands.add('accessAllItems', () => {
    cy.wait(3000);
    cy.xpath("(//button[@class='relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm'])[last()]")
    .click();
    cy.wait(3000);
    cy.xpath("(//li)[last()]").click();
});
