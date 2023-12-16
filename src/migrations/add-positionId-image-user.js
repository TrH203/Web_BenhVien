'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Users', "positionId", {
            type: Sequelize.STRING
        });
        await queryInterface.addColumn("Users", "images", {
            type: Sequelize.STRING
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};