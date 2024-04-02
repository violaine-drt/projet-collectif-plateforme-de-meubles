const database = require("../database");

exports.authentification = (req, res) => {
    if (req.session.user) {
      // User is authenticated, render dashboard
      res.render('login')
    } else {
      // User is not authenticated, redirect to login page
      res.redirect('/inscription')
    }
  }
  
exports.inscription = (req, res) => {
  let utilisateurAjoute = req.body;
  // Création de la requête SQL pour insérer le mot de passe dans la table Motdepasse
  let addMotDePasse = `INSERT INTO Motdepasse (hash) VALUES (?)`;
  // Envoi de la requête pour insérer le mot de passe
  database.query(addMotDePasse, [utilisateurAjoute.motdepasse], (err, result) => {
  // Récupérer l'ID du mot de passe inséré
  const motdepasseId = result.insertId;
  // Création de la requête SQL pour insérer l'utilisateur dans la table Utilisateurs
  let addUtilisateur = `INSERT INTO Utilisateurs (nom, mail, motdepasse_id, telephone) VALUES (?, ?, ?, ?)`;
  // Envoi de la requête pour insérer l'utilisateur
  database.query(addUtilisateur, [utilisateurAjoute.nom, utilisateurAjoute.mail, motdepasseId, utilisateurAjoute.telephone], (err, result) => {
    
  res.status(201).json({ message: "Utilisateur ajouté avec succès.", motdepasse_id: motdepasseId });
    });
  });
}