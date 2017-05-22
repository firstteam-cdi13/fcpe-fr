import { Component, OnInit } from '@angular/core';
import { CampagneService } from '../campagne.service'
import { Campagne } from '../model/campagne';

@Component({
  selector: 'app-recherche-campagne',
  templateUrl: './recherche-campagne.component.html',
  styleUrls: ['./recherche-campagne.component.css']
})
export class RechercheCampagneComponent implements OnInit {
  aide: any;
  erreur: any=null;
  campagnes: Campagne[];
  selectionCampagne: Campagne;

  campagneCriteres : Campagne;

  listeNomCampagne: Campagne[];

  constructor(private campagneService: CampagneService) {

  }

  ngOnInit() {
    console.log("ngOnInit");
    this.aide = { message: "aide écran ECR4a" };
    this.campagneCriteres = new Campagne(null,'',null,null,null);
    this.campagneCriteres.statut = 2;
    
    this.campagneService.listerNomCampagne().subscribe(
      datas => {
        this.listeNomCampagne = datas;
      },
      err => {
        console.log(err);
        console.log("liste nom campagne erreur");        
        //this.erreur = { message: err };
      });

  }

  // ngAfterViewChecked() {
  //   // console.log("ngAfterViewChecked");
  //   // this.erreur = null;
  // }
  /**
   * Rechercher les campagnes
   */
  public rechercher() {

    if (this.campagneCriteres != null) {
      console.log(this.campagneCriteres.nom + " - " + this.campagneCriteres.statut);
    }

    this.campagneService.rechercher(this.campagneCriteres.nom,this.campagneCriteres.statut).subscribe(
      campagnes => {
        this.campagnes = campagnes;
      },
      err => {
        console.log(err);
        console.log("rechercher erreur");
        
        this.erreur = { message: err };
      });
  }

  public demanderSuppression(campagne : Campagne){
     console.log("demanderSuppression une campagne : nom=" + campagne.nom);
     this.selectionCampagne = campagne;
  }

  public annuler() {
     console.log("Annuler confirmation");
     this.selectionCampagne = null;
  }

  public supprimer(campagne : Campagne) {
    console.log("Supprimer une campagne");

    let index = 0;

    for (let element of this.campagnes){
      if (element.id == campagne.id) {
        this.campagnes.splice(index,1);
        break;
      }
      index++;
    }

    this.campagneService.supprimer(campagne).subscribe(
      () => {
        console.log("Suppression OK");
      },
      err => {
        console.log("Suppression KO");
        console.log(err);
        this.erreur = { message: "Echec de la suppression de la campagne \"" + campagne.nom + "\"" };
        this.rechercher();
      });
  }
  
}