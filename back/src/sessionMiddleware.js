const express = require('express');
const session = require('express-session')
const app = express();

//Config session

const secret = require("../sessionSecret")
app.use(session({
    //sécurise la session, doit être changé régulièrement
    secret: secret,
    //empêche une session d'écraser l'autre pour un même utilisateur
    resave: false,
    //permet un retour sur la session précédente lors d'un nouvel accès à la page
    saveUninitialized: false
  }));

//Vérifier la session du panier
app.use((req, res, next) => {
    req.session.panier = req.session.panier || {}
    next()
  });

module.exports = app;