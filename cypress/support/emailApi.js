const Mailjs = require("@cemalgnlts/mailjs");

const mailjs = new Mailjs();


const emailApi = async () => {
    try {
        const account = await mailjs.createOneAccount();

        console.log(account);
        const getEmailAccount = () => {
            return account.data
        }

        const getEmailData = async () => {
           const data = await mailjs.getMessages();
           console.log(data, 'DATA');
           return data
        }

        return {
            getEmailAccount,
            getEmailData
        }

    }
    catch (e) {
        console.log('ERROR', e)
    }
}

module.exports = emailApi