"use strict";

const helper = {};
var moment = require("moment");

helper.ifEquals = (arg1, arg2, options) => {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
};

helper.ifContains = (arg1, arg2, options) => {
  let temp = arg1;
  return temp.includes(arg2) ? options.fn(this) : options.inverse(this);
};

helper.formatTime = (date, format) => {
  var mmnt = moment(date);
  return mmnt.format(format);
};

helper.select = (a, b, string) => {
  return a == b ? string : null;
};

helper.selectIn = (p, array, string) => {
  for (let i = 0; i < array.length; i++) {
    if (p == array[i].id) return string;
  }
  return null;
};

helper.formatDate = (date) => {
  const daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dayOfWeek = daysOfWeek[date.getDay()];

  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${dayOfWeek} ${day}/${month < 10 ? "0" : ""}${month}/${year} ${
    hour < 10 ? "0" : ""
  }${hour}:${minute} (GMT+7)`;
};

module.exports = helper;
