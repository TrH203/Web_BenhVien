'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('History', "files", {
            type: Sequelize.TEXT
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('History');
    }
};