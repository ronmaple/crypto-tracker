const chai = require('chai');
const expect = chai.expect;
const chaiDateString = require('chai-date-string');
const chaiHttp = require('chai-http');
const mocha = require('mocha');

chai.use(chaiHttp)
chai.use(chaiDateString);


/* Functions to test */
const getData = require('../../api/utils/getData');


describe("Get specific data from external coinApi", () => {
    it("should return a promise with a data object with default values in params", async () => {
        /*
            mocha (done) callback is omitted intentionally,
            'async' conflicts and generates an error: 
            https://github.com/mochajs/mocha/issues/2407
        */

        const data = await getData();

        // const { time, asset_id_base: base, asset_id_quote: currency, rate } = data;
        const { currency, base, rate } = data;

        expect(data).to.be.an('object');
        // expect(time).to.be.a.dateString();
        expect(base).to.be.a('string');
        expect(currency).to.be.a('string');
        expect(rate).to.be.a('number');

    })

    it("should return Litecoin (LTC) data in USD", async () => {

        const crypto = 'LTC';
        const currency = 'USD';
        const time = undefined; // this should be calculated as the current time

        const data = await getData(crypto, currency, time);

        // const { time: resultTime, asset_id_base: base, asset_id_quote, rate } = data;
        const { base, currency: quote, rate } = data;

        expect(data).to.be.an('object');
        // expect(resultTime).to.be.a.dateString();
        expect(base).to.equal(crypto);
        expect(quote).to.equal(currency);
        expect(rate).to.be.a('number');

    })
})