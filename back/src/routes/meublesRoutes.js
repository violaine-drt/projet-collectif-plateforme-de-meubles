const express = require("express");
const router = express.Router();
const meublesController = require("../controllers/meublesController");

router.get('/', meublesController.nombreLimiteDeMeubles);
router.get("/searchbar", meublesController.meublesParParametres);
router.get("/meublesenstock", meublesController.meublesEnStockUniquement);  
router.get("/meublesenstock/:id", meublesController.meublesEnStockParId);  
router.get("/meubles/matieres", meublesController.recupererListeMatieres);  
router.get("/meubles/couleurs", meublesController.recupererListeCouleurs);  
router.get("/meubles/categories", meublesController.recupererListeCategories);  

module.exports = router;