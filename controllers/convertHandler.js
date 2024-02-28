function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    let numberPath = input.match(/^.*(?=[a-z].+$)/i);
    if (numberPath === null) return null;
    numberPath = numberPath[0]
    if (numberPath.search('/') + 1) {
      numberPath = numberPath.split('/')
      if (numberPath.length != 2) return null;
      result = numberPath[0] / numberPath[1]
    }
    else {
      result = Number(numberPath)
      if (isNaN(result)) result = null
    }
    return result;
  };

  this.getUnit = function (input) {
    let result;
    result = input.match(/[a-z].+$/i);
    result = result instanceof Array ? result[0].toLowerCase() : null;
    if (result === "l") result = "L";
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    const convert = {
      'mi': "km",
      'gal': "L",
      'lbs': "kg",
      'kg': "lbs",
      'L': "gal",
      'km': "mi",
    };
    if (Object.keys(convert).find(value => value = initUnit)) result = convert[initUnit];
    else result = null;
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    const dictionary = {
      gal: "gallons",
      L: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers",
    };
    result = dictionary[unit];
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    const convert = {
      mi: (x) => x * miToKm,
      gal: (x) => x * galToL,
      lbs: (x) => x * lbsToKg,
      kg: (x) => x / lbsToKg,
      L: (x) => x / galToL,
      km: (x) => x / miToKm,
    };
    result = convert[initUnit](initNum)
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    return result;
  };
}

module.exports = ConvertHandler;
