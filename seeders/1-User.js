"use strict";
const slugify = require("slugify");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    /*NOTE:
      - 1: là admin
      - 2 - 4: default
      - 5 - 6: premium
      - 7 - 8: writer
      - 9 - 10: editor
    */
    let data = [
      /*admin*/
      {
        name: "Nguyễn Văn A",
        email: "admin@gmail.com",
        role: "admin",
        password: "f8fa9526b7f2c98fc40535a648097b53",
        activate: true,
      },
      /*default*/
      {
        name: "Lê Văn A",
        email: "levana@gmail.com",
        role: "default",
        password: "f8fa9526b7f2c98fc40535a648097b53",
        activate: true,
      },
      {
        name: "Lê Văn B",
        email: "levanb@gmail.com",
        role: "default",
        password: "f8fa9526b7f2c98fc40535a648097b53",
        activate: true,
      },
      {
        name: "Lê Văn C",
        email: "levanc@gmail.com",
        role: "default",
        password: "f8fa9526b7f2c98fc40535a648097b53",
        activate: true,
      },
      /*premium*/
      {
        name: "Trần Thị A",
        email: "tranthia@gmail.com",
        role: "premium",
        password: "f8fa9526b7f2c98fc40535a648097b53",
        activate: true,
      },
      {
        name: "Trần Thị B",
        email: "tranthib@gmail.com",
        role: "premium",
        password: "f8fa9526b7f2c98fc40535a648097b53",
        activate: true,
      },
      /*writer*/
      {
        name: "Tạ Hữu Hoàng",
        email: "tahuuhoang@businessweek.com",
        role: "writer",
        password: "f8fa9526b7f2c98fc40535a648097b53",
        activate: true,
      },
      {
        name: "Huỳnh Văn Quốc",
        email: "huynhvanquoc@ihg.com",
        role: "writer",
        password: "f8fa9526b7f2c98fc40535a648097b53",
        activate: true,
      },
      /*editor*/
      {
        name: "Lâm Quốc Cường",
        email: "lamquoccuong@contact.com",
        role: "editor",
        password: "f8fa9526b7f2c98fc40535a648097b53",
        activate: true,
      },
      {
        name: "Vũ Quang Thiện",
        email: "vuquangthien@biglobe.com",
        role: "editor",
        password: "f8fa9526b7f2c98fc40535a648097b53",
        activate: true,
      },
    ];
    data.forEach((item) => {
      item.slug = slugify(item.name, { lower: true, strict: true });
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });
    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
