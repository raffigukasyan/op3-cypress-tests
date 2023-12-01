describe('LC.Z. Clear all created learning items', () => {

    beforeEach(() => {
        cy.admin();
    });

    it('should delete course', function () {
      cy.visit('/admin/lc/courses');
      cy.wait(500);
      
        cy.xpath(`//div[text()='${Cypress.env("courseName")}']`).parent().parent().parent().parent().parent().find('.tooltip').last().click();
        cy.wait(500);
        cy.get('button').contains('Delete').click();
        cy.xpath("//p[text()='Success!']").should('be.visible');
    });

    it('should delete lessons', function () {
        cy.visit('/admin/lc/lessons');
        cy.wait(500);
        cy.accessAllItems();
        cy.xpath(`//div[text()='${Cypress.env('lessonText')}']`).parent().parent().parent().parent().parent().find('.tooltip').last().click();
        cy.get('button').contains('Delete').click();
        cy.wait(500);
        cy.xpath("//p[text()='Success!']").should('be.visible');

        cy.wait(500);
        cy.visit('/admin/lc/lessons');
        cy.wait(500);
        cy.accessAllItems();
        cy.xpath(`//div[text()='${Cypress.env('lessonCheckboxRadio')}']`).parent().parent().parent().parent().parent().find('.tooltip').last().click();
        cy.get('button').contains('Delete').click();
        cy.wait(500);
        cy.xpath("//p[text()='Success!']").should('be.visible');

        // cy.wait(500);
        // cy.visit('/admin/lc/lessons');
        // cy.wait(500);
        // cy.xpath(`//div[text()='${Cypress.env('lessonTimer')}']`).parent().parent().parent().parent().parent().find('.tooltip').last().click();
        // cy.get('button').contains('Delete').click();
        // cy.xpath("//p[text()='Success!']").should('be.visible');
    });

    it('delete curriculum', function () {
        cy.visit('/admin/lc/curriculums');
        cy.xpath(`//div[text()='${Cypress.env('curriculumName')}']`).click();
        cy.get('button').contains('Delete').click();
        cy.xpath("//p[text()='Success!']").should('be.visible');
    });

    it('delete course group', function () {
        cy.visit('/admin/lc/groups');
        cy.xpath(`//div[text()='${Cypress.env('courseGroupName')}']/../../../../../th[5]/div/div[2]`).last().click();
        cy.get('button').contains('Delete').click();
        cy.xpath("//p[text()='Success!']").should('be.visible');
    });

});
