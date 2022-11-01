describe('Create course', () => {
    beforeEach(() => {
        cy.admin(Cypress.env('email'), Cypress.env('password'));
    });

    it('should create course', function () {
        // Go to add courses page
        cy.wait(1500);
        cy.xpath("//a[text()='Courses']").click();
        cy.xpath("//button[text()='Add Course']").click();

        cy.xpath("(//input[@type='text'])[1]").type(Cypress.env('courseName'));
        cy.xpath("//textarea").type("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci " +
            "eligendi harum hic quidem. Aliquam amet architecto, id illum laboriosam maxime nobis omnis perspiciatis " +
            "porro provident, quidem reiciendis sequi voluptate voluptatem.")
        // Set course as active

        // Add lessons for course
        cy.xpath("(//input[@type='text'])[last()]").type(Cypress.env('lessonCheckboxRadio2'));
        cy.xpath("//*[text()='" + Cypress.env('lessonCheckboxRadio2') + "']").click();
        cy.xpath("(//input[@type='text'])[last()]").type(Cypress.env('lessonCheckboxRadio'));
        cy.xpath("//*[text()='" + Cypress.env('lessonCheckboxRadio') + "']").click();
        cy.xpath("(//input[@type='text'])[last()]").type(Cypress.env('lessonText'));
        cy.xpath("//*[text()='" + Cypress.env('lessonText') + "']").click();

        // Save course
        cy.xpath("//button[text()='Save']").click();

        // Assert course created
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
    });
});
