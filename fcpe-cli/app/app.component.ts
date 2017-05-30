import { Component, OnInit, AfterContentInit, OnChanges  } from '@angular/core';
import { Router } from '@angular/router';

import { CanActivateViaAuthGuard } from './can-activate-via-auth.guard';

// import { Campagne } from './model/campagne' ;
// import { ModuleService } from './contacts.service';

import { Utilisateur } from './model/utilisateur';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit, OnChanges {
  
  utilisateurConnecte : Utilisateur;

  campagnes : any = [];

  visibiliteBlocUtilisateur  : boolean = false;

 constructor(private router : Router){
   
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("AppComponent ngOnInit");
    // this.ModuleService.getContacts().subscribe(data => {this.contacts = data});

     this.utilisateurConnecte = JSON.parse(localStorage.getItem('utilisateurConnecte'));
     if (this.utilisateurConnecte != null) {
          this.visibiliteBlocUtilisateur = true;
     }

  }

  ngAfterContentInit() {
    console.log("AppComponent ngAfterContentInit");
  }

  ngOnChanges () {
    console.log("AppComponent ngOnChanges");
  }
  
  
}
