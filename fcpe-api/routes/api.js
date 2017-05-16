const express = require('express');
const router = express.Router();

const ModuleService = require('../service/module-service');
const moduleService = new ModuleService();


//
// Jasmin le 12/05: Fichier à initialiser et penser une structure particulière
//

/**
 * Will get the list of etablissements
 */
router.post('/campagnes', (req, res) => {
	console.log('post url=/campagnes');

	let campagnes = moduleService.find();
	
	res.json(campagnes);
});

module.exports = router;