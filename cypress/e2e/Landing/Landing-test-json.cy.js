describe('Landing-Test.js', () => {
/*    beforeEach(() => {
        const ctx = Cypress.mocha.getRunner().suite.ctx
        if (Cypress.config().baseUrl !== 'http://tenant1.localhost:8001/') {
            ctx.skip();
        }
    })*/
    let landingUrl = 'https://org-online.ru';

    it('send a request to Bitrix and print log', function () {
        cy.request({
            url: 'https://itdelta.bitrix24.ru/rest/1/z3cgk9cjhhvyelsq/crm.lead.list?FILTER[>DATE_CREATE]=2024-01-01&FILTER[CREATED_BY_ID]=1',
        }).then((response) => {
            const base64Content = response.body
            console.log(base64Content);
            /*const mime = response.headers['content-type'] // or 'image/png'
            // see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
            const imageDataUrl = `data:${mime};base64,${base64Content}`*/
        })
    });
});
