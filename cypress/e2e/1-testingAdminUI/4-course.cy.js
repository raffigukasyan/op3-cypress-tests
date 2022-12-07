describe('F. Create course', () => {
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
    });

    it('should create course', function () {
        cy.admin();

        // Go to add courses page
        cy.xpath("//a[text()='Courses']").click();
        cy.xpath("//button[@class='max-w-xs mr-2 justify-center rounded-md border border-transparent shadow-sm px-4 py-auto text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm bg-indigo-500 hover:bg-indigo-700']")
            .click();

        cy.xpath("(//input[@type='text'])[1]").type(Cypress.env('courseName'));
        cy.xpath("//textarea").type("Lorem ipsum dolor sit amet, consectetur adipisicing elit.")
        // Set course as active

        // Add lessons for course
        cy.xpath("//span[text()='List of lessons']//following-sibling::span/descendant::input").type(Cypress.env('lessonCheckboxRadio'));
        cy.xpath("//*[text()='" + Cypress.env('lessonCheckboxRadio') + "'][1]").click();
        cy.xpath("//span[text()='List of lessons']//following-sibling::span/descendant::input").type(Cypress.env('lessonText'));
        cy.xpath("//*[text()='" + Cypress.env('lessonText') + "'][1]").click();

        // Save course
        cy.xpath("//button[text()='Save']").click();

        // Assert course created
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
    });

    afterEach(function onAfterEach() {
        if (this.currentTest.state === 'failed') {
            cy.setCookie(skipCookie, 'true');
        }
    });
});
