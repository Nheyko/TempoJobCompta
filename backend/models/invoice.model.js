module.exports = (sequelize, Sequelize) => {
    const Invoice = sequelize.define("invoices", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        comment: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        id_customer: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_vendor: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_author: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_state: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        vat_rate: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        total_duty_free: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return Invoice
}