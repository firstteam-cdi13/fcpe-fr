import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-identifie-utilisateur',
  templateUrl: './identifie-utilisateur.component.html',
  styleUrls: ['./identifie-utilisateur.component.css']
})
export class IdentifieUtilisateurComponent implements OnInit {

  loading = false;
  returnUrl: string;

  identifiant : string;
  motDePasse : string;

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService) { }

  ngOnInit() {
      // reset login status
      this.authService.deconnecter();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public connecter(){
    this.loading = true;
    let authentifie = this.authService.connecter(this.identifiant, this.motDePasse);

    if (authentifie) {
      this.router.navigate([this.returnUrl]);
    }
    else {
      console.log("erreur authentification");
      this.loading = false;
    }
    
  }

}
