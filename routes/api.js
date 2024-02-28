'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let input = req.query.input
    let initNum = convertHandler.getNum(input)
    let initUnit = convertHandler.getUnit(input)
    console.log(`${input} ${initNum} ${initUnit}`)
    if (initNum === null && initUnit == null) {
      res.send("invalid number and unit")
    }
    else if (initNum === null) {
      res.send("invalid number")
    }
    else if (initUnit === null) {
      res.send("invalid unit")
    }
    else {
      let returnNum = convertHandler.convert(initNum, initUnit)
      let returnUnit = convertHandler.getReturnUnit(initUnit)
      console.log(returnUnit)
      if (returnUnit === null) {
        res.send("invalid unit")
      }
      else {
        let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
        res.json({
          initNum, initUnit, returnNum, returnUnit, string
        }) 
      }
    }
  })
};
