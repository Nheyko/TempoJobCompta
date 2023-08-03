module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    id_role: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    civ: {
      type: Sequelize.TINYINT(1),
      allowNull: false
    },
    inactivAt: {
      type: Sequelize.DATE,
      allowNull: true
    }
  },
    {
      updatedAt: false,
    })

  return User
}

