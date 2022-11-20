describe('G. Create course group', () => {
    beforeEach(() => {
        cy.admin(Cypress.env('email'), Cypress.env('password'), { log: false });
    });

    it('should create course program', function () {
        // Go to add curriculums page
        cy.wait(1500);
        cy.xpath("//a[text()='Course groups']").click();
        cy.xpath("//button[text()='Add group']").click();

        cy.xpath("//input[@type='text']").type(Cypress.env('courseGroupName'))
        cy.xpath("//textarea").type("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci " +
            "eligendi harum hic quidem. Aliquam amet architecto, id illum laboriosam maxime nobis omnis perspiciatis " +
            "porro provident, quidem reiciendis sequi voluptate voluptatem.")

        // Save group
        cy.xpath("//button[text()='Save']").click();

        // Assert group created
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
    });
});
