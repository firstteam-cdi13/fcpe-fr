const express = require('express');
const router = express.Router();

const CampagneService = require('../service/campagneservice');
const campagneService = new CampagneService();


//
// Jasmin le 12/05: Fichier � initialiser et penser une structure particuli�re
//


router.get('/listeNomCampagne', (req, res) => {
	campagneService.restituerListeNomCampagne((code,response,errmsg)=>{
		res.status(code)
		res.setHeader('Content-Type','application/json');
		errmsg ? res.json(msg) : res.json(response);
	});
});

router.get('/listeCampagneFiltree', (req, res) => {
	let nom = req.query['nom']
	let statut = req.query['statut']	
	campagneService.restituerListeCampagneFiltree(nom,statut,(code,response,errmsg)=>{
		res.status(code)
		res.setHeader('Content-Type','application/json');
		errmsg ? res.json(msg) : res.json(response);
	});
});

router.delete('/:id', (req, res) => {
	let id = req.params.id
	campagneService.supprimerCampagne(id,(code,response,msg)=>{
		res.status(code)
		res.setHeader('Content-Type','application/json');
		errmsg ? res.json(msg) : res.json(response);
	});
})


module.exports = router;