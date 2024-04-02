const express = require("express");
const router = express.Router();
const meublesController = require("../controllers/meublesController");

router.get('/', meublesController.nombreLimiteDeMeubles);
router.get("/searchbar", meublesController.meublesParParametres);
router.get("/meublesenstock", meublesController.meublesEnStockUniquement);  
router.get("/meublesenstock/:id", meublesController.meublesEnStockParId);  

module.exports = router;