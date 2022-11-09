describe('F. Create course', () => {
    beforeEach(() => {
        cy.admin(Cypress.env('email'), Cypress.env('password'), { log: false });
    });

    it('should create course', function () {
        // Go to add courses page
        cy.xpath("//a[text()='Courses']").click();
        cy.xpath("//button[@class='max-w-xs mr-2 justify-center rounded-md border border-transparent shadow-sm px-4 py-auto text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm bg-indigo-500 hover:bg-indigo-700']")
            .click();

        cy.xpath("(//input[@type='text'])[1]").type(Cypress.env('courseName'));
        cy.xpath("//textarea").type("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci " +
            "eligendi harum hic quidem. Aliquam amet architecto, id illum laboriosam maxime nobis omnis perspiciatis " +
            "porro provident, quidem reiciendis sequi voluptate voluptatem.")
        // Set course as active

        // Add lessons for course
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
