const chai = require('chai');
const expect = chai.expect;
const chaiDateString = require('chai-date-string');
const chaiHttp = require('chai-http');
const mocha = require('mocha');

chai.use(chaiHttp)
chai.use(chaiDateString);


/* Functions to test */
const getData = require('../../api/utils/getData');


describe("Get data from external coinApi", () => {
    it("should return a promise with a data object", async () => {
        /*
            mocha (done) callback is omitted intentionally,
            'async' conflicts and generates an error: 
            https://github.com/mochajs/mocha/issues/2407
        */

        const data = await getData();

        const { time, asset_id_base: base, asset_id_quote: currency, rate } = data;

        expect(data).to.be.an('object');
        expect(time).to.be.a.dateString();
        expect(base).to.be.a('string');
        expect(currency).to.be.a('string');
        expect(rate).to.be.a('number');

    })
})