function ConvertHandler() {
  const convert = {
    'mi': "km",
    'gal': "L",
    'lbs': "kg",
    'kg': "lbs",
    'L': "gal",
    'km': "mi",
  };

  this.getNum = function (input) {
    let result = 1;
    let unit = input.match(/[a-zA-Z].*$/i);
    let number = input;
    if (unit !== null) number = input.replace(unit[0],'')
    // Fraction
    if (number.length) {
      number = number.split('/').map(e => Number(e))
      if (number.length == 1) [result] = number;
      else if (number.length == 2) result = number[0] / number[1]
      else result = null
    }
    return result;
  };

  this.getUnit = function (input) {
    let result = null;
    let unit = input.match(/[a-zA-Z].*$/i);
    if (unit !== null) {
      result = unit[0].toLowerCase()
      if (result === "l") result = "L";
      if (!Object.keys(convert).includes(result)) result = null; 
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    result = convert[initUnit];
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
    result = Math.round(convert[initUnit](initNum) * 100000) / 100000
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    return result;
  };
}

module.exports = ConvertHandler;
