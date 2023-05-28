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
        name: "Nông sản",
        categoryId: 1,
        icon: "/assets/icon/nong_san.jpg",
      },
      {
        name: "Hải sản",
        categoryId: 1,
        icon: "/assets/icon/hai_san.jpg",
      },
      {
        name: "Trong nước",
        categoryId: 2,
        icon: "/assets/icon/trong_nuoc.jpg",
      },
      {
        name: "Quốc tế",
        categoryId: 2,
        icon: "/assets/icon/quoc_te.jpg",
      },
      {
        name: "Trong nước",
        categoryId: 3,
        icon: "/assets/icon/trong_nuoc.jpg",
      },
      {
        name: "Quốc tế",
        categoryId: 3,
        icon: "/assets/icon/quoc_te.jpg",
      },
    ];
    data.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });
    await queryInterface.bulkInsert("SubCategories", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("SubCategories", null, {});
  },
};
