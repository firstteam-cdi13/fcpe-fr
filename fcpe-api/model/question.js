class Question {

    constructor(id, ordre, intitule_principal, intitule_secondaire, type, est_actif, est_obligatoire, est_global, ordre_proposition, libelle) {
        this.id
        this.ordre
        this.intitule_principal
        this.intitule_secondaire
        this.type
        this.est_actif
        this.est_obligatoire
        this.est_global
        this.getTypeLibelle = function () {
            switch (this.type) {
                case 1:
                    return "Texte libre";
                case 2:
                    return "Choix unique";
                case 3:
                    return "Choix multiple";
                default:
                    return "";
            }
        }
    }
}
module.exports = Question;