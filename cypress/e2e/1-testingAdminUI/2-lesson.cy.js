describe("D. Create lessons", () => {
    beforeEach(() => {
        cy.admin(Cypress.env('email'), Cypress.env('password'));
    });

    it('should create lesson(checkbox + radio)', function () {
        //// Create lesson ////
        cy.xpath("//a[text()='Lessons']").click()
        cy.xpath("//button[text()='Add lesson']").click();

        cy.xpath("//input[@type='text']").type(Cypress.env('lessonCheckboxRadio'));
        cy.xpath("//button[@role='switch']").click();
        cy.xpath("//button[text()='Save']").should('be.visible').click();
        cy.xpath("//p[text()='Success!']").should('be.visible');

        //// Edit lesson ////
        // Getting access to lesson
        cy.accessAllItems();
        cy.xpath("(//div[text()='" + Cypress.env('lessonCheckboxRadio') + "'])[1]").click();

        // Create radio question
        cy.question(Cypress.env('questionRadio'), 2);
        cy.addAnswers(1);

        // Create checkbox question
        cy.question(Cypress.env('questionCheckbox'), 3);
        cy.addAnswers(2);

        cy.xpath("//p[text()='Success!']").should('be.visible');

        // Assert question added
        cy.xpath("//span[text()='Active']").should('be.visible');
    });

    it('should create lesson(text)', function () {
        //// Create lesson ////
        cy.xpath("//a[text()='Lessons']").click()
        cy.xpath("//button[text()='Add lesson']").click();

        cy.xpath("//input[@type='text']").type(Cypress.env('lessonText'));
        cy.xpath("//button[@role='switch']").click();
        cy.xpath("//button[text()='Save']").should('be.visible').click();
        cy.xpath("//p[text()='Success!']").should('be.visible');

        //// Edit lesson ////
        // Getting access to lesson
        cy.accessAllItems();
        cy.xpath("(//div[text()='" + Cypress.env('lessonText') + "'])[1]").click();

        // Create text question
        cy.question(Cypress.env('questionText'), 1);

        // Assert question added
        cy.xpath("//span[text()='Active']").should('be.visible');
    });

});
