describe("A3. Profile editing", () => {
    const newPassword = 'fg5fHe4$fg_56fG';

    beforeEach(() => {
        cy.login();
    });


    it('should assert profile page', function () {
        cy.visit('/admin/lc/');
        cy.wait(3000);
        cy.log('меняем язык на RU');
        cy.changeLangAuth();
        cy.wait(1000);
        cy.log('Заходим в профиль')
        cy.get('[data-header-test-id="header_menu_button"]').click();
        cy.get('[data-header-test-id="header-dropdown-menu"]').eq(0).click();
        cy.wait(2000);
        cy.log('Проверяем что мы находимся в профиле');
        cy.url().should('include', '/profile')
        //chnage Avatar
        cy.log('Проверяем отсутствие аватара');
        cy.get('[data-test-id="change_avatar"]').should('have.attr', 'src').should('have.string', 'no-user-photo.jpg');
        cy.log('Меняем аватар');
        cy.xpath("//input[@id='avatar']").selectFile('cypress/image/person.jpg', {force: true})

        // change names
        cy.log('Меняем имя и фамилию');
        cy.xpath("//input[@id='first-name']").clear().type('test_first_name');
        cy.xpath("//input[@id='last-name']").clear().type('test_last_name');

        //change Phone
        cy.log('Меняем номер телефона');
        cy.xpath("//input[@id='phone']").clear().type('+71111111111');

        // change password
        cy.log('меняем пароль')
        cy.xpath("//input[@id='new_password']").clear().type(newPassword, {log:false});
        cy.log('Кнопка сохранить должна быть неактивна')
        cy.xpath("//button[@type='submit']").should('be.disabled');
        cy.xpath("//input[@id='password']").clear().type(newPassword, {log:false});

        cy.get('[data-test-id="save_button"]').click();
        cy.wait(500);
        cy.log('Проверяем уведомление')
        cy.contains("Успешно").should('be.visible');
    });

    it('should login with new password and change it back', function () {
        // Cypress.session.clearAllSavedSessions();
        cy.login(Cypress.env('email'), newPassword);
        cy.visit('/profile');
        cy.wait(1500);
        cy.log('меняем язык на RU');
        cy.changeLangAuth();
        cy.wait(1000);
        // cy.closePopup();

        // confirm data was changed and change it back to default values
        cy.log('Проверяем что Имя, фамилия, телефон и аватарка были изменены');
        cy.xpath("//input[@id='first-name']").should('have.attr', 'value').should('have.string', 'test_first_name');
        cy.xpath("//input[@id='last-name']").should('have.attr', 'value').should('have.string', 'test_last_name');
        cy.xpath("//input[@id='phone']").should('have.attr', 'value').should('have.string', '+71111111111');
        cy.get('[data-test-id="change_avatar"]').should('have.attr', 'src').should('not.have.string', 'no-user-photo.jpg');

        cy.log('Меняем имя, фамилию и телефон обратно на старые значения');
        cy.xpath("//input[@id='first-name']").clear().type('QA_TEST');
        cy.xpath("//input[@id='last-name']").clear().type('QA_TEST');
        cy.xpath("//input[@id='phone']").clear().type('+79999999999');
        cy.xpath("//input[@id='new_password']").clear().type(Cypress.env("password"), {log:false});
        cy.xpath("//button[@type='submit']").should('be.disabled');
        cy.xpath("//input[@id='password']").clear().type(Cypress.env("password"), {log:false});
        cy.wait(500);
        cy.log('Удаляем аватар');
        cy.get('[data-test-id="delete_avatar_button"]').click();
        cy.wait(500);
        cy.get('[data-test-id="save_button"]').click();
        cy.wait(500);
        cy.log('Проверяем уведомление')
        cy.contains("Успешно").should('be.visible');
        cy.wait(4000);

        cy.log('Переходим из профиля на страницу админа')
        cy.get('[data-header-test-id="profile_button"]').click();
        cy.wait(1000);
        /*cy.get('[data-header-test-id="header-dropdown-menu"]').then(($test) => {
          console.log($test);
        })*/
        cy.get('[data-header-test-id="header-dropdown-menu"]').eq(1).click();
        //cy.xpath("//a[@href='" +Cypress.config('baseUrl') + "admin']").click();
        cy.wait(2500);
        cy.log('Проверяем что адрес страницы /admin/lc/courses');
        cy.url().should('include', '/admin/lc/courses');
        cy.visit('/admin/lc/');
        cy.wait(2500);
        cy.log('Переходим из админки в панель пользователя')
        cy.get('[data-header-test-id="header_menu_button"]').click();
        cy.get('[data-header-test-id="header-dropdown-menu"]').eq(1).click();
        cy.log('Проверяем что адрес страницы /learning');
        cy.url().should('include', '/learning');
        cy.log('Жмем кнопку выход');
        cy.get('[data-header-test-id="header-dropdown-menu"]').eq(3).click();
        cy.log('Проверяем что находимся на странице логина');
        cy.url().should('include', '/login');

    });

    // it('should have new name', function () {
    //     cy.login();
    //     cy.wait(500)
    //     cy.visit('/profile');
    //     //  closePopup();
    //     cy.wait(500);
    //     cy.xpath("//h1[text()='User Profile']").should('be.visible');
    //     cy.xpath("//input[@id='first-name']").should('have.value','first-name');
    //     cy.xpath("//input[@id='last-name']").should('have.value', 'last-name');
    // });

});
