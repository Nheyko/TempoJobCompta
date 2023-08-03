const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./models");

db.sequelize.sync()

// Initialisation
// db.sequelize.sync({force: true}).then(() => {
//   initialState()
//   initialLegalStatus()
//   initialRole()
// })

// simple route
app.get("/", (req, res) => {
  res.json({ message: "API is working ..." });
});

// routes
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/company.routes')(app)
require('./routes/invoice.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initialLegalStatus() {
  db.legal_status.create({
    id: 1,
    name: "EI"
  })
 
  db.legal_status.create({
    id: 2,
    name: "EIRL"
  })
 
  db.legal_status.create({
    id: 3,
    name: "EURL"
  })
  
  db.legal_status.create({
    id: 4,
    name: "SARL"
  })

  db.legal_status.create({
    id: 5,
    name: "SA"
  })

  db.legal_status.create({
    id: 6,
    name: "SAS"
  })

  db.legal_status.create({
    id: 7,
    name: "SASU"
  })

  db.legal_status.create({
    id: 8,
    name: "SNC"
  })

  db.legal_status.create({
    id: 9,
    name: "Scop"
  })

  db.legal_status.create({
    id: 10,
    name: "SCA"
  })

  db.legal_status.create({
    id: 11,
    name: "SCS"
  })
}

function initialState() {
  db.state.create({
    id: 1,
    name: "Brouillon"
  })
 
  db.state.create({
    id: 2,
    name: "En attente"
  })
 
  db.state.create({
    id: 3,
    name: "Validée"
  })
  
  db.state.create({
    id: 4,
    name: "Refusée"
  })
}

function initialRole() {
  db.role.create({
    id: 1,
    name: "Super admin"
  })
 
  db.role.create({
    id: 2,
    name: "Collaborateur"
  })
 
  db.role.create({
    id: 3,
    name: "Comptable"
  })
  
  db.role.create({
    id: 4,
    name: "Inactif"
  })
}