describe("CP6. Check Not Acquainted", () => {

  const userNames = 'first-name last-name';

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
    
    //cy.xpath(`//span[text()='${userNames}']/../div`).click();
    cy.contains(userNames).prev().click();
    cy.contains(userNames).parent().parent().next().contains('Test article 1').click();
    cy.xpath("//span[text()='Acquainted']").should('be.visible');
  });
});