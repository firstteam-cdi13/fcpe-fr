import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { CampagneService } from './campagne.service';
import { AuthService } from './auth.service';

import { CanActivateViaAuthGuard } from './can-activate-via-auth.guard';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { FavorisComponent } from './favoris/favoris.component';
import { AideComponent } from './aide/aide.component';
import { RechercheCampagneComponent } from './recherche-campagne/recherche-campagne.component';
import { DetailCampagneComponent } from './detail-campagne/detail-campagne.component';
import { IdentifieUtilisateurComponent } from './identifie-utilisateur/identifie-utilisateur.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent, canActivate: [CanActivateViaAuthGuard]},
  { path: 'authenticate', component: IdentifieUtilisateurComponent},
  { path: 'campagnes', component: RechercheCampagneComponent , canActivate: [CanActivateViaAuthGuard]},
  { path: 'campagnes/:id', component: DetailCampagneComponent, canActivate: [CanActivateViaAuthGuard]},
  { path: '**', redirectTo: '' }
];

// const APP_ROUTER_PROVIDERS = [
//     CanActivateViaAuthGuard,
//     provideRouter(AppRoutes)
// ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    FavorisComponent,
    AideComponent,
    RechercheCampagneComponent,
    DetailCampagneComponent,
    IdentifieUtilisateurComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    CampagneService,
    CanActivateViaAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
