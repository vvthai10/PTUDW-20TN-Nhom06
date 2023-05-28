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
    /*NOTE:
      - 1 - 5: là nông sản
      - 6 - 10: là hải sản
      - 11 - 15: là  kinh tếtrong nước
      - 16 - 20: là kinh tế quốc tế
      - 21 - 25: là thể thao trong nước
      - 26 - 30: là thể thao quốc tế
    */
    let data = [];

    for (let i = 1; i <= 5; i++) {
      data.push({ articleId: i, subCategoryId: 1 });
    }
    for (let i = 6; i <= 10; i++) {
      data.push({ articleId: i, subCategoryId: 2 });
    }
    for (let i = 11; i <= 15; i++) {
      data.push({ articleId: i, subCategoryId: 3 });
    }
    for (let i = 16; i <= 20; i++) {
      data.push({ articleId: i, subCategoryId: 4 });
    }
    for (let i = 21; i <= 25; i++) {
      data.push({ articleId: i, subCategoryId: 5 });
    }
    for (let i = 26; i <= 30; i++) {
      data.push({ articleId: i, subCategoryId: 6 });
    }
    data.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });
    await queryInterface.bulkInsert("CategoryArticles", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("CategoryArticles", null, {});
  },
};
