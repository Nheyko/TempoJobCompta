module.exports = {
    HOST: "localhost",
    USER: "root",
    DB: "tempojobcompta",
    PASSWORD: "",
    dialect: "mysql",
    dialectOptions: {
      useUTC: true,
      dateFirst: 1
    },
    pool: {
      max: 15,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }