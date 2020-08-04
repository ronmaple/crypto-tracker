const chai = require('chai');
const expect = chai.expect;
const chaiDateString = require('chai-date-string');
const chaiHttp = require('chai-http');
const mocha = require('mocha');

chai.use(chaiHttp)
chai.use(chaiDateString);

describe("Fetching /api route and checking redis responsiveness", () => {
    const url = 'http://localhost:5000';

    it("should return status 200 under /api route", (done) => {
        chai
            .request(url)
            .get('/api')
            .then(res => {
                expect(res).status(200);
                done();
            })
            .catch(err => done(err))
    })
})