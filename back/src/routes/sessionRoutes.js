const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController')

router.get('/login', sessionController.authentification);
router.post('/utilisateurs',sessionController.inscription);

module.exports = router;
