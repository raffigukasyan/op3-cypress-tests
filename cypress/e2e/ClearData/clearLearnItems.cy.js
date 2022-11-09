describe('N. Clear all created learning items', () => {
    beforeEach(() => {
        cy.admin(Cypress.env('email'), Cypress.env('password'), { log: false });
    });

    it('delete QA lessons', function () {
        // Go to Admin Lessons page
        cy.xpath("//a[text()='Lessons']").click();
        cy.accessAllItems();

        // Delete lesson
        cy.xpath("(//*[@class='w-5 h-5 mx-1 text-red-600 hover:text-red-900 cursor-pointer'])[last()]").click();
        cy.wait(500);
        cy.xpath("//p[text()='Success!']").should('be.visible');
        cy.xpath("(//*[@class='w-5 h-5 mx-1 text-red-600 hover:text-red-900 cursor-pointer'])[last()]").click();
        cy.logout();
    });

    it('delete QA course', function () {
        // Go to Admin Lessons page
        cy.xpath("//a[text()='Courses']").click();
        cy.accessAllItems();

        cy.xpath("//div[text()='" + Cypress.env('courseName') + "']").click({force:true});

        // Delete course
        cy.xpath("(//*[@class='w-5 h-5 mx-1 text-red-600 hover:text-red-900 cursor-pointer'])[last()]").click();
        cy.logout();
    });

    it('delete QA curriculum', function () {
        // Go to Admin Lessons page
        cy.xpath("//a[text()='Curriculums']").click();
        cy.accessAllItems();

        cy.xpath("//div[text()='" + Cypress.env('curriculumName') + "']").click({force:true});

        // Delete curriculum
        cy.xpath("(//*[@class='w-5 h-5 mx-1 text-red-600 hover:text-red-900 cursor-pointer'])[last()]").click();
        cy.logout();
    });

    it('delete QA course group', function () {
        // Go to Admin Lessons page
        cy.xpath("//a[text()='Course groups']").click();
        cy.accessAllItems();

        cy.xpath("//div[text()='" + Cypress.env('courseGroupName') + "']").click({force:true});

        // Delete group
        cy.xpath("(//*[@class='w-5 h-5 mx-1 text-red-600 hover:text-red-900 cursor-pointer'])[last()]").click();
        cy.xpath("//p[text()='Success!']").should('be.visible');
    });
});
