import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {CampagneService} from './campagne.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { FavorisComponent } from './favoris/favoris.component';
import { AideComponent } from './aide/aide.component';
import { RechercheCampagneComponent } from './recherche-campagne/recherche-campagne.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    FavorisComponent,
    AideComponent,
    RechercheCampagneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CampagneService],
  bootstrap: [AppComponent]
})
export class AppModule { }
