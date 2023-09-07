const nodemailer = require("nodemailer");
const Imap = require("imap");
const { simpleParser } = require("mailparser");

const makeEmailAccount = async () => {
  // Generate a new Ethereal email inbox account
  const testAccount = await nodemailer.createTestAccount();

  // console.log('test email account: ', testAccount);

  console.log("created new email account %s", testAccount.user);
  console.log("for debugging, the password is %s", testAccount.pass);

  const userEmail = {
    user: {
      email: testAccount.user,
      pass: testAccount.pass,
    },

    /**
     * Utility method for getting the last email
     * for the Ethereal email account using ImapFlow.
     */
    async getLastEmail() {
      debugger;

      const imapConfig = {
          host: "ethereal.email",
          port: 993,
          tls: true,
          user: testAccount.user,
          password: testAccount.pass,
        };
        
        let mail = undefined;
        
        const getEmails = new Promise((res, rej) => {
        // make an imap client and run it on the INBOX before getting the mails
        const imap = new Imap(imapConfig);
        imap.once("ready", () => {
          imap.openBox("INBOX", false, () => {
            // search by Unseen since current date
            imap.search(["UNSEEN", ["SINCE", new Date()]], (err, results) => {
              // if we have results, continue fetching msg
              if(!results) {
                rej('Nothing to fetch');
                return;
              }
              const f = imap.fetch(results, { bodies: "", markSeen: true });
              // execute when we have a message
              f.on("message", (msg) => {
                // get body
                msg.on("body", (stream) => {
                  // parse mail
                  simpleParser(stream, async (err, parsed) => {
                    mail = parsed;
                    res(parsed);
                  });
                });
              });
              f.once("error", (ex) => {
                return rej(ex);
              });
              f.once("end", () => {
                imap.end();
              });
            });
          });
        });

        imap.once("error", (err) => {
          console.log(err);
          rej(err);
        });

        imap.connect();
      });

      await getEmails;
      // and returns the main fields + attachments array
      return {
        subject: mail.headers.subject,
        html: mail.html,
      };
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
            filename: "hello.json",
            content: JSON.stringify({
              name: "Hello World!",
            }),
          },
        ],
      });
      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      return info.messageId;
    },
  };
  return userEmail;
};

module.exports = makeEmailAccount;
