describe("CP3. Article List", () => {

  let articleName = Cypress.env('articleName');
  const userNames = Cypress.env('usersArticle');
  before(() => {
  });

  beforeEach(() => {
    cy.login();
  });

  it('Deactivate Article', function () {
    cy.visit('admin/cp/post');
    cy.accessAllItems();
    cy.xpath(`//div[text()="${articleName}"]/../../../../../th[3]/div/div[2]`).click();
    cy.wait(500);
    cy.xpath('//span[text()="Active"]/../span[2]/button').click();
    cy.wait(500);
    cy.xpath('//button[text()="Save"]').click();
    cy.xpath("//p[text()='Success!']", {timeout: 5000}).should('be.visible');
  });

  it('checkDeactive Article', function () {
    cy.visit('admin/cp/report');
    cy.xpath('//button[text()="Show results"]').click();

    cy.wait(3000);
    cy.contains(userNames).prev().click();
    cy.contains(userNames).parent().parent().next().contains(articleName, { timeout: 5000 }).should('not.exist');
    cy.wait(500)
  })

  it('Activate Article', function () {
    cy.visit('admin/cp/post');
    cy.accessAllItems();
    cy.xpath(`//div[text()="${articleName}"]/../../../../../th[3]/div/div[2]`).click();
    cy.wait(500);
    cy.xpath('//span[text()="Active"]/../span[2]/button').click();
    cy.wait(500);
    cy.xpath('//button[text()="Save"]').click();
    cy.wait(500);
    cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
  })

  it('checkActive Article', function () {
    cy.visit('admin/cp/report');
    cy.xpath('//button[text()="Show results"]').click();

    cy.wait(5000);

    cy.contains(userNames).prev().click();
    cy.contains(userNames).parent().parent().next().contains(articleName).should('exist');
    cy.wait(500)
  })

})