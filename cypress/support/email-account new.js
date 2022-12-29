const nodemailer = require('nodemailer')
const Imap = require('imap-mailbox').default;

const makeEmailAccount = async () => {
    // Generate a new Ethereal email inbox account
    const testAccount = await nodemailer.createTestAccount()

    console.log(111, testAccount);

    console.log('created new email account %s', testAccount.user)
    console.log('for debugging, the password is %s', testAccount.pass)

    const userEmail = {
        user: {
            email: testAccount.user,
            pass: testAccount.pass
        },

        /**
         * Utility method for getting the last email
         * for the Ethereal email account using ImapFlow.
         */
        async getLastEmail() {
            debugger
            console.log(111, testAccount);

            // make an imap client and run it on the INBOX before getting the mails
            const imap = new Imap({
                host: 'ethereal.email',
                port: 993,
                secure: true,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass
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
        },

        /**
         * Utility method for sending an email
         * to the Ethereal email account created above.
         */
        async sendEmail() {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass, // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: "bar@example.com, baz@example.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
                attachments: [
                    {
                        filename: 'hello.json',
                        content: JSON.stringify({
                            name: "Hello World!"
                        })
                    }
                ]
            });
            console.log("Message sent: %s", info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            return info.messageId
        }
    }
    return userEmail
}

module.exports = makeEmailAccount
