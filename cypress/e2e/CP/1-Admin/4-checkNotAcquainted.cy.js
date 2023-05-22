describe("CP3. Check Not Acquainted", () => {

  const userNames = Cypress.env('usersArticle');

  before(() => {
  });

  beforeEach(() => {
    cy.login();
  });

  it('checking the ignorance of the article', () => {
    cy.visit('admin/cp/report');
    cy.contains('Report').click();

    cy.xpath('//button[text()="Show results"]').click();
    cy.wait(500);

    for (let i = 0; i < userNames.length; i++) {
      cy.contains(userNames[i]).prev().click();
      cy.contains(userNames[i]).parent().parent().next().contains('Test article 1').click();
      cy.xpath("//span[text()='Not acquainted']");
      cy.wait(500);
      cy.visit('admin/cp/report');
      cy.xpath('//button[text()="Show results"]').click();
      cy.wait(500);
    }
  })
})