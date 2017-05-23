import { Component, OnInit } from '@angular/core';
import { CampagneService } from '../campagne.service'

@Component({
  selector: 'app-detail-campagne',
  templateUrl: './detail-campagne.component.html',
  styleUrls: ['./detail-campagne.component.css']
})
export class DetailCampagneComponent implements OnInit {

  constructor(private campagneService: CampagneService) { }


  ngOnInit() {
    // jas: à adapter, provient de rechercheCampagne
    //   this.campagneService.listerNomCampagne().subscribe(
    //     datas => {
    //       this.listeNomCampagne = datas;
    //     },
    //     err => {
    //       console.log(err);
    //       console.log("liste nom campagne erreur");
    //       //this.erreur = { message: err };
    //     });
  }
}
