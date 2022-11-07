describe('K. Search courses', () => {
    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'));
    });

    it('open and close course lists', function () {
        cy.xpath("(//button[@class='flex justify-between items-center w-full p-4 font-medium text-left text-white bg-indigo-500 rounded-lg hover:bg-indigo-300 hover:text-gray-900  focus:outline-none focus-visible:ring focus-visible:ring-indigo'])[1]")
        .click();

        cy.xpath("(//button[@class='flex justify-between items-center w-full p-4 font-medium text-left text-white bg-indigo-500 rounded-lg hover:bg-indigo-300 hover:text-gray-900  focus:outline-none focus-visible:ring focus-visible:ring-indigo'])[2]")
        .click();

        cy.xpath("(//button[@class='flex justify-between items-center w-full p-4 font-medium text-left text-white bg-indigo-500 rounded-lg hover:bg-indigo-300 hover:text-gray-900  focus:outline-none focus-visible:ring focus-visible:ring-indigo'])[3]")
        .click();

        cy.xpath("(//button[@class='flex justify-between items-center w-full p-4 font-medium text-left text-white bg-indigo-500 rounded-lg hover:bg-indigo-300 hover:text-gray-900  focus:outline-none focus-visible:ring focus-visible:ring-indigo'])[1]")
        .click();

        cy.xpath("(//button[@class='flex justify-between items-center w-full p-4 font-medium text-left text-white bg-indigo-500 rounded-lg hover:bg-indigo-300 hover:text-gray-900  focus:outline-none focus-visible:ring focus-visible:ring-indigo'])[2]")
        .click();

        cy.xpath("(//button[@class='flex justify-between items-center w-full p-4 font-medium text-left text-white bg-indigo-500 rounded-lg hover:bg-indigo-300 hover:text-gray-900  focus:outline-none focus-visible:ring focus-visible:ring-indigo'])[3]")
        .click();
    });

    it('select Started Finished and All courses', function () {
        cy.xpath("//button[text()='Started']").click()
        cy.xpath("//button[text()='Finished']").click()
        cy.xpath("//button[text()='All']").click()
    });

    it('search course by name', function () {
        cy.xpath("//input[@id='search']").type('Планирование').clear();
        cy.xpath("//input[@id='search']").type('Тестовое задание').clear();
        cy.xpath("//input[@id='search']").type(Cypress.env('courseName')).clear();
    });

    it('go to curriculums', function () {
        cy.xpath("//a[@name='Curriculums']").click();
        cy.xpath("//h3[text()='Архитектура']").should('be.visible').click();
        cy.xpath("//h1[text()='Архитектура']").should('be.visible');
    });
});

describe('Search curriculums', function () {
    before(() => {
        cy.login(Cypress.env('email'), Cypress.env('password'));
    });

    it('go to curriculums and search them by name', function () {
        cy.xpath("//a[@name='Curriculums']").click();
        cy.xpath("//h3[text()='Архитектура']").should('be.visible').click();
        cy.xpath("//h1[text()='Архитектура']").should('be.visible');
    });
});
