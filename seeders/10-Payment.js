"use strict";

function randomIntFromRange(a, b) {
  const min = Math.min(a, b); // Tìm số nhỏ nhất trong hai số a và b
  const max = Math.max(a, b); // Tìm số lớn nhất trong hai số a và b
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
    let data = [{}, {}, {}, {}, {}];
    data.forEach((item) => {
      item.userId = randomIntFromRange(2, 6);
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });
    await queryInterface.bulkInsert("Payments", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Payments", null, {});
  },
};
