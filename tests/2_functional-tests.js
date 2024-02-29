const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    // #1
    test('Valid convert', () => {
        chai.request(server).keepOpen().get('/api/convert?input=10L').end((err, res) => {
            assert.equal(res.status, 200)
            assert.hasAllKeys(JSON.parse(res.text), keys = ['initNum', 'initUnit', 'returnNum', 'returnUnit', 'string'])
        })
    })

    // #2
    test('Invalid input', () => {
        chai.request(server).keepOpen().get('/api/convert?input=10g').end((err, res) => {
            assert.equal(res.status, 200)
            assert.include(res.text, 'invalid')
        })
    })

    // #3
    test('Invalid number', () => {
        chai.request(server).keepOpen().get('/api/convert?input=10/10/10L').end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.text, 'invalid number')
        })
    })

    // #4
    test('Invalid number and unit', () => {
        chai.request(server).keepOpen().get('/api/convert?input=3/7.2/4kilomegagram').end((err, res) => {
            assert.equal(res.status, 200)
            assert.equal(res.text, 'invalid number and unit')
        })
    })

    // #5
    test('No number convert', () => {
        chai.request(server).keepOpen().get('/api/convert?input=kg').end((err, res) => {
            const result = JSON.parse(res.text)
            assert.equal(res.status, 200)
            assert.hasAllKeys(result, keys = ['initNum', 'initUnit', 'returnNum', 'returnUnit', 'string'])
            assert.equal(result.initNum, 1)
        })
    })
});
