describe("I. Create team", () => {
    beforeEach(() => {
        cy.admin();
    });

    it('should create new team', function () {
        // Go to add user page
        cy.xpath("//a[text()='Teams']").click();
        cy.xpath("//button[text()='Add team']").click();

        // Input credentials
        cy.xpath("(//input[@type='text'])[1]").type("QA Test Team" + Math.random() * 100);
        cy.xpath("//textarea").type("Lorem ipsum dolor sit amet, consectetur adipisicing elit. " +
            "Cupiditate magnam numquam porro praesentium temporibus totam.");

        cy.xpath("//button[text()='Save']").click();

        // Assert team created
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');

        // Delete team
        cy.xpath("(//*[@class='w-5 h-5 mx-1 text-red-600 hover:text-red-900 cursor-pointer'])[last()]").click();
        cy.get('button').contains('Delete').click();

        // Assert team deleted
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
    });
});
