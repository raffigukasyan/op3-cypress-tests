describe("CP4. Check Not Acquainted", () => {

  const userNames = Cypress.env('usersArticle');
  let articleName = Cypress.env('articleName');

  before(() => {
  });

  beforeEach(() => {
    cy.login();
  });

  it('checking the ignorance of the article', () => {
    cy.visit('admin/cp/report');
    cy.contains('Report').click();

    cy.xpath('//button[text()="Show results"]').click();
    cy.wait(5000);


    cy.contains(userNames).prev().click();
    cy.wait(500);
    cy.contains(userNames).parent().parent().next().contains(articleName).click();
    cy.xpath("//span[text()='Not acquainted']");
    cy.wait(500);
    cy.visit('admin/cp/report');
    cy.xpath('//button[text()="Show results"]').click();
    cy.wait(5000);
  })
})