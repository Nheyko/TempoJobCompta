module.exports = (sequelize, Sequelize) => {
    const LegalStatus = sequelize.define("legal_statutes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(4),
        unique: true,
        allowNull: false
      }
    },
      {
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
        tableName: "legal_statutes"
      })
    return LegalStatus
  }