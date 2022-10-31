describe('Try to pass course', () => {
    it('completing the course created in the admin panel testing', () => {
        cy.xpath("//h3[text()='" + Cypress.env('courseName') + "']")
        .click();
    });
})
