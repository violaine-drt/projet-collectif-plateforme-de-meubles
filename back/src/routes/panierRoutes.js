const express = require("express");
const router = express.Router();
const panierController = require("../controllers/panierController");

router.get('/panier', panierController.getPanierEnCours);
router.post("/panier", panierController.ajoutAuPanier)


module.exports = router;