module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
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
  return Role
}