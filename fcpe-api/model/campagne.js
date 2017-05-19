class Campagne {

    constructor(id,nom,nomClasse,dateConseil,dateDebut,dateFin){
        this.id = id;
        this.nom = nom;
        this.dateConseil = dateConseil;
        this.nomClasse = nomClasse;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        
        this.getStatut = function() {
            let statut = null;
            let dateJour = new Date();

            if (dateJour < this.dateDebut) {
                statut = 0;
            }
            else if (dateJour > this.dateFin) {
                statut = 2;
            }
            else {
                statut = 1;
            }
            return statut;
        }

        this.getLibelleStatut = function(){
            let statut = this.getStatut();
            let libelleStatut = null;
            switch(statut){
                case 0:
                    libelleStatut = "En préparation";
                    break;
                case 1:
                    libelleStatut = "En cours";
                    break;
                case 2:
                    libelleStatut = "Terminée";
                    break;                                        
                default :
                    libelleStatut = '';
            }
            return libelleStatut;
        }
    }
}

module.exports = Campagne;