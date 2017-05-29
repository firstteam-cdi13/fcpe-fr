class Campagne {

    constructor(id,nom,niveau,indice,serie,dateConseil,dateDebut,dateFin){
        this.id
        this.nom
        this.niveau
        this.indice
        this.serie
        this.nomConseil
        this.dateConseil
        this.dateDebut
        this.dateFin
        
        this.getStatut = function() {
            let statut = null;
            let dateJour = new Date().setHours(0,0,0,0);

            if (dateJour < this.dateDebut) {
                statut = 0;
            }
            else if (dateJour > this.dateFin) {
                statut = 2;
            }
            else {
                statut = 1;
            }

            //console.log("fcpe-cli - getStatut: dateDebut=" + this.dateDebut + ", dateFin=" +  this.dateFin + ", dateJour=" + dateJour + " => statut=" + statut);
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

        this.getNomClasse = ()=>{
            let nomClasse = this.niveau
            if(this.indice){nomClasse += this.indice}
            if(this.serie){nomClasse += " " + this.serie}
            return nomClasse
        }
    }
}

module.exports = Campagne;