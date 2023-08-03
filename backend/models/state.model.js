module.exports = (sequelize, Sequelize) => {
    const State = sequelize.define("states", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(15),
        unique: true,
        allowNull: false
      }
    },
      {
        createdAt: false,
        updatedAt: false
      })
    return State
  }