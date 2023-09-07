describe('LC.Z. Clear all created learning items', () => {

    beforeEach(() => {
        cy.admin();
    });

    it('should delete course', function () {
      cy.visit('/admin/lc/courses');
      cy.wait(1500);
        cy.accessAllItems();
        cy.xpath(`//div[text()='${Cypress.env('courseName')}']/../../../../../th[4]/div/div[2]`).last().click();
        cy.get('button').contains('Delete').click();
        cy.xpath("//p[text()='Success!']").should('be.visible');
    });

    it('should delete lessons', function () {
      cy.visit('/admin/lc/lessons');
      cy.wait(1000);
        cy.accessAllItems();
        cy.xpath(`//div[text()='${Cypress.env('lessonText')}']/../../../../../th[4]/div/div[2]`).last().click();
        cy.get('button').contains('Delete').click();
        cy.xpath("//p[text()='Success!']").should('be.visible');

        cy.visit('/admin/lc/lessons');
        cy.xpath(`//div[text()='${Cypress.env('lessonCheckboxRadio')}']/../../../../../th[4]/div/div[2]`).last().click();
        cy.get('button').contains('Delete').click();
        cy.xpath("//p[text()='Success!']").should('be.visible');
    });

    it('delete curriculum', function () {
        cy.visit('/admin/lc/curriculums');
        cy.xpath(`//div[text()='${Cypress.env('curriculumName')}']/../../../../../th[4]/div/div[2]`).last().click();
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
