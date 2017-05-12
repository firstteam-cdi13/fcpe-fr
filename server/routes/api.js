const express = require('express');
const router = express.Router();

const ModuleService = require('../module-service');
const moduleService = new ModuleService();


//
// Jasmin le 12/05: Fichier à initialiser et penser une structure particulière
//

/**
 * Will get the list of etablissements
 */
//router.get('/etablissements', (req, res) => {
//    res.json(moduleService.getEtablissements());
//});

module.exports = router;