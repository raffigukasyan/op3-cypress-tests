const {recurse} = require("cypress-recurse");
describe('Register Ru', () => {
    let userEmail;
    let pass;
    let invalid_code = '0000';
    let name = 'QaRegister';
    let last_name = 'Test';
    let test_password = 'Qatest123';
    let wrong_password = 'wrong_wrong_wrong';
    //let main = Cypress.config('baseUrl').split('.')[1]
    //let subject = 'Learning Center | Invitation to the Learning Center'
    //let confirmationLink;

    before(() => {
        cy.log('Создаем тестовую почту');
        cy.task("getTestAccount").then((res) => {
            userEmail = res.user;
            pass = res.pass;
            //userName = user.email.replace("@ethereal.email", "");
        })
        cy.log('Идем на страницу регистрации');
        cy.visit(Cypress.config().registerUrl);
        cy.log('Смена языка на RU');
        cy.changeLangAuth();
    });

    it('valid-email-input', function () {
        cy.log('Вводим почту');
        cy.get('[data-test-id="email_input"]').type(userEmail);
        cy.wait(1000);
        cy.log('Кликаем на кнопку');
        cy.get('[data-test-id="submit_button"]').click();
        cy.wait(3000);
        cy.log('Смена адреса почты');
        cy.get('[data-test-id="change_email_link"]').should('be.visible').click();
        cy.wait(3000);
        cy.log('Вводим почту');
        cy.get('[data-test-id="email_input"]').type(userEmail);
        cy.wait(1000);
        cy.log('Кликаем на кнопку');
        cy.get('[data-test-id="submit_button"]').click();
        cy.wait(2000);
        cy.log('Проверяем почту чтобы "прочитать" письмо и не потерять следующий проверочный код');
        cy.task('getLastEmail', {user: userEmail, pass: pass,});
        cy.log('Ждем минуту перед повторной высылкой кода');
        cy.wait(61000);
        cy.log('Жмем выслать код еще раз');
        cy.get('[data-test-id="resend_code_button"]').click();
        cy.wait(2000);
        cy.log('Проверяем почту');
        cy.task('getLastEmail', {user: userEmail, pass: pass,}).its('html').then(($html) => {
            var doc = new DOMParser().parseFromString($html, "text/html");
            let midText = doc.querySelector("p").innerText;
            cy.log('Вводим неправильный код');
            cy.get('[data-test-id="code_input"]').type(invalid_code);
            cy.wait(200);
            cy.log('Жмем кнопку проверить код');
            cy.get('[data-test-id="check_code_button"]').click();
            cy.wait(500);
            cy.log('Проверяем красное уведомление');
            cy.contains('Выбранное значение для Код некорректно.').should('be.visible');
            cy.wait(1000);
            cy.log('Вводим правильный код');
            cy.get('[data-test-id="code_input"]').clear().type(midText.match(/[0-9]+/g)[0]);
        });
        cy.log('Жмем кнопку проверить код');
        cy.get('[data-test-id="check_code_button"]').click();
        cy.wait(1000);
        cy.log('Проверяем что мы на странице регистрации');
        cy.contains('Регистрация');
        cy.log('Вводим имя');
        cy.get('[data-test-id="name_input"]').type(name);
        cy.wait(1000);
        cy.log('Вводим фамилию');
        cy.get('[data-test-id="last_name_input"]').type(last_name);
        cy.wait(1000);
        cy.log('Вводим пароль');
        cy.get('[data-test-id="password_input"]').clear().type(test_password);
        cy.wait(1000);
        cy.log('Вводим подтверждение пароля - другой пароль');
        cy.get('[data-test-id="password_confirmation_input"]').clear().type(wrong_password);
        cy.wait(1000);
        cy.log('Проверяем красное уведомление');
        cy.contains('не совпадает').should('be.visible');
        cy.wait(1000);
        cy.log('Вводим пароль');
        cy.get('[data-test-id="password_input"]').clear().type(test_password);
        cy.wait(1000);
        cy.log('Вводим подтверждение пароля - тот же пароль');
        cy.get('[data-test-id="password_confirmation_input"]').clear().type(wrong_password);
        cy.wait(1000);
        cy.log('Жмем на кнопку');
        cy.get('[data-test-id="submit_button"]').click();
        cy.wait(10000);
        cy.log('Проверяем что мы на странице курсов');
        cy.contains("Курсы").should('be.visible');
    });
})