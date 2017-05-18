const CampagneData = require('../persistence/campagnedata');


class CampagneService {

    constructor ( ){
        this.cData = new CampagneData();
    }

    restituerListeNomCampagne (callback) {
        this.cData.restituerListeNomCampagne((campagnes) => {
            callback(campagnes);
        })
    }

    restituerListeCampagneFiltree (nom, statut, callback) {
        // Si le nom n'est pas spécifié on remplace undefined par une chaine vide 
        // pour éviter un  LIKE %undefined% dans la requête
        if (!nom){nom = ''}
        // La méthode getStatutString renvoi la fin de la requête en fonction du statut
        let statutString = this.getStatutString(statut)
        this.cData.restituerListeCampagneFiltree(nom, statutString, (campagnes) => {
            callback(campagnes);
        })
    }

    supprimerCampagne (id, callback) {
        this.cData.supprimerCampagne(id, (supprmsg) => {
            callback(supprmsg);
        })
    }

    getStatutString(statut){
        let now = new Date().toDateString();
        switch(statut){
            case undefined:
                return ``
                break;
            case '0': // En préparation
                return `AND c.date_debut > '${now}'`
                break;
            case '1': // En cours
                return `AND c.date_debut <= '${now}' AND c.date_fin >= '${now}'`
                break;
            case '2': // Terminée
                return `AND c.date_fin < '${now}'`
                break;
            default:
                return ``
        }
    }


}

module.exports = CampagneService;