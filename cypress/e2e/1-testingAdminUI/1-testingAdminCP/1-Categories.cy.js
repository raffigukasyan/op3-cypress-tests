describe("A. Categories List", () => {
    let catName ="Test category 1";

    before(() => {
        Cypress.Cookies.preserveOnce('company_policy_session');
        cy.login();
    });

    beforeEach(() => {
        
    });

    it('should create Category)', function () {
        cy.visit('admin/cp/category');
        cy.contains('Categories').click();
        cy.contains('addCategory').click();

        // create post
        cy.get('ul li:first input').type(catName);
        cy.xpath("//button[@role='switch']").click();
        cy.xpath("//button[text()='Save']").should('be.visible').click();
        cy.wait(1000);
        cy.xpath("//p[text()='Success!']").should('be.visible');

        // check active 
        // cy.xpath(`//div[text()='Test category 1']/../../../../th[2]`).first().should('have.value', 'Inactive');
        cy.xpath(`//div[text()='Test category 1']/../../../../../th[2]`).first().contains('Inactive');
        // cy.xpath(`//div[text()='${catName}']/../../../../following-sibling::th[1]`).contains(catName).first().should('have.value', 'Inactive');
        //// Edit lesson ////
        // Getting access to lesson
        // cy.accessAllItems();
        // cy.xpath("(//div[text()='" + Cypress.env('lessonCheckboxRadio') + "'])[1]").click();

        // // Create radio question
        // cy.question(Cypress.env('questionRadio'), 2);
        // cy.addAnswers(1);

        // // Create checkbox question
        // cy.question(Cypress.env('questionCheckbox'), 3);
        // cy.addAnswers(2);

        // // Assert question added
        // cy.xpath("//span[text()='Active']").should('be.visible');
    });

    it('should delete Category)', function () {
      
        cy.visit('admin/cp/category');

        cy.accessAllItems();
        cy.contains(catName);

        // delete
        cy.xpath(`//div[text()='${catName}']/../../../../../th[4]/div/div[2]`).last().click();
        cy.xpath("//p[text()='Success!']").should('be.visible');
        
    });

    after(() => {
        cy.clearCookies();
    });
  
});
