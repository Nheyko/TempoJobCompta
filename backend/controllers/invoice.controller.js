const db = require("../models")
const Invoice = db.invoice
const State = db.state
const User = db.user

exports.findAllStates = (req, res) => {

    State.findAll()
        .then(invoiceStates => {
            if (!invoiceStates) {
                return res.status(404).send({ message: "Status non trouvés." });
            }
            res.status(200).send({
                invoiceStates
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}

exports.findAll = (req, res) => {

    Invoice.findAll({
        include: { model: User, as: 'user', attributes: ['firstname'], required: true }
    })
        .then(invoices => {
            if (!invoices) {
                return res.status(404).send({ message: "Factures non trouvées." });
            }
            res.status(200).send({
                invoices
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}

exports.getTotalInvoices = (req, res) => {

    Invoice.count({
    })
        .then(totalInvoices => {
            if (!totalInvoices) {
                return res.status(404).send({ message: "Factures non trouvées." });
            }
            res.status(200).send({
                totalInvoices
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}

exports.updateComment = (req, res) => {

    Invoice.findOne({
        where: { id: req.params.id }
    }).then(invoice => {
        if (!invoice) {
            return res.status(404).send({ message: "Facture non trouvée." });
        }
        else {
            Invoice.update(
                {
                    comment: req.body.comment
                },
                {
                    where: { id: req.params.id }
                }).then(() => {
                    res.status(200).send({
                        message: "Le commentaire a bien été édité !"
                    })
                }).catch(err => {
                    res.status(500).send({ message: err.message })
                })
        }
    })
}

exports.deleteComment = (req, res) => {

    Invoice.findOne({
        where: { id: req.params.id }
    }).then(invoice => {
        if (!invoice) {
            return res.status(404).send({ message: "Facture non trouvée." });
        }
        else {
            Invoice.update(
                {
                    comment: null
                },
                {
                    where: { id: req.params.id }
                }).then(() => {
                    res.status(200).send({
                        message: "Le commentaire a bien été supprimé !"
                    })
                }).catch(err => {
                    res.status(500).send({ message: err.message })
                })
        }
    })
}

exports.findOne = (req, res) => {

    Invoice.findOne({
        where: {
            id: req.body.id
        }
    }).then(invoice => {
        if (!invoice) {
            return res.status(404).send({ message: "Facture non trouvée." });
        }

        res.status(200).send({
            id: invoice.id,
            name: invoice.name,
            comment: invoice?.comment,
            id_customer: invoice.id_customer,
            id_vendor: invoice.id_vendor,
            id_author: invoice.id_author,
            id_state: invoice.id_state,
            vat_rate: invoice.vat_rate,
            total_duty_free: invoice.total_duty_free,
            image: invoice.image,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        })
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}