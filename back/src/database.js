
//On récupère les paramètres de connection de la BDD
const databaseCall = require("../connexionDB.json");
const mysql = require("mysql"); //faire un npm install mysql dans le dossier du projet
const database = mysql.createConnection(databaseCall); 
database.connect((err) => {
if (err) {
    console.error("Erreur lors de la connexion à la base de données :",err);
    return;
}

console.log("Connexion réussie à la base de données");

});

module.exports = database;