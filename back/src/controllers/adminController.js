const database = require("../database");

//récupérer meubles ainsi que toutes leurs caractéristiques
exports.recupInfosMeubles= (req, res) => {
database.query("SELECT Meubles.id, Meubles.nom, Meubles.descriptif, Meubles.photo, Meubles.prix, Meubles.stock, Meubles.dimension, Couleurs.nom AS couleur, Categories.nom AS categorie, Matieres.nom AS matiere FROM Meubles INNER JOIN Couleurs ON Meubles.couleur_id = Couleurs.id INNER JOIN Categories ON Meubles.categorie_id = Categories.id INNER JOIN Matieres ON Meubles.matiere_id = Matieres.id", (err, rows, fields) => {
    if (err) {
    console.log("erreur dans la requête", err);
    res.status(500).send("erreur interne du serveur");
    return;
    }
    console.log("Resultat de la requête:", rows);
    res.json(rows);
});
};



exports.ajouterUnMeuble = (req,res) => {
let meubleAjoute
// console.log(req.body) //ça pourra changer en fonction du formulaire créé en front
meubleAjoute=req.body
console.log(meubleAjoute)
console.log(meubleAjoute[0].nom)
//création de la requête
    let addMeubles = `INSERT INTO Meubles 
    (
        nom, categorie_id, descriptif, prix, dimension, vendeur_id, acheteur_id, matiere_id, photo, couleur_id, stock
    )
    VALUES
    (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? 
    )`; // Les ? seront remplacés par les valeurs à ajouter Attention à bien mettre les variables à ajouter dans le même ordre que la liste ci-dessus
    //envoi de la requête
    database.query(addMeubles,[meubleAjoute[0].nom,meubleAjoute[1].categorie_id,meubleAjoute[2].descriptif,meubleAjoute[3].prix,meubleAjoute[8].dimension, meubleAjoute[9].vendeur_id,meubleAjoute[10].acheteur_id,meubleAjoute[4].matiere_id,meubleAjoute[5].photo,meubleAjoute[6].couleur_id,meubleAjoute[7].stock])
    res.status(201).json({
    message: 'Objet créé !' 
    
    
    });
};

//Modification d'un meuble
exports.modifierUnMeuble = (req,res) =>{
const recup = (req.body) // Récupération des données du form en format Json
const id = parseInt(req.params.id) //Récupération de l'id via la route

const nom = recup.nom
const categorie_id = recup.categorie_id
const descriptif = recup.descriptif
const prix = recup.prix
const dimension = recup.dimension
const vendeur_id = recup.vendeur_id
const acheteur_id = recup.acheteur_id
const matiere_id = recup.matiere_id
const couleur_id = recup.couleur_id

//console.log("categorieId : ",categorieId)
console.log("couleurId : ",couleur_id)
console.log("ID : ",id)

let paramQuery=[nom,categorie_id,descriptif,prix,dimension,vendeur_id,acheteur_id,matiere_id,couleur_id,id] //Bien mettre les paramètres dans ce tableau dans l'ordre des points d'interrogation de la requête
database.query("UPDATE Meubles SET  nom = ?, categorie_id = ?, descriptif = ?, prix = ?, dimension = ?, vendeur_id = ?, acheteur_id = ?, matiere_id = ?, couleur_id = ?  WHERE id = ?",paramQuery,(err, result) => {
    if(err){
    res.json({
        status:400,
        message:err
    })
    }

    else{
    res.json({
        status:200,
        message:result
    })
    }
});
};
  
//Route pour supprimer un meuble en fonction de son id (afin de ne PAS supprimer toute la table ;) )
exports.supprimerUnMeubleParId = (req,res) => {
const id = parseInt(req.params.id);
console.log("ID Récupéré : ", id);
database.query(
    "DELETE FROM Meubles WHERE id = ?",
    [id],
    (err, rows, fields) => {
    if (err) {
        console.log("erreur dans la requête", err);
        res.status(500).send("erreur interne du serveur");
        return;
    }
    console.log("Resultat de la requête:", rows);
    res.json(rows);
    }
);
};
  

// Menus déroulants de la page admin
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






