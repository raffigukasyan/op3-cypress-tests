
describe("CP2. Article List", () => {
  let articleName = 'Test article 1';
  let answerNumber;
  let categorisText = 'test232313123';
  let editCat = 'IT-Delta';
  let userName = 'Dashawn Durgan'
  before(() => {
  });

  beforeEach(() => {
    cy.login();
  });


  it('should create Article', function () {
    cy.visit('admin/cp/post');
    cy.contains('Article').click();
    cy.contains('Add article').click();


    // create Article
    cy.get('ul li:first input').type(articleName);

    cy.xpath('//button[text()="Select"]').click();
    cy.wait(500);

    cy.xpath('//div[@class="w-full h-60 sm:w-1/2 overflow-y-auto"]/ul/li[text()="Caterina Davis"]').click();
    cy.xpath('//div[@class="w-full h-60 sm:w-1/2 overflow-y-auto"]/ul/li[text()="Sigrid Sauer"]').click();
    cy.xpath('//button[@class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"]').click();

    cy.xpath('//span[text()="Categories *"]//following-sibling::span/descendant::input').type('test');
    cy.xpath("//*[text()='" + categorisText + "'][1]").click();


    cy.xpath("//span[text()='Questions Needed']").scrollIntoView();
    cy.xpath("//ul/li[last()]/span[last()]/button").click();
    cy.wait(500);
    for (let i = 1; i < 4; i++) {
      cy.xpath("//span[text()='Add question']").click();
      cy.xpath(`//ul/li[last()]/div[last()]/div/ul/div[${i}]/li/div[1]/span[2]/a`).click();
      cy.xpath(`//ul/li[last()]/div[last()]/div/ul/div[${i}]/li/div[1]/span[2]/input`).type(`Questions ${i}`);
      cy.xpath(`//ul/li[last()]/div[last()]/div/ul/div[${i}]/li`).click();
      cy.xpath(`//ul/li[last()]/div[last()]/div/ul/div[${i}]/li/div[2]/ul/div/li/div[1]/span[2]/a`).click();
      cy.xpath(`//ul/li[last()]/div[last()]/div/ul/div[${i}]/li/div[2]/ul/div/li/div[1]/span[2]/input`)
        .type("Answer 1");
      cy.xpath(`//ul/li[last()]/div[last()]/div/ul/div[${i}]/li`).click();
      answerNumber = 2;
      for (let j = 1; j < 3; j++) {
        cy.xpath(`//ul/li[last()]/div[last()]/div/ul/div[${i}]/li/div[2]/div[last()]/span`).click();
        cy.xpath(`//ul/li[last()]/div[last()]/div/ul/div[${i}]/li/div[2]/ul/div[last()]/li/div[1]/span[2]/a`)
          .click();
        cy.xpath(`//ul/li[last()]/div[last()]/div/ul/div[${i}]/li/div[2]/ul/div[last()]/li/div[1]/span[2]/input`)
          .type(`Answer ${answerNumber}`);
        cy.xpath(`//ul/li[last()]/div[last()]/div/ul/div[${i}]/li`).click();
        answerNumber++;
      }
      cy.xpath(`//ul/li[last()]/div[last()]/div/ul/div[${i}]/li/div[2]/ul/div[${i}]/li/div[2]/div/div`).click();
    }
    cy.xpath("//button[text()='Save']").click();
    cy.xpath("//p[text()='Success!']", { timeout: 5000 }).should('be.visible');
  });

  it('edit articles', function () {
    cy.visit('admin/cp/post');

    cy.accessAllItems();
    cy.xpath(`(//div[text()='${articleName}'])`).last().click();

    cy.contains('Edit article');

    cy.xpath('//span[text()="Categories *"]//following-sibling::span/descendant::input').type('it-De');
    cy.xpath("//*[text()='" + editCat + "'][1]").click();
    cy.wait(500);

    cy.xpath("//span[text()='Questions Needed']").scrollIntoView();
    cy.xpath(`//ul/li[last()]/div[last()]/div/ul/div[2]/li/div[1]/span[last()]/span[last()]`).click();
    cy.wait(500);
    
    cy.xpath("//button[text()='Save']").should('be.visible').click();
    cy.wait(1000);

    cy.xpath("//p[text()='Success!']").should('be.visible');
  })


  // after(() => {
  //   cy.clearCookies();
  // });
})