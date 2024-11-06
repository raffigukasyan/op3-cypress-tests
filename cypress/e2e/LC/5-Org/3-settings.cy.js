describe('OrgBoard.A4.Settings', () => {
    let userEmail
    before(() => {
        cy.task("getUserEmail").then((user) => {
            cy.log(user.email);
            cy.log(user.pass);
            userEmail = user.email;
        })
    });

    beforeEach(() => {
        cy.admin();
        cy.visit('/ob/admin/settings');
        cy.wait(3000);
    });

    it('edit settings', function () {
        cy.xpath('//input[@type="number"]').clear().type(2);
        cy.wait(500);
        cy.xpath("//button[@role='switch']").click();
        cy.wait(500);
        cy.xpath("//button[text()='Select']").click();
        cy.wait(500);
        cy.xpath("/html/body/div[3]/div/div/div/div/div[2]/div[2]/div/div[1]/div[2]/input").type('QA');
        cy.wait(500);
        cy.contains('div', 'QA Test').click();

        // cy.xpath("//button[text()='Save']").click();
        // cy.wait(500);
        // cy.contains("Success").should('be.visible');
    })

})