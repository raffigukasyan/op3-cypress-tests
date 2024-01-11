const { recurse } = require('cypress-recurse')

describe("C. Invite user by 2 ways", () => {
    let userEmail;
    let passEmail;
    let userName;
    let main = Cypress.config('baseUrl').split('.')[1]
    let subject = 'Learning Center | Invitation to the Learning Center'
    let confirmationLink;

    before(() => {
        cy.log('меняем язык на RU');
        cy.changeLangAuth();
        cy.task("getUserEmail").then((user) => {
            userEmail = user.email;
            passEmail = user.pass;
            userName = user.email.replace("@ethereal.email", "");
        })
    })

    it('should invite by user menu', function () {
        cy.log('Логинимся в админку указанную в .env')
        cy.admin();

        // Go to invite user page
        cy.log('Высылаем приглашение')
        cy.get('[data-test-id="header-menu-button"]').click();
        cy.xpath("//a[@href='" +Cypress.config('baseUrl') + "invite-user']").click();
        // Input credentials
        cy.get('[data-test-id="email_input"]').type(userEmail);


        // Click on submit button
        cy.get('[data-test-id="send_button"]').click();
        cy.wait(3000);

        // Assert user invited
        cy.log('Проверяем уведомление об успехе');
        cy.wait(300);
        cy.contains("Успех").should('be.visible');
        cy.wait(2500);

    });

    it('getting last email', function () {
        cy.wait(3500);
        cy.log(main);
        cy.log('Ищем ссылку в письме на почте и сохраняем ссылку');
        recurse(
            () => {
                if(main === 'release') return  cy.task('getAccount', {subject, userEmail})
                if(main === 'org-online') return cy.task('getLastEmail', {user: userEmail, pass:passEmail})
                //Для локального тестирования на tenant1.localhost, на релизе можно убрать
                if(Cypress.config('baseUrl').split('.')[0] === 'http://tenant1') return cy.task('getLastEmail', {port: 993, host: 'imap.mail.ru', user:userEmail, pass: authPassword });
            }, // Cypress commands to retry
            Cypress._.isObject, // keep retrying until the task returns an object
            {
                timeout: 60000, // retry up to 1 minute
                delay: 5000, // wait 5 seconds between attempts
            },
        )
            .its('html')
            .then((html) => {
                console.log(html);
                cy.document({ log: false }).invoke({ log: false }, 'write', html)
            })
        cy.xpath("//a[@class='button button-primary']").should('have.attr', 'href').then((href) => {
            confirmationLink = href;
        });
    });

    it('accept invitation', function () {
        cy.log('Следуем по ссылке из письма');
        cy.visit(confirmationLink);
        cy.log('Вводим имя');
        cy.get('[data-test-id="name_input"]').type('QA');
        cy.log('Вводим фамилию');
        cy.get('[data-test-id="last_name_input"]').type('Test');
        cy.log('Вводим пароль');
        cy.get('[data-test-id="password_input"]').type(Cypress.env('password'), { log: false });
        cy.log('Вводим подтверждение пароля');
        cy.get('[data-test-id="repear_password_input"]').type(Cypress.env('password'), { log: false });
        cy.log('Жмем на кнопку сохранить');
        cy.get('[data-test-id="save_button"]').click();
        cy.log('Проверяем что мы на странице пользователя Learning Center');
        cy.xpath("//h2[text()='Learning center']").should('be.visible');
    });
});

