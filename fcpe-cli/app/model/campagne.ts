export class Campagne {
    id: number;
    nom: string;
    nomClasse: string;
    dateConseil: Date;
    statut: number;
    statutLib: string;

    constructor(id, nom, nomClasse, dateConseil, statutLib) {
        this.id = id;
        this.nom = nom;
        this.nomClasse = nomClasse;
        this.dateConseil = dateConseil;
        //this.statut = statut;
        this.statutLib = statutLib;
    }
}