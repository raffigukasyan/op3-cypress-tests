const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const makeEmailAccount = require('./cypress/plugins/email-account')

module.exports = defineConfig({
  chromeWebSecurity: false,
  env: {
    userName: "prog itdelta",
    lessonSuccess: "Lesson successfully completed!",
    registrationEmail: "QAtest+" + Math.random() * 100 + "@lc.com",
    email:  "prog@itdelta.agency",
    password: process.env.PASSWORD,
    courseGroupName: "QA Test Course Group",
    curriculumName: "QA Test Curriculum",
    courseName: "QA Test Course",
    lessonCheckboxRadio: "QA Test lesson (checkbox + radio)",
    lessonText: "QA Test lesson (text)",
    questionRadio: "radio question",
    questionText: "text question",
    questionCheckbox: "checkbox question",
    answer1: "answer 1",
    answer2: "answer 2",
  },
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  viewportHeight: 800,
  viewportWidth: 800,
  e2e: {
    baseUrl: "https://qa-testing.learn.company-policy.com/",
    setupNodeEvents: async (on, config) => {
      const emailAccount = await makeEmailAccount()

      on('task', {
        getUserEmail() {
          return emailAccount.user
        },
        getLastEmail() {
          return emailAccount.getLastEmail()
        },
        sendEmail() {
          return emailAccount.sendEmail()
        }
      });

      allureWriter(on, config);
      return config;
    },
  },
});
