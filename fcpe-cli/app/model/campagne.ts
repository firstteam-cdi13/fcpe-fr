import { Question } from './question';

export class Campagne {
    id: number = 0;
    nom: string = "";
    nomClasse: string = "";
    nomConseil: string = "";
    debut: Date = null;
    fin: Date = null;
    dateConseil: Date = null;
    statut: number = 0;
    statutLib: string = "";
    questions: Question[];
    constructor() {
    }
}