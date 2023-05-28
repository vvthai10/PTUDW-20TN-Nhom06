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
      if (Math.random() < 0.5) {
        data.push({ articleId: i, tagId: 1 });
      }
      if (Math.random() > 0.5) {
        data.push({ articleId: i, tagId: 2 });
      }
    }
    for (let i = 6; i <= 10; i++) {
      if (Math.random() < 0.5) {
        data.push({ articleId: i, tagId: 3 });
      }
      if (Math.random() > 0.5) {
        data.push({ articleId: i, tagId: 4 });
      }
    }
    for (let i = 11; i <= 15; i++) {
      if (Math.random() < 0.5) {
        data.push({ articleId: i, tagId: 5 });
      }
      if (Math.random() > 0.5) {
        data.push({ articleId: i, tagId: 6 });
      }
    }
    for (let i = 16; i <= 20; i++) {
      if (Math.random() < 0.5) {
        data.push({ articleId: i, tagId: 7 });
      }
      if (Math.random() > 0.5) {
        data.push({ articleId: i, tagId: 8 });
      }
    }
    for (let i = 21; i <= 25; i++) {
      if (Math.random() < 0.5) {
        data.push({ articleId: i, tagId: 9 });
      }
      if (Math.random() > 0.5) {
        data.push({ articleId: i, tagId: 10 });
      }
    }
    for (let i = 26; i <= 30; i++) {
      if (Math.random() < 0.5) {
        data.push({ articleId: i, tagId: 11 });
      }
      if (Math.random() > 0.5) {
        data.push({ articleId: i, tagId: 12 });
      }
    }
    data.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });
    await queryInterface.bulkInsert("TagArticles", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("TagArticles", null, {});
  },
};
