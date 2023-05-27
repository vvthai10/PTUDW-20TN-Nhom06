"use strict";

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
    let data = [
      {
        name: "Nguyễn Văn An",
        email: "nguyenvanan@gmail.com",
        role: "default",
        password: "f8fa9526b7f2c98fc40535a648097b53",
        activate: true,
      },
      {
        name: "Trần Tuấn Thành",
        email: "trantuanthanh@gmail.com",
        role: "premium",
        password: "f8fa9526b7f2c98fc40535a648097b53",
        activate: true,
      },
      {
        name: "Lê Thị Phượng",
        email: "lethiphuong@gmail.com",
        role: "writer",
        password: "f8fa9526b7f2c98fc40535a648097b53",
        activate: true,
      },
      {
        name: "Phan Công Chính",
        email: "phancongchinh@gmail.com",
        role: "writer",
        password: "f8fa9526b7f2c98fc40535a648097b53",
        activate: true,
      },
      {
        name: "Võ Thanh Thúy",
        email: "vothanhthuy@gmail.com",
        role: "writer",
        password: "f8fa9526b7f2c98fc40535a648097b53",
        activate: true,
      },
      {
        name: "Lê Vĩ Nhân",
        email: "levinhan@gmail.com",
        role: "premium",
        password: "f8fa9526b7f2c98fc40535a648097b53",
        activate: true,
      },
      {
        name: "Tạ Hữu Hoàng",
        email: "tahuuhoang@businessweek.com",
        role: "editor",
        password: "f8fa9526b7f2c98fc40535a648097b53",
        activate: true,
      },
      {
        name: "Huỳnh Văn Quốc",
        email: "huynhvanquoc@ihg.com",
        role: "default",
        password: "f8fa9526b7f2c98fc40535a648097b53",
        activate: true,
      },
      {
        name: "Lâm Quốc Cường",
        email: "lamquoccuong@contact.com",
        role: "admin",
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
