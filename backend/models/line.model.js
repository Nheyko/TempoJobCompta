module.exports = (sequelize, Sequelize) => {
    const Line = sequelize.define("Lines", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(15),
        unique: false,
        allowNull: false
      },
      unit_price: {
        type: Sequelize.FLOAT,
        unique: false,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false
    },
},
      {
        timestamps: false
      })

    return Line
}