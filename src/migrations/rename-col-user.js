'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // await queryInterface.renameColumn('Users', "typeRole", "roleId", {
        //     type: Sequelize.STRING
        // });
        await queryInterface.renameColumn("Users", "keyRole", "phoneNumber", {
            type: Sequelize.STRING,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};