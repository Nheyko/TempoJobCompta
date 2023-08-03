const invoices = require("../controllers/invoice.controller.js")

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    // app.get("/api/invoices/:id", invoice.findOne)
    app.get("/api/invoices", invoices.findAll)
    app.post("/api/invoice/:id/update_comment", invoices.updateComment)
    app.post("/api/invoice/:id/delete_comment", invoices.deleteComment)
    app.get("/api/invoices/states", invoices.findAllStates)
    app.get("/api/invoices/edit", invoices.findOne)
    app.get("/api/invoices/total", invoices.getTotalInvoices)
    
}