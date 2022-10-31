describe("Create lessons", () => {
    beforeEach(() => {
        cy.admin(Cypress.env('email'), Cypress.env('password'));
    });

    it('should create lesson(checkbox + radio)', function () {
        //// Create lesson ////
        cy.xpath("//a[text()='Lessons']").click()
        cy.xpath("//button[text()='Add lesson']", { timeout: 10000 }).click();

        cy.xpath("//input[@type='text']", {timeout: 5000}).type(Cypress.env('lessonCheckboxRadio'));
        cy.xpath("//button[text()='Save']").should('be.visible').click();
        cy.xpath("//p[text()='Success!']", { timeout: 10000 }).should('be.visible');

        //// Edit lesson ////
        // Getting access to lesson
        cy.xpath("//button[text()='3']", {timeout:8500}).click({force:true});
        cy.wait(1500);
        cy.xpath("(//div[text()='" + Cypress.env('lessonCheckboxRadio') + "'])[1]").click();
        // Set lesson as active
        cy.xpath("//button[@role='switch']").click();

        // Create radio question
        cy.question(Cypress.env('questionRadio'), 2);

        // Create checkbox question
        cy.question(Cypress.env('questionCheckbox'), 3);

        cy.xpath("//p[text()='Success!']", { timeout: 10000 }).should('be.visible');

        // Assert question added
        cy.xpath("//span[text()='Active']").should('be.visible');
    });

    it('should create lesson(text)', function () {
        //// Create lesson ////
        cy.xpath("//a[text()='Lessons']").click()
        cy.xpath("//button[text()='Add lesson']", { timeout: 10000 }).click();

        cy.xpath("//input[@type='text']", {timeout: 5000}).type(Cypress.env('lessonText'));
        cy.xpath("//button[text()='Save']").should('be.visible').click();
        cy.xpath("//p[text()='Success!']", { timeout: 10000 }).should('be.visible');

        //// Edit lesson ////
        // Getting access to lesson
        cy.wait(1500);
        cy.xpath("//button[text()='3']", {timeout:8500}).click({force:true});
        cy.wait(1500);
        cy.xpath("(//div[text()='" + Cypress.env('lessonText') + "'])[1]").click();
        // Set lesson as active
        cy.xpath("//button[@role='switch']").click();

        // Create text question
        cy.question(Cypress.env('questionText'), 1);

        // Assert question added
        cy.xpath("//span[text()='Active']").should('be.visible');
    });

    it('should create lesson(text + checkbox + radio)', function () {
        //// Create lesson ////
        cy.xpath("//a[text()='Lessons']").click()
        cy.xpath("//button[text()='Add lesson']", { timeout: 10000 }).click();

        cy.xpath("//input[@type='text']", {timeout: 5000}).type(Cypress.env('lessonTextCheckboxRadio'));
        cy.xpath("//button[text()='Save']").should('be.visible').click();
        cy.xpath("//p[text()='Success!']", { timeout: 10000 }).should('be.visible');

        //// Edit lesson ////
        // Getting access to lesson
        cy.xpath("//button[text()='4']", {timeout:8500}).click({force:true});
        cy.wait(1500);
        cy.xpath("(//div[text()='" + Cypress.env('lessonTextCheckboxRadio') + "'])[1]").click();
        // Set lesson as active
        cy.xpath("//button[@role='switch']").click();

        // Create text question
        cy.question(Cypress.env('questionText'), 1);

        // Create radio question
        cy.question(Cypress.env('questionRadio'), 2);

        // Create checkbox question
        cy.question(Cypress.env('questionCheckbox'), 3);

        // Assert question added
        cy.xpath("//span[text()='Active']").should('be.visible');
    });

    // TODO: Delete lesson after test
    it('should ', function () {

    });
});
