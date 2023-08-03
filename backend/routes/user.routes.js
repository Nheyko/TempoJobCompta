const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    )
    next()
  })

  app.get("/api/users/", controller.findAll)
  app.get("/api/users/roles", controller.findAllRoles)
  app.get("/api/users/total", controller.getTotalUsers)

  // app.get(
  //   "/api/test/user",
  //   [authJwt.verifyToken],
  //   controller.userBoard
  // )
}