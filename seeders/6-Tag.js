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
      - 1 - 2: là nông nghiệp
      - 3 - 4: là thủy sản
      - 5 - 6: là kinh tế trong nước
      - 7 - 8: là kinh thế quốc tế
      - 9 - 10: là thể thao trong nước
      - 11 - 12: là thể thao quốc tế
    */
    let data = [
      {
        name: "Nông nghiệp 1",
      },
      {
        name: "Nông nghiệp 2",
      },
      {
        name: "Thủy sản 1",
      },
      {
        name: "Thủy sản 2",
      },
      {
        name: "Kinh tế trong nuóc 1",
      },
      {
        name: "Kinh tế trong nuóc 2",
      },
      {
        name: "Kinh tế quốc tế 1",
      },
      {
        name: "Kinh tế quốc tế 2",
      },
      {
        name: "Thể thao trong nuóc 1",
      },
      {
        name: "Thể thao trong nuóc 2",
      },
      {
        name: "Thể thao quốc tế 1",
      },
      {
        name: "Thể thao quốc tế 2",
      },
    ];
    data.forEach((item) => {
      item.createdAt = Sequelize.literal("NOW()");
      item.updatedAt = Sequelize.literal("NOW()");
    });
    await queryInterface.bulkInsert("Tags", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Tags", null, {});
  },
};
