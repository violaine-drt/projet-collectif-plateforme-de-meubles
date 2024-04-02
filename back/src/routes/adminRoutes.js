const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");


router.get('/meubles', adminController.recupInfosMeubles);
router.post("/admin", adminController.ajouterUnMeuble);
router.put("/meubles/:id", adminController.modifierUnMeuble)
router.delete("/admin/:id", adminController.supprimerUnMeubleParId)
router.get("/admin/matiere", adminController.recupererListeMatieres)
router.get("/admin/couleur", adminController.recupererListeCouleurs)
router.get("/admin/categorie", adminController.recupererListeCategories)
 

module.exports = router;
    