const express = require("express");
const router = express.Router();
const produitController = require("../controllers/produitController");


router.get('/product/:id', produitController.afficherDetailsDUnMeubleParId);


module.exports = router;