export class Question {
    id: number = 0;
    ordre: number = 0;
    intitule_principal: string = "";
    intitule_secondaire: string = "";
    type: number = 0;
    est_actif: boolean = null;
    est_obligatoire: boolean = null;
    est_global: boolean = null;
    typeLibelle: string = "";
    propositions: {
        ordre: number;
        libelle: string;
    }[] = [];

    constructor() { }
}
