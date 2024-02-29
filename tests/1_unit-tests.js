const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  const units = ["mi", "km", "gal", "L", "kg", "lbs"];
  const convert = {
    mi: "km",
    gal: "L",
    lbs: "kg",
    kg: "lbs",
    L: "gal",
    km: "mi",
  };
  const dictionary = {
    gal: "gallons",
    L: "liters",
    lbs: "pounds",
    kg: "kilograms",
    mi: "miles",
    km: "kilometers",
  };
  // #1
  test("Whole number input", () => {
    assert.isNumber(convertHandler.getNum("2"));
  });

  // #2
  test("Decimal number input", () => {
    assert.isNumber(convertHandler.getNum("2.2"));
  });

  // #3
  test("Fractional input", () => {
    assert.isNumber(convertHandler.getNum("2/3"));
  });

  // #4
  test("Fractional input with decimal", () => {
    assert.isNumber(convertHandler.getNum("2.2/3"));
  });

  // #5
  test("Double fraction input", () => {
    assert.isNotNumber(convertHandler.getNum("3/2/3"));
  });

  // #6
  test("Default input (non number)", () => {
    assert.strictEqual(convertHandler.getNum("mi"), 1);
  });

  // #7
  test("Valid input unit", () => {
    for (const unit of units) {
      assert.equal(convertHandler.getUnit(2 + unit), unit);
    }
  });

  // #8
  test("Error invalid input unit", () => {
    assert.isNull(convertHandler.getUnit("2m2"));
  });

  // #9
  test("Return correct return value", () => {
    for (const unit of units) {
      assert.equal(convertHandler.getReturnUnit(unit), convert[unit]);
    }
  });

  // #10
  test("Spelled-out string unit", () => {
    for (const unit of units) {
        assert.equal(convertHandler.spellOutUnit(unit), dictionary[unit]);
        }  
   });

   // #11
  test("gal to L", () => {
    assert.equal(convertHandler.convert(1, 'gal'), 3.78541) 
   });

   // #12
  test("L to gal", () => {
    assert.equal(convertHandler.convert(1, 'L'), 0.26417);
   });

   // #13
  test("mi to km", () => {
    assert.equal(convertHandler.convert(1, 'mi'), 1.60934) 
   });

   // #14
  test("km to mi", () => {
    assert.equal(convertHandler.convert(1, 'km'), 0.62137)
   });

   // #15
  test("lbs to kg", () => {
    assert.equal(convertHandler.convert(1, 'lbs'), 0.45359)
   });

   // #16
  test("kg to lbs", () => {
    assert.equal(convertHandler.convert(1, 'kg'), 2.20462)
   });
});
