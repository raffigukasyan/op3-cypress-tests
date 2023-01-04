describe('LC2.A2. Create course', () => {
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
    // });
    
    beforeEach(() => {
        cy.login();
    });

    it('should create course', function () {
        cy.visit('/admin');

        // Go to add courses page
        cy.xpath("//a[text()='Courses']").click();
        cy.contains('Add Course').click();

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
        cy.contains("Success").should('be.visible');
    });

    // it('should delete course', function () {
    //     cy.visit('/admin');
    //
    //     cy.visit('/admin/lc/courses');
    //     cy.xpath(`//div[text()='${Cypress.env('courseName')}']/../../../../../th[4]/div/div[2]`).last().click();
    //     cy.get('button').contains('Delete').click();
    //     cy.xpath("//p[text()='Success!']").should('be.visible');
    //
    // });
    //
    // it('should delete lessons', function () {
    //     cy.visit('/admin');
    //
    //     cy.visit('/admin/lc/lessons');
    //     cy.xpath(`//div[text()='${Cypress.env('lessonText')}']/../../../../../th[4]/div/div[2]`).last().click();
    //     cy.get('button').contains('Delete').click();
    //     cy.xpath("//p[text()='Success!']").should('be.visible');
    //
    //     cy.visit('/admin/lc/lessons');
    //     cy.xpath(`//div[text()='${Cypress.env('lessonCheckboxRadio')}']/../../../../../th[4]/div/div[2]`).last().click();
    //     cy.get('button').contains('Delete').click();
    //     cy.xpath("//p[text()='Success!']").should('be.visible');
    //
    //
    // });

    // afterEach(function onAfterEach() {
    //     if (this.currentTest.state === 'failed') {
    //         cy.setCookie(skipCookie, 'true');
    //     }
    // });
});
