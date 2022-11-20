# op3-cypress-tests

# Requirenments

Node.js

Installed [allure](https://docs.qameta.io/allure/#_installing_a_commandline)

Installed [as-a](https://github.com/bahmutov/as-a)

Created ~/.as-a.ini
```
[op3]
CYPRESS_password=secret
```

# Getting started

npm install 

npx as-a op3 npx cypress run --env allure=true

npm run allure:report

allure open

# Additional info

[Cypres docs](https://docs.cypress.io/guides/overview/why-cypress)

Command **npx cypress open** opens "Cypress Tests Runner"
