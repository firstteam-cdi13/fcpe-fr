const express = require('express');
const router = express.Router();

const CampagneService = require('../service/campagneservice');
const campagneService = new CampagneService();


//
// Jasmin le 12/05: Fichier � initialiser et penser une structure particuli�re
//

/**
 * Will get the list of etablissements
 */
router.get('/', (req, res) => {
	let campagnes = campagneService.find(function(campagnes){
		res.json(campagnes);
	});
});



module.exports = router;