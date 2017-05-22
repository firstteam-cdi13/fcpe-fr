const CampagneData = require('../persistence/campagnedata');


class CampagneService {

    constructor ( ){
        this.cData = new CampagneData();
    }

    restituerListeNomCampagne (callback) {
        this.cData.restituerListeNomCampagne((campagnes) => {

            let elements = [];
            for(let element of campagnes) {
                let obj = {nom: element.nom};
                elements.push(obj);
            }
            callback(elements);
        })
    }

    restituerListeCampagneFiltree (nom, statut, callback) {
        // Si le nom n'est pas spécifié on remplace undefined par une chaine vide 
        // pour éviter un  LIKE %undefined% dans la requête
        if (!nom){nom = ''}
        // La méthode getStatutString renvoi la fin de la requête en fonction du statut
        
        this.cData.restituerListeCampagneFiltree(nom, statut, (campagnes) => {
            
            console.log(campagnes);

            let elements = [];
            for(let element of campagnes) {
                let obj = {id : element.id,
                    nom: element.nom,
                    dateConseil: element.dateConseil, 
                    nomClasse: element.nomClasse, 
                    statutLib: element.getLibelleStatut()};
                elements.push(obj);
            }

            callback(elements);
        })
    }

    supprimerCampagne (id, callback) {
        this.cData.supprimerCampagne(id, (supprmsg) => {
            callback(supprmsg);
        })
    }

}

module.exports = CampagneService;