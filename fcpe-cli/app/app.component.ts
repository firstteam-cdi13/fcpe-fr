import { Component, OnInit  } from '@angular/core';

// import { Campagne } from './model/campagne' ;
// import { ModuleService } from './contacts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works by jba!';

  campagnes : any = [];

 /* constructor(private mService : ModuleService){
   
  }*/

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("AppComponent ngOnInit");
    // this.ModuleService.getContacts().subscribe(data => {this.contacts = data});    
  }
}
