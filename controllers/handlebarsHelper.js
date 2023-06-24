"use strict";

const helper = {};
var moment = require('moment');

helper.ifEquals = (arg1, arg2, options) => {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
};

helper.formatTime = (date, format) => {
  var mmnt = moment(date);
  return mmnt.format(format);
};

helper.select = (a, b, string) => {
  return a == b ? string : null;
};

helper.selectIn = (p, array, string) => {
  for (let i = 0; i < array.length; i++){
    if (p == array[i].id) return string;
  }
  return null;
}

module.exports = helper;
