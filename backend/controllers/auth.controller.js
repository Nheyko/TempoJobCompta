const db = require("../models")
const config = require("../config/auth.config")
const User = db.user

var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")

exports.signup = (req, res) => {

  User.create({
    email: req.body.email,
    token: req.body.token,
    password: bcrypt.hashSync(req.body.password, 10),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    id_role: req.body.id_role,
    civ: req.body.civ
  }).then(() => {
    res.status(200).send({
      message: "Utilisateur crée !"
    })
  })
  .catch(err => {
    res.status(500).send({message: err.message})
  })
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Utilisateur non trouvé." });
      }
      if(user.id_role === 4) {
        return res.status(404).send({ message: "Cet utilisateur est inactif." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe incorrect!"
        })
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      })
        res.status(200).send({
          id: user.id,
          email: user.email,
          password: user.password,
          firstname: user.firstname,
          lastname: user.lastname,
          id_role: user.id_role,
          civ: user.civ,
          accessToken: token
        })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    })
};