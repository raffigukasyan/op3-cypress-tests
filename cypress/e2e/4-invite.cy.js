const { recurse } = require('cypress-recurse');
const Imap = require('imap-mailbox').default;

describe("A4. Invite user by 2 ways", () => {
    let userEmail;
    let userName;
    let confirmationLink;

    let userPass;

    before(() => {
        cy.task("getUserEmail").then((user) => {
            cy.log(user.email);
            cy.log(user.pass);
            userEmail = user.email;
            userName = user.email.replace("@ethereal.email", "");
            userPass = user.pass;
        })
    })

    it('should invite by user menu', function () {
        cy.admin();

        // Go to invite user page
        cy.xpath("//button[@class='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-50']").click();
        cy.xpath("//a[@href='" +Cypress.config('baseUrl') + "invite-user']").click();
        // Input credentials
        cy.xpath("//*[@id='email']").type(userEmail);


        // Click on submit button
        cy.xpath("//button[@type='submit']").click();

        // Assert user invited
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
    });

    it('getting last email', async function () {
        cy.wait(1000);
        const getLastEmail = async () => {
            debugger

            // make an imap client and run it on the INBOX before getting the mails
            const imap = new Imap({
                mailboxesToWatch: [userEmail],
                host: 'ethereal.email',
                port: 993,
                secure: true,
                auth: {
                    user: userEmail,
                    pass: userPass
                }
            });
            await imap.run();
            const mailboxPath = 'INBOX';
            const mails = await imap.getAllMails(mailboxPath);

            const latestDate = new Date(
                Math.max.apply(null, mails.map(function (mail) {
                        return new Date(mail.parsedMail.date);
                    }),
                ),);

            let mail = mails.find((mail) => mail.parsedMail.date.getTime() === latestDate.getTime()) ?? {
                        parsedMail: { textAsHtml: '<div>No email</div>',
                        html: 'no email'
                    },
                }
            
            console.log('FFFFFFF')
            console.log(mail.subject)
            console.log(mail.text)

            // and returns the main fields + attachments array
            return {
                subject: mail.subject,
                text: mail.text,
                html: mail.html,
                attachments: mail.attachments
            }
        };

        let res = await getLastEmail();
        recurse(
            () => cy.task('getLastEmail'), // Cypress commands to retry
            Cypress._.isObject, // keep retrying until the task returns an object
            {
                timeout: 30000, // retry up to 1 minute
                delay: 5000, // wait 5 seconds between attempts
            },
        )
        .then((res) => {
            debugger
            console.log(res);
            // cy.log(res);
            return res;
        })
        .its('html')
        .then((html) => {
            console.log(html);
            cy.log(html);
            cy.document({ log: false }).invoke({ log: false }, 'write', html)
        })
        cy.xpath("//a[@class='button button-primary']").should('have.attr', 'href').then((href) => {
            confirmationLink = href;
        });
    });

    it('accept invitation', function () {
        cy.visit(confirmationLink);

        cy.xpath("//*[@id='first-name']").type('QA');
        cy.xpath("//*[@id='last-name']").type('TEST')
        cy.xpath("//*[@id='password']").type(Cypress.env('password'), { log: false });
        cy.xpath("//*[@id='new_password']").type(Cypress.env('password'), { log: false });

        cy.xpath("(//button[@type='submit'])[1]").click();

        cy.xpath("//h2[text()='Learning center']").should('be.visible');
    });

    it('delete invited user', function () {
        cy.admin();

        cy.xpath("//a[text()='Users']").click();
        cy.accessAllItems();

        cy.xpath("//div[text()='QA TEST']");
        cy.xpath("(//*[@class='w-5 h-5 mx-1 text-red-600 hover:text-red-900 cursor-pointer'])[last()]").click();
    });

    it('should invite by admin tools', function () {
        cy.admin();

        // Go to add user page
        cy.xpath("//a[text()='Users']").click();
        cy.xpath("//button[text()='Add user']").click();

        // Input credentials
        cy.xpath("(//input[@type='text'])[1]").type(String(Math.random() * 100));
        cy.xpath("(//input[@type='text'])[2]").type("QA");
        cy.xpath("//input[@type='email']").type("testAddUser+" + Math.random() * 100 + "@lc.com");
        cy.xpath("//input[@type='tel']").type("+7999" + Math.random() * 100);
        cy.xpath("(//input[@type='password'])[1]").type(Cypress.env('password'), { log: false });
        cy.xpath("(//input[@type='password'])[2]").type(Cypress.env('password'), { log: false });

        // Click on submit button
        cy.xpath("//button[text()='Save']").click();

        // Assert user invited
        cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
    });

    afterEach(function onAfterEach() {
        if (this.currentTest.state === 'failed') {
            Cypress.runner.stop();
        }
    });
});
