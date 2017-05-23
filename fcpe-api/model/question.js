class Question {

    constructor(id,ordre, intitule_principal, intitule_secondaire, type, est_actif, est_obligatoire, est_global,ordre_proposition,libelle) {
        this.id = id
        this.ordre = ordre
        this.intitule_principal = intitule_principal        
        this.intitule_secondaire = intitule_secondaire
        this.type = type
        this.est_actif = est_actif
        this.est_obligatoire = est_obligatoire    
        this.est_global = est_global
        this.ordre_proposition = ordre_proposition
        this.libelle = libelle
        this.propositions = []
    }
}
module.exports = Question;