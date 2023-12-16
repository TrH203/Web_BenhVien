'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Users', "typeRole", {
            type: Sequelize.STRING
        });
        await queryInterface.addColumn("Users", "keyRole", {
            type: Sequelize.STRING
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};