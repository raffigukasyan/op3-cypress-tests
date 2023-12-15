const { recurse } = require('cypress-recurse');

describe("A5. forgot password", () => {
  let userEmail;
  let userName;
  let confirmationLink;

  before(() => {
    cy.task("getUserEmail").then((user) => {
      cy.log(user.email);
      cy.log(user.pass);
      userEmail = user.email;
      userName = user.email.replace("@ethereal.email", "");
    })
  });

  it('should move to forgot password', function () {

    cy.visit(Cypress.config().baseUrl);

    cy.xpath("//a[text()='Forgot your password?']").click();
    cy.wait(500);
    cy.xpath("//input[@id='email']", { timeout: 10000 }).type(userEmail);
    cy.xpath("//button[@type='submit']", { timeout: 10000 }).click();
    cy.wait(2000);
  });

  it('get emaill', function () {
    cy.wait(3500);

    recurse(() =>
      cy.task('getLastEmail'),
      Cypress._.isObject,
      {
        timeout: 60000,
        delay: 5000,
      },
    )
      .its('html')
      .then((html) => {
        cy.document({ log: false }).invoke({ log: false }, 'write', html);
      });
    cy.xpath("//a[@class='button button-primary']").should('have.attr', 'href').then((href) => {
      confirmationLink = href;
    });
  });


  it('accept invitation', function () {
    cy.visit(confirmationLink);

    cy.xpath("//input[@id='email']", { timeout: 10000 }).type(userEmail);
    cy.xpath("//input[@id='password']").type(12345);
    cy.xpath("//input[@id='password_confirmation']").type(12345);

    cy.xpath("(//button[@type='submit'])").click();

    cy.xpath("//h2[text()='Learning center']").should('be.visible');
  });
})