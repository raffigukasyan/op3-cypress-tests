describe("CP6. Check Not Acquainted", () => {

  let articleName = Cypress.env('articleName');
  const userNames = Cypress.env('usersArticle');
  before(() => {
  });

  beforeEach(() => {
    cy.login();
  });

  it('checking the ignorance of the article', () => {
    
    //cy.xpath(`//span[text()='${userNames}']/../div`).click();

      cy.visit('admin/cp/report');
    cy.contains('Report').click();
    cy.xpath('//button[text()="Show results"]').click();
    cy.wait(1000);
    cy.xpath('//div[@class="grid grid-cols-[max-content] grid-rows-1 overflow-x-scroll lg:block lg:overflow-hidden"]').contains(userNames).prev().click();
    cy.xpath('//div[@class="grid grid-cols-[max-content] grid-rows-1 overflow-x-scroll lg:block lg:overflow-hidden"]').contains(userNames).parent().parent().next().contains(articleName).click();
    cy.xpath("//span[text()='Acquainted']").should('be.visible');
  });
});