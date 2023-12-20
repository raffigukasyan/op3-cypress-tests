const {recurse} = require("cypress-recurse");
describe('7-Auth-RU-reset-password-invalid.cy.js', () => {

    it('requesting reset-password-email', function () {
        const email = Cypress.env('mailRuEmail');

        cy.visit(Cypress.config().authUrl);

        cy.contains("Забыли пароль?").should('be.visible');
        cy.contains("Забыли пароль?").click();

        cy.wait(65000); //временное решение - org-online.ru высылает письмо сброса пароля с ограничением, 1 раз в минуту

        cy.xpath("//input[@id='email']", { timeout: 10000 }).type(email);
        cy.wait(1000);
        cy.contains("Ссылка для сброса пароля электронной почты").should('be.visible').click();
        cy.wait(1000);
        cy.contains("Ссылка на сброс пароля была отправлена!").should('be.visible');
    });

    it('get last email && try invalid passwords', function () {
        const password = Cypress.env('password')
        const wrong_password = Cypress.env('wrong_password')
        cy.wait(1000);
        recurse( //эта рекурсия не работает - таск возвращает таймаут
            () => cy.task('getLastEmailFromMailRu'), // Cypress commands to retry
            Cypress._.isObject, // keep retrying until the task returns an object
            {
                timeout: 180000, // retry up to 3 minutes
                delay: 5000, // wait 5 seconds between attempts
            },
        )
            .its('html')
            .then((html) => {
                console.log(html);
                cy.document({ log: false }).invoke({ log: false }, 'write', html)
            })
        cy.get('[class="button button-primary"]').should('have.attr', 'href').then(($btn) => {
            cy.visit($btn);
        });
        cy.wait(3000);

        cy.xpath("//input[@id='email']", { timeout: 10000 }).should('be.visible');

        cy.xpath("//input[@id='password']", { timeout: 10000 }).should('be.visible').type(password);

        cy.xpath("//input[@id='password_confirmation']", { timeout: 10000 }).should('be.visible').type(wrong_password);

        cy.xpath("//button[@type='submit']", { timeout: 10000}).should('be.visible').click();
        cy.wait(1000);
        cy.contains('Значение поля Пароль не совпадает с подтверждаемым').should('be.visible');
        cy.wait(2000);

        cy.xpath("//input[@id='password']", { timeout: 10000 }).clear().type(wrong_password);


        cy.xpath("//input[@id='password_confirmation']", { timeout: 10000 }).clear().type(password);


        cy.xpath("//button[@type='submit']", { timeout: 10000}).should('be.visible').click();
        cy.wait(1000);
        cy.contains('Значение поля Пароль не совпадает с подтверждаемым').should('be.visible');
        cy.wait(1000);
    });
})
