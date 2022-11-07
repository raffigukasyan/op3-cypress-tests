describe('L. Check student answers', () => {
    before(() => {
        cy.admin(Cypress.env('email'), Cypress.env('password'));
    });

    it('Check first answer', function () {
        // Go to the students answers page
        cy.wait(1500);
        cy.xpath("//a[text()='Student`s answers']").click();
        cy.xpath("//h2[text()=\"Student' answers\"]");
        cy.wait(1500);
        cy.xpath("//button[text()='6']").click({force:true});
        cy.wait(1500);

        // Go to the lesson
        cy.xpath("//div[text()='" + Cypress.env('userName') + "']").click();
        // Assert we're in the lesson
        cy.xpath("//h2[text()='Проверка урока']");
        // Input comment for the student
        cy.xpath("//textarea").type("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium " +
            "ad beatae consectetur consequuntur dicta est et incidunt magni maxime minima natus nihil numquam " +
            "perferendis rem sequi, temporibus, totam. Eligendi, eos?");
        // Set answer as correct
        cy.xpath("//button[@role='switch']").click();
        // Save answer
        cy.xpath("//button[text()='Save']").click();
        // Assert answer saved
        // cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
    });
});
