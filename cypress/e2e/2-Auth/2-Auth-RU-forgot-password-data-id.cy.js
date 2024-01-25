const {recurse} = require("cypress-recurse");
describe('2-Auth-RU-forgot-password.cy.js', () => {
    let main = Cypress.config('baseUrl').split('.')[1];
    let subject = 'Уведомление о сбросе пароля';

    const userEmail = Cypress.env('authEmail');
    const authPassword = Cypress.env('authPassword');
    const wrong_password = 'wrong_wrong_wrong_wrong_wrong_';


    beforeEach(() => {
        cy.log('идем на страницу логина');
        cy.visit(Cypress.config().baseUrl)
        //cy.changeLangAuth();
    });
    it('requesting reset-password-email', function () {
        cy.log('Меняем язык на RU');
        cy.changeLangDataId();
        cy.log('Жмем на ссылку скинуть пароль');
        cy.get('[data-test-id="request_password_reset_link"]').should('be.visible').click();
        cy.wait(2500);
        cy.log('Вводим почту');
        cy.get('[data-test-id="email_input"]').should('be.visible').type(userEmail);
        cy.wait(500);
        cy.log('Жмем на кнопку отправить пароль');
        cy.contains("Ссылка для сброса пароля электронной почты").should('be.visible').click();
        cy.log('Проверяем уведомление об отправке');
        cy.wait(300);
        cy.contains("Ссылка на сброс пароля была отправлена!").should('be.visible');
    });

    it('getting last email', function () {
        cy.wait(1000);
        cy.log('Ищем письмо на почте и идем по ссылке из письма');
        recurse( //эта рекурсия не работает - таск возвращает таймаут
            () => {
                if(main === 'release') return  cy.task('getAccount', {subject, userEmail})
                if(main === 'org-online') return cy.task('getLastEmail', {port: 993, host: 'imap.mail.ru', user:userEmail, pass: authPassword })
                //localhost testing
                if(Cypress.config('baseUrl').split('.')[0] === 'http://tenant1') return cy.task('getLastEmail', {port: 993, host: 'imap.mail.ru', user:userEmail, pass: authPassword });
            }, // Cypress commands to retry
            Cypress._.isObject, // keep retrying until the task returns an object
            {
                timeout: 180000, // retry up to 3 minutes
                delay: 5000, // wait 5 seconds between attempts
            },
        )
            .its('html')
            .then((html) => {
                console.log(html);
                cy.document({log: false}).invoke({log: false}, 'write', html)
            })
            cy.get('[class="button button-primary"]').should('have.attr', 'href').then(($btn) => {
            cy.visit($btn);
        });
        cy.wait(2000);
        cy.log('Меняем язык на RU');
        cy.changeLangDataId();
        // Invalid Data
        cy.log('Вводим пароль (верный пароль)');
        cy.get('[data-test-id="password_input"]').should('be.visible').clear().type(authPassword, { log: false });
        cy.wait(500);
        cy.log('Вводим подтверждение пароля (неверный пароль)');
        cy.get('[data-test-id="password_confirmation_input"]').should('be.visible').clear().type(wrong_password, { log: false });
        cy.wait(500);
        cy.log('Жмем на кнопку');
        cy.get('[data-test-id="submit_button"]').should('be.visible').click();
        cy.wait(2500);
        cy.log('проверяем красное уведомление');
        cy.contains('не совпадает').should('be.visible');
        cy.wait(500);
        cy.log('Вводим пароль (неверный пароль)');
        cy.get('[data-test-id="password_input"]').should('be.visible').clear().type(wrong_password, { log: false });
        cy.wait(500);
        cy.log('Вводим подтверждение пароля (верный пароль)');
        cy.get('[data-test-id="password_confirmation_input"]').should('be.visible').clear().type(authPassword, { log: false });
        cy.wait(500);
        cy.log('Жмем на кнопку');
        cy.get('[data-test-id="submit_button"]').should('be.visible').click();
        cy.wait(2500);
        cy.log('Проверяем красное уведомление');
        cy.contains('Значение поля Пароль не совпадает с подтверждаемым').should('be.visible');
        cy.wait(500);

        //Valid Data
        cy.log('Вводим пароль (верный пароль)');
        cy.get('[data-test-id="password_input"]').should('be.visible').clear().type(authPassword, { log: false });
        cy.wait(500);
        cy.log('Вводим подтверждение пароля (верный пароль)');
        cy.get('[data-test-id="password_confirmation_input"]').should('be.visible').clear().type(authPassword, { log: false });
        cy.wait(500);
        cy.log('Жмем на кнопку');
        cy.get('[data-test-id="submit_button"]').should('be.visible').click();
        cy.wait(2500);
        cy.log('Вызываем функцию login - она логинится с логином/паролем из .env');
        cy.loginDataId(userEmail, authPassword);
    });

})
