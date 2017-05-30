import { Injectable } from '@angular/core';
//import { Http, Response, Headers, RequestOptions, RequestMethod, RequestOptionsArgs, URLSearchParams } from '@angular/http';

import { Utilisateur } from './model/utilisateur';

@Injectable()
export class AuthService {

  constructor() { }

  public verifierUtilisateur(): boolean {
    
    let authorise : boolean = false;

    let utilisateurConnecte = JSON.parse(localStorage.getItem('utilisateurConnecte'));
    if (utilisateurConnecte){
      authorise = true;
    }
    console.log("fcpe-cli - AuthService.verifierUtilisateur: authorise=" + authorise);
    console.log(utilisateurConnecte);

    return authorise;
  }

  public connecter(identifiant :string, motDePasse: string) {
    console.log("fcpe-cli - AuthService.connecter: login=" + identifiant + ", password=" + motDePasse);
    let authorise = false;
    if (identifiant == 'gruby' && motDePasse == '123456'){
      let utilisateur = new Utilisateur();
      utilisateur.identifiant=identifiant;
      localStorage.setItem('utilisateurConnecte', JSON.stringify(utilisateur));
      authorise = true;
    } 
    /*

    return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });



    */
    return authorise;
  }

  public deconnecter() {
    console.log("deconnecter");
    localStorage.removeItem('utilisateurConnecte');
  }

//  create(user: User) {
//         return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
//     }

  // private jwt() {
  //       // create authorization header with jwt token
  //       let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //       if (currentUser && currentUser.token) {
  //           let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
  //           return new RequestOptions({ headers: headers });
  //       }
  //   }

}
