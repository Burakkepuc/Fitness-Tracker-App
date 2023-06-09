'use strict';

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

    await queryInterface.bulkInsert(
      'Exercises',
      [
        {
          user_id: 1,
          date: new Date(),
          name: 'Pushups',
          interval: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          date: new Date(),
          name: 'Situps',
          interval: 30,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Exercises', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
