module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("companies", {
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
        phone_number: {
            type: Sequelize.CHAR(10),
            allowNull: true
        },
        adress: {
            type: Sequelize.STRING,
            allowNull: false
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        zipcode: {
            type: Sequelize.CHAR(5),
            allowNull: false
        },
        id_country: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        is_customer: {
            type: Sequelize.TINYINT(1),
            allowNull: false
        },
        siren_number: {
            type: Sequelize.STRING,
            allowNull: true
        },
        other: {
            type: Sequelize.STRING,
            allowNull: true
        },
        id_legal_status: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        vat_number: {
            type: Sequelize.STRING,
            allowNull: true
        }
    },
        {
            updatedAt: false
        })

    return Company
}