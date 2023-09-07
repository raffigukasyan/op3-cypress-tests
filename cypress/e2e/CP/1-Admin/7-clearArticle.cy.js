describe("CP7. Clear Data", () => {
  let articleName = Cypress.env('articleName');
  
  beforeEach(() => {
    cy.admin();
  });

  it('delete articles', function () {
    cy.visit('admin/cp/post');
    cy.wait(1000);
    cy.accessAllItems();
    cy.xpath(`//div[text()="${articleName}"]/../../../../../th[3]/div/div[3]`).first().click();
    cy.get('button').contains('Delete').click();
    cy.xpath("//p[text()='Success!']").should('be.visible');
  });
});