const { recurse } = require('cypress-recurse')

describe("C. Invite user by 2 ways", () => {
    let userEmail;
    let userName;

    before(() => {
        cy.task("getUserEmail").then((user) => {
            cy.log(user.email);
            cy.log(user.pass);
            userEmail = user.email;
            userName = user.email.replace("@ethereal.email", "");
        })
        cy.admin();
    })

    it('should invite by admin tools', function () {
        cy.visit('/admin/user')
        cy.wait(3000);

        // click button add user
        cy.xpath("//button[text()='Add user']").click();
        cy.wait(1500);

        cy.xpath("//span[text()='Name *']").next().type('QA');
        cy.xpath("//span[text()='Last name']").next().type('User');
        cy.xpath("//span[text()='Email *']").next().type('qaUser@mail.rui');

        cy.xpath("//input[@type='tel']").clear().type("+7999" + Math.random() * 100);

        cy.xpath("//span[text()='Password *']").next().find('input').clear().type('12345678');
        cy.xpath("//span[text()='Repeat password *']").next().find('input').clear().type('12345678');


    })





    // it('should invite by admin tools', function () {
    //     cy.admin();
    //
    //     // Go to add user page
    //     cy.xpath("//a[text()='Users']").click();
    //     cy.xpath("//button[text()='Add user']").click();
    //
    //     // Input credentials
    //     cy.xpath("(//input[@type='text'])[1]").type(String(Math.random() * 100));
    //     cy.xpath("(//input[@type='text'])[2]").type("QA");
    //     cy.xpath("//input[@type='email']").type("testAddUser+" + Math.random() * 100 + "@lc.com");
    //     cy.xpath("//input[@type='tel']").type("+7999" + Math.random() * 100);
    //     cy.xpath("(//input[@type='password'])[1]").type(Cypress.env('password'), { log: false });
    //     cy.xpath("(//input[@type='password'])[2]").type(Cypress.env('password'), { log: false });
    //
    //     // Click on submit button
    //     cy.xpath("//button[text()='Save']").click();
    //
    //     // Assert user invited
    //     cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
    // });

    // afterEach(function onAfterEach() {
    //     if (this.currentTest.state === 'failed') {
    //         Cypress.runner.stop();
    //     }
    // });
});