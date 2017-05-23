import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { CampagneService } from './campagne.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { FavorisComponent } from './favoris/favoris.component';
import { AideComponent } from './aide/aide.component';
import { RechercheCampagneComponent } from './recherche-campagne/recherche-campagne.component';
import { DetailCampagneComponent } from './detail-campagne/detail-campagne.component';

const appRoutes: Routes = [
  { path: 'campagnes', component: RechercheCampagneComponent },
  { path: 'campagnes/:id', component: DetailCampagneComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    FavorisComponent,
    AideComponent,
    RechercheCampagneComponent,
    DetailCampagneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CampagneService],
  bootstrap: [AppComponent]
})
export class AppModule { }
