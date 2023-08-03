const companies = require("../controllers/company.controller.js")

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    app.get("/api/companies", companies.findAll)
    app.get("/api/companies/countries", companies.findAllCountries)
    app.get("/api/companies/legal-statutes", companies.findAllLegalStatutes)
}