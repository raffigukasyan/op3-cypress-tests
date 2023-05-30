const { recurse } = require('cypress-recurse')

describe('LC.C1. Check student answers', () => {
    // const skipCookie = Cypress.env('shouldSkipEduTests');

    // before(() => {
    //     if ( Cypress.browser.isHeaded ) {
    //         cy.clearCookie(skipCookie)
    //     } else {
    //         cy.getCookie(skipCookie).then(cookie => {
    //             if (
    //                 cookie &&
    //                 typeof cookie === 'object' &&
    //                 cookie.value === 'true'
    //             ) {
    //                 Cypress.runner.stop();
    //             }
    //         });
    //     }

    //     cy.admin();
    // });

    beforeEach(() => {
        cy.admin();
    });

    it('Check first answer', function () {
        // Go to the students answers page
        cy.wait(1500);
        cy.xpath("//a[text()='Student`s answers']").click();
        cy.xpath("//h2[text()=\"Student' answers\"]");

        // Go to the lesson
        // cy.xpath("//div[text()='" + Cypress.env('userName') + "']").click();
        cy.get('button').contains('Check').first().click()
        // Assert we're in the lesson
        cy.xpath("//h2[text()='Checking the lesson']");
        // Input comment for the student
        cy.xpath("//textarea").type("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium " +
            "ad beatae consectetur consequuntur dicta est et incidunt magni maxime minima natus nihil numquam " +
            "perferendis rem sequi, temporibus, totam. Eligendi, eos?");
        // Set answer as correct
        // cy.xpath("//button[@role='switch']").click();
        cy.get('span').contains('Success').parent().click()
        // Save answer
        cy.xpath("//button[text()='Save']").click();
        // Assert answer saved
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
    });

    it('Should get complete the lesson email', function() {
        cy.wait(2500);
        recurse(
            () => cy.task('getLastEmail'), // Cypress commands to retry
            Cypress._.isObject, // keep retrying until the task returns an object
            {
                timeout: 60000, // retry up to 1 minute
                delay: 5000, // wait 5 seconds between attempts
            },
        )
        .its('html')
        .then((html) => {
            cy.document({ log: false }).invoke({ log: false }, 'write', html)
        });
        cy.xpath("//span[@class='course-title']").should('be.visible')

    });

});
