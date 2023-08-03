module.exports = (sequelize, Sequelize) => {
  const Country = sequelize.define("countries", {
    id: {
      type: Sequelize.INTEGER(11),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    phone: {
      type: Sequelize.INTEGER(5),
      allowNull: false
    },
    code: {
      type: Sequelize.CHAR(2),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(80),
      unique: true,
      allowNull: false
    }
  },
    {
      timestamps: false
    })
  return Country
}