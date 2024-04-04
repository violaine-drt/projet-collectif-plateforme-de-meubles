const database = require("../database");


//Récupérer tous les meubles par défaut, ou des meubles filtrés
//TODO, modifier cette route pour lui permettre de prendre en compte plusieurs filtres en meme temps (ex: je veux des chaises rouges en velours)
  
exports.meublesParParametres = (req, res) => { 
    // On récupère dans des variables les paramètres potentiellement passés dans l'url de la requete
      console.log(req.query)
      let couleur = req.query.couleur;
      let categorie = req.query.categorie;
      let matiere = req.query.matiere;
      let id = req.query.id;
      let prix = req.query.prix;
      let stock = req.query.stock;
    
      console.log("couleur : ",couleur)
      console.log("catégorie : ",categorie)
      console.log("matière : ",matiere)
      console.log("id : ",id)
    
    //On gère le cas où aucun paramètre n'a été passé dans l'url de la requete (pas de filtre)
      if (couleur === undefined && categorie === undefined && matiere === undefined && id === undefined && prix === undefined && stock === undefined){
        database.query("SELECT Meubles.id, Meubles.nom, Meubles.descriptif,Meubles.photo, Meubles.prix FROM Meubles", (err, rows, fields) => {
          if (err) {
            console.log("erreur dans la requête globale", err);
            res.status(500).send("erreur interne du serveur");
            return;
          }
          console.log("Resultat de la requête:", rows);
          res.json(rows);
        });
      }
    
      //On gère au cas par cas les paramètres passés. Pour l'instant la fonction ne gère pas plusieurs paramètres en meme temps
      else if (couleur != undefined) {
        database.query("SELECT Meubles.nom, Meubles.descriptif,Meubles.photo, Meubles.prix FROM Meubles INNER JOIN Couleurs ON Meubles.couleur_id = Couleurs.id WHERE Couleurs.nom = ?",[couleur],(err, rows, fields) => {
          if (err) {
            console.log("Les meubles de cette couleur n'ont pas été trouvés",err.message);
            res.status(500).send("erreur interne du serveur");
            return;
          }
          console.log("Resultat de la requête:", rows);
          res.json(rows);
      
        });
      }
    
      else if (categorie != undefined) {
        database.query("SELECT Meubles.nom, Meubles.descriptif,Meubles.photo, Meubles.prix FROM Meubles INNER JOIN Categories ON Meubles.categorie_id = Categories.id WHERE Categories.nom = ?",[categorie],(err, rows, fields) => {
          if (err) {
            console.log("Les meubles de cette categorie n'ont pas été trouvés",err.message);
            res.status(500).send("erreur interne du serveur");
            return;
          }
          console.log("Resultat de la requête:", rows);
          res.json(rows);
      
        });
      }
    
      else if (matiere != undefined) {
        database.query("SELECT Meubles.nom, Meubles.descriptif,Meubles.photo, Meubles.prix FROM Meubles INNER JOIN Matieres ON Meubles.matiere_id = Matieres.id WHERE Matieres.nom = ?",[matiere],(err, rows, fields) => {
          if (err) {
            console.log("Les meubles de cette categorie n'ont pas été trouvés",err.message);
            res.status(500).send("erreur interne du serveur");
            return;
          }
          console.log("Resultat de la requête:", rows);
          res.json(rows);
      
        });
      }
    
      else if (id != undefined) {
        database.query("SELECT Meubles.nom, Meubles.descriptif,Meubles.photo, Meubles.prix FROM Meubles WHERE id = ?",[id],(err, rows, fields) => {
          if (err) {
            console.log("Le meuble n'a pas été trouvé",err.message);
            res.status(500).send("erreur interne du serveur");
            return;
          }
          console.log("Resultat de la requête:", rows);
          res.json(rows);
      
        });

      }   else if (prix != undefined) {
        database.query("SELECT Meubles.nom, Meubles.descriptif,Meubles.photo, Meubles.prix FROM Meubles WHERE id = ?",[prix],(err, rows, fields) => {
          if (err) {
            console.log("Le meuble n'a pas été trouvé",err.message);
            res.status(500).send("erreur interne du serveur");
            return;
          }
          console.log("Resultat de la requête:", rows);
          res.json(rows);
      
        });
      }
      else if (stock != undefined) {
        database.query("SELECT Meubles.nom, Meubles.descriptif,Meubles.photo, Meubles.prix FROM Meubles WHERE id = ?",[stock],(err, rows, fields) => {
          if (err) {
            console.log("Le meuble n'a pas été trouvé",err.message);
            res.status(500).send("erreur interne du serveur");
            return;
          }
          console.log("Resultat de la requête:", rows);
          res.json(rows);
        });
      }
    };


