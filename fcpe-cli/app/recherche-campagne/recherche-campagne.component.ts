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
  constructor(private campagneService: CampagneService) { }

  ngOnInit() {
    console.log("test");
    this.aide = { message: "aide écran ECR4a" };
    console.log("ngOnInit");
  }
  // ngAfterViewChecked() {
  //   // console.log("ngAfterViewChecked");
  //   // this.erreur = null;
  // }
  /**
   * Rechercher les campagnes
   */
  public rechercher() {
    this.campagneService.rechercher().subscribe(
      campagnes => {
        this.campagnes = campagnes;
      },
      err => {
        console.log(err);
        console.log("rechercher erreur");
        
        this.erreur = { message: err };
      });
  }
}