const CampagneData = require('../persistence/campagnedata');


class CampagneService {

    constructor ( ){
        this.cData = new CampagneData();
    }

    restituerListeNomCampagne (callback) {
        this.cData.restituerListeNomCampagne((code,campagnes,errmsg) => {

            let elements = [];
            for(let element of campagnes) {
                let obj = {nom: element.nom};
                elements.push(obj);
            }
            callback(code,elements,errmsg);
        })
    }

    restituerListeCampagneFiltree (nom, statut, callback) {
        // Si le nom n'est pas spécifié on remplace undefined par une chaine vide 
        // pour éviter un  LIKE %undefined% dans la requête
        if (!nom){nom = ''}
        
        this.cData.restituerListeCampagneFiltree(nom, statut, (code,campagnes,errmsg) => {            
            let elements = [];
            for(let element of campagnes) {
                let obj = {id : element.id,
                    nom: element.nom,
                    dateConseil: element.dateConseil, 
                    nomClasse: element.getNomClasse(), 
                    statutLib: element.getLibelleStatut()};
                elements.push(obj);
            }
            callback(code,elements,errmsg);
        })
    }

    restituerCampagne (cid, callback) {        
        this.cData.restituerCampagne(cid, (code,campagne,errmsg) => {            
                let obj = {id : campagne.id,
                    nom: campagne.nom,
                    debut: campagne.dateDebut,
                    fin: campagne.dateFin,
                    dateConseil: campagne.dateConseil, 
                    nomClasse: campagne.getNomClasse(), 
                    statutLib: campagne.getLibelleStatut(),
                    questions: campagne.questions
                    };
            callback(code,obj,errmsg);
        })
    }

    supprimerCampagne (id, callback) {
        this.cData.supprimerCampagne(id, (code,response,msg) => {
            callback(code,response,msg);
        })
    }

}

module.exports = CampagneService;