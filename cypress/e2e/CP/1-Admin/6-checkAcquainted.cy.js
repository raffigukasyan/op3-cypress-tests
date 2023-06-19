describe("CP6. Check Not Acquainted", () => {

  const userNames = Cypress.env('usersArticle');
  before(() => {
  });

  beforeEach(() => {
    cy.login();
  });

  it('checking the ignorance of the article', () => {
    
    //cy.xpath(`//span[text()='${userNames}']/../div`).click();

    for (let i = 0; i < userNames.length; i++) {
      cy.visit('admin/cp/report');
      cy.contains('Report').click();
      cy.xpath('//button[text()="Select"]').click();
      cy.wait(500);


      cy.contains('Select').click();
      cy.contains('my Test').click();
      cy.wait(500);
      cy.contains('first-name last-name').click();
      cy.contains('Save').click();
      cy.wait(500);
      cy.xpath('//button[text()="Show results"]').click();
      cy.wait(1000);
      cy.xpath('//div[@class="grid grid-cols-[max-content] grid-rows-1 overflow-x-scroll lg:block lg:overflow-hidden"]').contains(userNames[i]).prev().click();
      cy.xpath('//div[@class="grid grid-cols-[max-content] grid-rows-1 overflow-x-scroll lg:block lg:overflow-hidden"]').contains(userNames[i]).parent().parent().next().contains('Test article 1').click();
      cy.xpath("//span[text()='Acquainted']").should('be.visible');
    }
  });
});