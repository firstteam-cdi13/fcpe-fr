import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recherche-campagne',
  templateUrl: './recherche-campagne.component.html',
  styleUrls: ['./recherche-campagne.component.css']
})
export class RechercheCampagneComponent implements OnInit {
  aide: any;
  constructor() { }

  ngOnInit() {
    this.aide = { message: "aide écran ECR4a" };
  }

}
