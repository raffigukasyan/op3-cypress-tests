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
    lessonCheckboxRadio2: "QA Test lesson (checkbox + radio)2",
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
    baseUrl: "https://itdelta.learn.company-policy.com/",
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
});
