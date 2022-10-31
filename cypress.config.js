const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  env: {
    registrationEmail: "QAtest+" + Math.random() * 100 + "@lc.com",
    email: "qa-headuser@robot-mail.com",
    password: "159159",
    courseGroupName: "QA Test Course Group",
    curriculumName: "QA Test Curriculum",
    courseName: "QA Test Course",
    lessonTextCheckboxRadio: "QA Test lesson (text + checkbox + radio)",
    lessonCheckboxRadio: "QA Test lesson (checkbox + radio)",
    lessonText: "QA Test lesson (text)",
    questionRadio: "radio question",
    questionText: "text question",
    questionCheckbox: "checkbox question"
  },
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  viewportHeight: 800,
  viewportWidth: 800,
  e2e: {
    baseUrl: "https://itdelta.learn.company-policy.com/",
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
});
