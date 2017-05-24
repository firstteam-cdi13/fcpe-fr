import { Component, OnInit  } from '@angular/core';

import { CanActivateViaAuthGuard } from './can-activate-via-auth.guard';

// import { Campagne } from './model/campagne' ;
// import { ModuleService } from './contacts.service';

import { Utilisateur } from './model/utilisateur';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  utilisateurConnecte : Utilisateur;

  campagnes : any = [];

  visibiliteBlocUtilisateur  : boolean = true;

 /* constructor(private mService : ModuleService){
   
  }*/

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("AppComponent ngOnInit");
    // this.ModuleService.getContacts().subscribe(data => {this.contacts = data});

     this.utilisateurConnecte = JSON.parse(localStorage.getItem('utilisateurConnecte'));

  }

  
  
}
