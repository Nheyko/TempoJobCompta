const db = require("../models")
const Company = db.company
const LegalStatus = db.legal_status
const Country = db.country

exports.findAllCountries = (req, res) => {
    Country.findAll()
        .then(companyCountries => {
            if (!companyCountries)
                return res.status(404).send({ message: "Pays non trouvés." })
            res.status(200).send({
                companyCountries
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}

exports.findAllLegalStatutes = (req, res) => {
    LegalStatus.findAll()
        .then(companyLegalStatutes => {
            if (!companyLegalStatutes)
                return res.status(404).send({ message: "Statuts juridiques non trouvés." })
            res.status(200).send({
                companyLegalStatutes
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}

exports.findAll = (req, res) => {
    Company.findAll({
        include: [
            { model: Country, as: 'country', attributes: ['name'], required: true },
            { model: LegalStatus, as: 'legal_statute', attributes: ['name'], required: true }]
    })
        .then(companies => {
            if (!companies)
                return res.status(404).send({ message: "Entreprises non trouvées." })
            res.status(200).send({
                companies
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}
