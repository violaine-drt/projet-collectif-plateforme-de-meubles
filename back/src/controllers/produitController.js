const database = require("../database");

//afficher un produit et ses caractéristiques par ID
exports.afficherDetailsDUnMeubleParId = (req,res) => { 
    const productId = req.params.id; // Récupérer l'ID du produit à partir des paramètres de l'URL
  
    database.query("SELECT Meubles.nom, Meubles.descriptif, Meubles.photo, Meubles.prix, Meubles.stock, Meubles.dimension, Categories.nom AS categorie, Matieres.nom AS matiere FROM Meubles INNER JOIN Categories ON Meubles.categorie_id = Categories.id INNER JOIN Matieres ON Meubles.matiere_id = Matieres.id WHERE Meubles.id = ?", [productId], (err, rows, fields) => {
      if (err) {
        console.log("Erreur dans la requête", err);
        res.status(500).send("Erreur interne du serveur");
        return;
      }
      console.log("Résultat de la requête :", rows);
      res.json(rows);
    });
  };