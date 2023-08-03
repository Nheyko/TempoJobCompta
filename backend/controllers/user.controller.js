const db = require("../models")
const User = db.user
const Role = db.role

exports.findAll = (req, res) => {

    User.findAll({

    })
        .then(users => {
            if (!users) {
                return res.status(404).send({ message: "Utilisateurs non trouvés." });
            }
            res.status(200).send({
                users
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}

exports.getTotalUsers = (req, res) => {

    User.count({

    })
        .then(totalUsers => {
            if (!totalUsers) {
                return res.status(404).send({ message: "Utilisateurs non trouvés." });
            }
            res.status(200).send({
                totalUsers
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}

exports.findAllRoles = (req, res) => {

    Role.findAll()
        .then(userRoles => {
            if (!userRoles) {
                return res.status(404).send({ message: "Utilisateurs non trouvés." });
            }
            res.status(200).send({
                userRoles
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
}