//Récupérer les listes de filtres
exports.recupererListeMatieres = (req,res) => {

  database.query("SELECT Matieres.nom, Matieres.id FROM Matieres", (err, rows) => {
      if (err) {
      console.log("erreur dans la requête", err);
      res.status(500).send("erreur interne du serveur");
      return;
      }
      console.log("Resultat de la requête:", rows);
      res.json(rows);
  });
  }
  
  exports.recupererListeCouleurs = (req, res) => {
  
  database.query("SELECT Couleurs.nom, Couleurs.id FROM Couleurs", (err, rows) => {
      if (err) {
      console.log("erreur dans la requête", err);
      res.status(500).send("erreur interne du serveur");
      return;
      }
      console.log("Resultat de la requête:", rows);
      res.json(rows);
  });
  };
  
  exports.recupererListeCategories = (req, res) => {
  
  database.query("SELECT Categories.nom, Categories.id FROM Categories", (err, rows) => {
      if (err) {
      console.log("erreur dans la requête", err);
      res.status(500).send("erreur interne du serveur");
      return;
      }
      console.log("Resultat de la requête:", rows);
      res.json(rows);
  });
  };
  
    
// Récupérer tous les meubles en stock 
exports.meublesEnStockUniquement = (req, res) => {
      //database.query("SELECT * FROM Meubles WHERE stock = 1", (err, rows, fields) => {
        database.query("SELECT Meubles.id, Meubles.nom, Meubles.descriptif, Meubles.photo, Meubles.prix, Meubles.stock,Meubles.dimension, Meubles.acheteur_id,  Couleurs.nom AS couleur, Categories.nom AS categorie, Matieres.nom AS matiere FROM Meubles INNER JOIN Couleurs ON Meubles.couleur_id = Couleurs.id INNER JOIN Categories ON Meubles.categorie_id = Categories.id INNER JOIN Matieres ON Meubles.matiere_id = Matieres.id",
        (err, rows, fields) => {
        if (err) {
          console.log("erreur dans la requête", err);
          res.status(500).send("erreur interne du serveur");
          return;
        }
        console.log("Resultat de la requête:", rows);
        res.json(rows);
      });
    };
    
//Récupérer tous les meubles en stock, par ID
exports.meublesEnStockParId = (req, res) => {
      const id = parseInt(req.params.id)
      console.log("ID Récupéré: ",id)
      database.query("SELECT * FROM Meubles WHERE stock = 1 AND id = ?",[id],(err, rows, fields) => {
        if (err) {
          console.log("Le meuble n'a pas été trouvé",err.message);
          res.status(500).send("erreur interne du serveur");
          return;
        }
        console.log("Resultat de la requête:", rows);
        res.json(rows);
     
      });
    }


// Récupérer un nombre donné de meubles ou 6 
exports.nombreLimiteDeMeubles = (req, res) => { 
  let limit = req.query.limit || 6 ; 
  let query = `SELECT Meubles.nom, Meubles.descriptif, Meubles.photo, Meubles.prix FROM Meubles LIMIT ${limit}`;
  database.query(query,  (err, rows) => {
      if (err) {
        console.log("erreur dans la requête", err);
        res.status(500).send("erreur interne du serveur");
        return;
      } else {
      console.log("Resultat de la requête:", rows);
      res.json(rows);
     }
    });
  }

  