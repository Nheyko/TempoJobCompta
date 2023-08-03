const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    dialectOptions: {
      useUTC: config.dialectOptions.useUTC,
      dateFirst: config.dialectOptions.dateFirst
    },
    operatorsAliases: 0,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.role = require("./role.model")(sequelize, Sequelize)
db.user = require("./user.model")(sequelize, Sequelize)

db.company = require("./company.model")(sequelize, Sequelize)
db.legal_status = require("./legal_status.model")(sequelize, Sequelize)
db.country = require("./country.model")(sequelize, Sequelize)

db.state = require("./state.model")(sequelize, Sequelize)
db.invoice = require("./invoice.model")(sequelize, Sequelize)

/* *********************************************** */

db.role.hasMany(db.user, {
  foreignKey: {
    name: "id_role"
  }
})

db.user.belongsTo(db.role, {
  foreignKey: {
    name: "id_role"
  }
})

/* *********************************************** */

db.country.hasMany(db.company, {
  foreignKey: {
    name: "id_country"
  }
})

db.company.belongsTo(db.country, {
  foreignKey: {
    name: "id_country"
  }
})

/* *********************************************** */

db.legal_status.hasMany(db.company, {
  onDelete: "Cascade",
  foreignKey: {
    name: "id_legal_status",
  },
})

db.company.belongsTo(db.legal_status, {
  onDelete: "Cascade",
  foreignKey: {
    name: "id_legal_status",
  }
})

/* *********************************************** */

db.state.hasMany(db.invoice, {
  foreignKey: {
    name: "id_state"
  }
})

db.invoice.belongsTo(db.state, {
    foreignKey: {
      name: "id_state"
    }
})

/* *********************************************** */

db.company.hasMany(db.invoice, {
  foreignKey: {
    name: "id_customer"
  }
})

db.invoice.belongsTo(db.company, {
  foreignKey: {
    name: "id_customer",
  }
})

/* *********************************************** */

db.company.hasMany(db.invoice, {
  foreignKey: {
    name: "id_vendor"
  }
})

db.invoice.belongsTo(db.company, {
  foreignKey: {
    name: "id_vendor",
  }
})

/* *********************************************** */

db.user.hasMany(db.invoice, {
  foreignKey: {
    name: "id_author"
  }
})

db.invoice.belongsTo(db.user, {
  foreignKey: {
    name: "id_author",
  }
})

module.exports = db;