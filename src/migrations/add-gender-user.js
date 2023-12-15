// Adding a column for user
// queryInterface.addColumn('Person', 'petName', { type: DataTypes.STRING });
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Users', 'gender', {
            type: Sequelize.BOOLEAN
        });

    }
    ,
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};