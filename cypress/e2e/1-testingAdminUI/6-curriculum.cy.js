describe('H. Create curriculum', () => {
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

    beforeEach(() => {
        cy.admin();
    });

    it('should create curriculum', function () {
        // Go to add curriculums page
        cy.wait(1500);
        cy.xpath("//a[text()='Curriculums']").click();
        cy.xpath("//button[text()='Add curriculum']").click();

        cy.xpath("(//input[@type='text'])[1]").type(Cypress.env('curriculumName'));
        cy.xpath("//textarea").type("Lorem ipsum dolor sit amet, consectetur adipisicing elit.")

        cy.xpath("(//input[@type='text'])[2]").type(Cypress.env('courseName'));
        cy.xpath("//*[text()='" + Cypress.env('courseName') + "'][1]").click();

        // Save curriculum
        cy.xpath("//button[text()='Save']").click();

        // Assert curriculum created
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
    });

    it('should delete curriculum', function () {
        // Go to add curriculums page
        cy.xpath("//a[text()='Curriculums']").click();

        // Save curriculum
        cy.xpath("//div[text()='QA Test Curriculum']/../../../../following-sibling::th[3]/div/div[2]").last().click();

        // Assert curriculum created
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
    });

    afterEach(function onAfterEach() {
        if (this.currentTest.state === 'failed') {
            cy.setCookie(skipCookie, 'true');
        }
    });
});
