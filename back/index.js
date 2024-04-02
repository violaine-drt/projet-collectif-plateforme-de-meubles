// Récupération des modules express et imports
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const sessionMiddleware = require("./src/sessionMiddleware")
//Middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

//Chemin vers le formulaire dans le dossier public, ayant permis de tester la session : 
app.use(express.static('public'));

//Import des routes
const adminRoutes = require("./src/routes/adminRoutes");
const meublesRoutes = require("./src/routes/meublesRoutes");
const panierRoutes = require("./src/routes/panierRoutes");
const produitRoutes = require("./src/routes/produitRoutes");
const sessionRoutes = require("./src/routes/sessionRoutes");


//Utilisation des routes
app.use(adminRoutes);
app.use(meublesRoutes);
app.use(panierRoutes);
app.use(produitRoutes);
app.use(sessionRoutes);

//Ecoute serveur
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});








