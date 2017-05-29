import { Injectable } from '@angular/core';
import { Campagne } from './model/campagne';

//import Observable
import { Http, Response, Headers, RequestOptions, RequestMethod, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// // Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class CampagneService {
  private headers: Headers;
  private options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    this.options = new RequestOptions({ headers: this.headers }); // Create a request option
  }

  public rechercher(nom, statut): Observable<Campagne[]> {
    let url = '/api/campagnes/listeCampagneFiltree';

    let params: URLSearchParams = new URLSearchParams();
    params.set('nom', nom);
    params.set('statut', statut);

    this.options.search = params;

    return this.http.get(url, this.options)
      .map((res: Response) => {
        //Transcodage de la liste de contacts en tableau d'objets Contact
        let liste: Campagne[] = [];
        for (let obj of res.json()) {
          let campagne: Campagne = new Campagne();
          campagne.id = obj.id;
          campagne.nom = obj.nom;
          campagne.nomClasse = obj.nomClasse;
          campagne.nomConseil = obj.nomConseil;
          campagne.dateConseil = obj.dateConseil;
          campagne.statut = obj.statut;
          campagne.statutLib = obj.statutLib;
          liste.push(campagne);
        }
        return liste;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public listerNomCampagne(): Observable<Campagne[]> {

    let url = '/api/campagnes/listeNomCampagne';

    return this.http.get(url)
      .map((res: Response) => {

        let liste: Campagne[] = [];
        for (let obj of res.json()) {
          let campagne: Campagne = new Campagne();
          campagne.nom = obj.nom;
          liste.push(campagne);
        }
        return liste;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public supprimer(campagne: Campagne) {
    let url = '/api/campagnes/' + campagne.id;
    return this.http.delete(url);
  }

  public visualiser(id): Observable<Campagne> {
    let url = '/api/campagnes/' + id;

    return this.http.get(url, this.options)
      .map((res: Response) => {
        let obj=res.json();
        let campagne: Campagne = new Campagne();
        campagne.id = obj.id;
        campagne.nom = obj.nom;
        campagne.nomClasse = obj.nomClasse;
        campagne.nomConseil = obj.nomConseil;
        campagne.debut= obj.debut;
        campagne.fin=obj.fin;
        campagne.dateConseil = obj.dateConseil;
        campagne.statut = obj.statut;
        campagne.statutLib = obj.statutLib;
        campagne.questions = obj.questions;
        return campagne;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
