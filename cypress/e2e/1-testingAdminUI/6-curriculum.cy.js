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
        cy.admin(Cypress.env('email'), Cypress.env('password'), { log: false });
    });

    it('should create curriculum', function () {
        // Go to add curriculums page
        cy.wait(1500);
        cy.xpath("//a[text()='Curriculums']").click();
        cy.xpath("//button[text()='Add curriculum']").click();

        cy.xpath("(//input[@type='text'])[1]").type(Cypress.env('curriculumName'));
        cy.xpath("//textarea").type("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci " +
            "eligendi harum hic quidem. Aliquam amet architecto, id illum laboriosam maxime nobis omnis perspiciatis " +
            "porro provident, quidem reiciendis sequi voluptate voluptatem.")

        cy.xpath("(//input[@type='text'])[2]").type(Cypress.env('courseName'));
        cy.xpath("//*[text()='" + Cypress.env('courseName') + "']").click();

        // Save curriculum
        cy.xpath("//button[text()='Save']").click();

        // Assert curriculum created
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
    });

    afterEach(function onAfterEach() {
        if (this.currentTest.state === 'failed') {
            Cypress.runner.stop();
            cy.setCookie(skipCookie, 'true');
        }
    });
});
