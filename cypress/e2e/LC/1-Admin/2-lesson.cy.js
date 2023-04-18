describe("LC.A1. Create lessons", () => {
    // const skipCookie = Cypress.env('shouldSkipEduTests');
    beforeEach(() => {
        cy.admin();
    });

    it('should create lesson(checkbox + radio)', function () {
        const lName = Cypress.env('lessonCheckboxRadio');
        const qNameR = Cypress.env('questionRadio');
        const qNameCB = Cypress.env('questionCheckbox');

        //// Create lesson ////
        // cy.xpath("//a[text()='Lessons']").click()
        cy.visit('/admin/lc/lessons')

        cy.xpath("//button[text()='Add lesson']").click();
        cy.xpath("//input[@type='text']").first().type(lName);
        cy.xpath("//button[@role='switch']").click();
        cy.xpath("//button[text()='Save']").should('be.visible').click();
        cy.xpath("//p[text()='Success!']").should('be.visible');

        //// Edit lesson ////
        // Getting access to lesson
        cy.accessAllItems();
        cy.xpath("(//div[text()='" + lName + "'])[1]").click();

        // Create radio question
        cy.question(qNameR, 2);
        // cy.addAnswers(1);

        // Create checkbox question
        cy.question(qNameCB, 3);
        // cy.addAnswers(2);

        // Assert question added
        cy.xpath("//span[text()='Active']").should('be.visible');

        // delete lesson
        // cy.visit('/admin/lc/lessons');
        // cy.xpath(`//div[text()='${lName}']/../../../../../th[4]/div/div[2]`).last().click();
        // cy.get('button').contains('Delete').click();
        // cy.xpath("//p[text()='Success!']").should('be.visible');
        
    });

    it('should create lesson(text)', function () {
        const lName = Cypress.env('lessonText');
        const qName = Cypress.env('questionText');

        //// Create lesson ////
        cy.xpath("//a[text()='Lessons']").click()
        cy.xpath("//button[text()='Add lesson']").click();

        cy.xpath("//input[@type='text']").first().type(lName);
        cy.xpath("//button[@role='switch']").click();
        cy.xpath("//button[text()='Save']").scrollIntoView()
        cy.xpath("//button[text()='Save']").should('be.visible').click();
        cy.xpath("//p[text()='Success!']").should('be.visible');

        //// Edit lesson ////
        // Getting access to lesson
        cy.accessAllItems();
        cy.xpath("(//div[text()='" + lName + "'])[1]").click();

        // Create text question
        cy.question(qName, 1);

        // Assert question added
        cy.xpath("//span[text()='Active']").should('be.visible');

        // delete lesson
        // cy.visit('/admin/lc/lessons');
        // cy.xpath(`//div[text()='${lName}']/../../../../../th[4]/div/div[2]`).last().click();
        // cy.get('button').contains('Delete').click();
        // cy.xpath("//p[text()='Success!']").should('be.visible');
        
    });

    afterEach(function onAfterEach() {
        // if (this.currentTest.state === 'failed') {
        //     cy.setCookie(skipCookie, 'true');
        // }
    });
});
