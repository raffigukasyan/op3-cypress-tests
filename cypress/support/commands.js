Cypress.Commands.add('login', (username = Cypress.env('username'), password = Cypress.env('password')) => {

    const hashCode = function (str) {
        str = "" + str;
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

    cy.session([username, hashCode(password)], () => {
        cy.visit(Cypress.config('baseUrl') + 'login', { timeout: 10000 });

        cy.xpath("//input[@id='email']", { timeout: 10000 }).type(username);
        cy.xpath("//input[@id='password']", { timeout: 10000 }).type(password, { log: false });
    
        cy.xpath("//button[@type='submit']", { timeout: 10000}).click();
        cy.wait(500);
    });
});

Cypress.Commands.add('admin', () => {
    cy.login();
    cy.visit('/admin');
    cy.wait(500);
    cy.get('body').then(($body) => {
        if($body.find('.inline-block.align-bottom.bg-white button').length) {
            return '.inline-block.align-bottom.bg-white button';
        }

        return 'body';
    })
    .then(selector => {
        cy.get(selector).click();
    })
    
    cy.wait(500);
});

Cypress.Commands.add('createAnswerForQuestion', (questionName) => {
    cy.wait(1500);
    cy.xpath("//span[text()='Add answer']").click();
    cy.wait(500);
     /* cy.xpath("(//div[text()='" + lName + "'])[1]") */
    cy.xpath("(//button[text()='Save'])[2]").click();
    cy.wait(500);
    cy.xpath("//*[text()='Create answer']").should('be.visible');
    cy.xpath("//input[@type='text']").type(questionName + ' answer');
    cy.xpath("(//button[@role='switch'])[1]").click();
    cy.xpath("(//button[@role='switch'])[2]").click();
    cy.xpath("//button[text()='Save']").click();
    cy.xpath("//p[text()='Success!']").should('be.visible');
})

Cypress.Commands.add('question', (questionName, questionType) => {
    cy.wait(1500);
    cy.xpath("//h2[text()='Edit lesson']").click();
    cy.xpath("//div[@class='flex items-center cursor-pointer mb-3']").click();
    cy.wait(1500);
    // cy.xpath("//*[text()=Создание вопроса']").should('be.visible');
    cy.xpath("(//input[@type='text'])[1]").type(questionName);
    cy.xpath("(//input[@type='text'])[2]").type(questionName + questionType);
    cy.xpath("(//div[@role='radio'])[" + questionType + "]").click({force:true});
    questionType === 1 && cy.xpath("//button[@role='switch']").click()
    if(questionType !== 1) {
        cy.createAnswerForQuestion(questionName)
        cy.xpath("//button[@role='switch']").click()
    }
    cy.xpath("//input[@type='number']").type(10);
    cy.xpath("//button[text()='Save']").click();
});

Cypress.Commands.add('addAnswers', (answer) => {
    cy.xpath("(//*[@class='w-5 h-5 mx-1 text-indigo-600 hover:text-indigo-900 cursor-pointer'])[" + answer + "]").click();
    cy.xpath("//*[text()='Edit question']");

    cy.xpath("//*[@class='w-6 h-6 text-blue-600 hover:text-blue-900 cursor-pointer']").click();
    cy.xpath("//*[text()='Create answer']").should('be.visible');
    cy.xpath("//input[@type='text']").type(Cypress.env('answer1'));
    cy.xpath("(//button[@role='switch'])[1]").click();
    cy.xpath("(//button[@role='switch'])[2]").click();
    cy.xpath("//button[text()='Save']").click();

    cy.xpath("//*[@class='w-6 h-6 text-blue-600 hover:text-blue-900 cursor-pointer']").click();
    cy.xpath("//*[text()='Create answer']").should('be.visible');
    cy.xpath("//input[@type='text']").type(Cypress.env('answer2'));
    cy.xpath("(//button[@role='switch'])[1]").click();
    cy.xpath("//button[text()='Save']").click();

    cy.wait(1500);
    cy.xpath("//button[text()='Cancel']").click();
    cy.xpath("//*[text()='Edit lesson']");
});

Cypress.Commands.add('accessAllItems', () => {
    cy.wait(1000);
    // cy.xpath('(//button/span[starts-with(text(), \'Show\')])[last()]').click();
    cy.xpath('//button[@data-test-id="pageCountButton"]').click();
    cy.wait(1000);
    cy.get('span').contains("Show 100 elements").last().click();
    cy.wait(500);
});

Cypress.Commands.add('logout', () => {
    cy.wait(1500);
    cy.xpath("//button[@class='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-50']").click();
    cy.xpath("//a[@href='" +Cypress.config('baseUrl') + "logout']").click();
    cy.wait(1500);
});

Cypress.Commands.add('skipTests', (cookieName) => {
    if ( Cypress.browser.isHeaded ) {
        cy.clearCookie(cookieName)
    } else {
        cy.getCookie(cookieName).then(cookie => {
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
