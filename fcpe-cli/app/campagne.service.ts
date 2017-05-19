import { Injectable } from '@angular/core';
import { Campagne } from './model/campagne';

//import Observable
import { Http, Response, Headers, RequestOptions, RequestMethod, RequestOptionsArgs } from '@angular/http';
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

  public rechercher(): Observable<Campagne[]> {
    let url = '/api/campagnes/listeCampagneFiltree';
    //ou chemin relatif this.url = '/api/contacts';


    return this.http.get(url,JSON.stringify({statut: 1}))
      .map((res: Response) => {
        console.log("res",res)
        //Transcodage de la liste de contacts en tableau d'objets Contact
        let liste: Campagne[] = [];
        for (let obj of res.json()) {
          liste.push(new Campagne(obj.id, obj.nom, obj.nomClasse, obj.dateConseil, obj.statutLib));
        }
        return liste;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public listerNomCampagne(): Observable<Campagne[]> {
    
    console.log("CLI: appel service restituerListeNomCampagne");
    let url = '/api/campagnes/listeNomCampagne';

    return this.http.get(url)
      .map((res: Response) => {

        let liste: Campagne[] = [];
        for (let obj of res.json()) {
          liste.push(new Campagne(null, obj.nom, null, null, null));
        }
        return liste;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public supprimer() {
    console.log("CLI: appel service supprimerCampagne");
    let url = '/api/campagnes/supprimerCampagne';
    return this.http.delete(url);
  }

  //jba: juste pour exemple
  //   addContact(contact: Contact): Observable<Contact[]> {
  //   //avant accès à l'API
  //   // let contacts=[];
  //   // contacts.push(new Contact(1, "Tidiane SIDIBE", "Nantes, France", "06000001"));
  //   // contacts.push(new Contact(2, "Jean-Brice BOUTIN", "Nantes, France", "06000002"));
  //   // contacts.push(new Contact(3, "Marianne POURRE", "Rennes, France", "06000003"));

  //   this.url = 'http://localhost:9484/api/contacts';
  //   //ou chemin relatif this.url = '/api/contacts';

  //   let bodyString = JSON.stringify(contact); // Stringify payload
  //   let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
  //   let options = new RequestOptions({ headers: headers }); // Create a request option
  //   return this.http.post(this.url, bodyString, options) // ...using post request
  //     .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  // }
}
