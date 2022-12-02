describe('J. Complete the course which we have created in previous tests', () => {
    const skipCookie = Cypress.env('shouldSkipEduTests');

    before(() => {
        if ( Cypress.browser.isHeaded ) {
            cy.clearCookie(skipCookie)
        } else {
            cy.getCookie(skipCookie).then(cookie => {
                if (
                    cookie &&
                    typeof cookie === 'object' &&
                    cookie.value === 'true'
                ) {
                    Cypress.runner.stop();
                }
            });
        }

        cy.login(Cypress.env('email'), Cypress.env('password'), { log: false })
    });

    it('should ', function () {
        // Find the course by name
        cy.xpath("//input[@id='search']").type(Cypress.env('courseName'));
        // Go to the course
        cy.xpath("//h3[text()='" + Cypress.env('courseName') + "']").click();
        // Assert that we're in the course
        cy.xpath("//h1[text()='" + Cypress.env('courseName') + "']");
        // Start the course (click on run)
        cy.xpath("//button[@class='my-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']")
            .click();

        //// FIRST LESSON ////
        // Assert we're in the second lesson
        cy.xpath("//h1[text()='" + Cypress.env('lessonCheckboxRadio') + "']");
        // Select correct radio answer
        cy.xpath("(//input[@type='radio'])[1]").click();
        // Select correct checkbox answer
        cy.xpath("(//input[@type='checkbox'])[1]").click();
        // Go to the next lesson
        cy.wait(2000)
        cy.xpath("//button[@type='submit']").dblclick();

        //// SECOND LESSON ////
        // Assert we're in the third lesson
        cy.xpath("//h1[text()='" + Cypress.env('lessonText') + "']");
        // Input answer
        cy.xpath("//div[@contenteditable='true']").click().type("Lorem ipsum dolor sit amet, consectetur " +
            "adipisicing elit. Accusamus aspernatur dolorem dolorum eligendi esse facilis impedit ipsa maxime minus " +
            "molestiae nostrum odit provident quam ratione, sequi similique, tempore. Nemo, sunt?");
        // Go to the next lesson
        cy.xpath("//button[@type='submit']").click();
    });

    afterEach(function onAfterEach() {
        if (this.currentTest.state === 'failed') {
            cy.setCookie(skipCookie, 'true');
        }
    });
});
