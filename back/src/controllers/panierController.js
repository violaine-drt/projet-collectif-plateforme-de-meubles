const database = require("../database");

//Trame de la requête panier qui récupère la session
//@todo
//Rajouter requête de récupération des lignes
//Dans la table commande qui correspondent à la session/utilisateur
exports.getPanierEnCours = (req, res) => {
    res.json(req.session.panier);
  };

//Envoyer au panier et rester sur la page
exports.ajoutAuPanier = (req, res) => {  
    req.session.panier[req.query.name] = req.body.qty;
    res.redirect('/');
  };