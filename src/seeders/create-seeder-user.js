'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Code',
      lastName: 'Vui',
      email: 'admin@example.com',
      password: "123456",
      address: "QN",
      gender: 1,
      roleId: "R1",
      phoneNumber: "0338432199",
      positionId: "doctor",
      images: "images/admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
