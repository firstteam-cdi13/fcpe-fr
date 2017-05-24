import { Component, OnInit, Input } from '@angular/core';
import { CampagneService } from '../campagne.service'
import { Campagne } from '../model/campagne';
import { Question } from '../model/question';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail-campagne',
  templateUrl: './detail-campagne.component.html',
  styleUrls: ['./detail-campagne.component.css']
})
export class DetailCampagneComponent implements OnInit {
  idCampagne: number;
  campagne: Campagne=new Campagne();
  erreur: any = null;

  constructor(private campagneService: CampagneService, private activatedRoute: ActivatedRoute) {
  }


  ngOnInit() {
    
    // this.idCampagne=
    this.activatedRoute.params.subscribe((params: Params) => {
      this.idCampagne = params['id'];
      this.campagneService.visualiser(this.idCampagne).subscribe(
        datas => {
          this.campagne = datas;
        },
        err => {
          console.log(err);
          this.erreur = { message: "Echec d'affichage de la campagne" };
        });
    });


  }
}