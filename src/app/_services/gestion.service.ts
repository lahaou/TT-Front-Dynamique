import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
declare const $: any;


@Injectable({ providedIn: 'root' })
export class GestionOffreOperateurService {
    env = environment;

    constructor(private http: HttpClient,private auth:AuthenticationService) { }
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Authorization': 'Bearer ' + this.auth.getToken()
        })
      }
    
      httpOptions2 = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.auth.getToken()
        })
      }

    // Handle API errors
    handleError(error: HttpErrorResponse) {


      if (error.error.message.includes('JWT expired')) {
        console.log("JWT expired");

        alert("Session expirée, veuillez vous réconnecter!");
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        location.reload();
      }else if (error.error.message.includes('Connexion sur un autre appareil!')) {
        console.log("Connexion sur un autre appareil!");

        alert("Vous êtes connecté sur un autre appareil, veuillez vous réconnecter pour reprendre la main");
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        location.reload();
      }else{
     
        $('#default-exist').modal('show');
        $("#messagemodal").empty();
        $("#titremodal").empty();
        $("#messagemodal").append( error.error.message);
        $("#titremodal").append( error.error.error );

      }



        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      };


linkOffreToOperateur(idOperateur,offres){
    return this.http.post(`${this.env.url}addOffresToOperateur`, {'operateurId':idOperateur,'offres':offres}, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}


getOffresByOperateur(id) {
    return this.http.get(`${this.env.url}listOffresOperateur/${id}`, this.httpOptions).pipe(retry(0), catchError(this.handleError));
}

deleteoffre(idOperateur,idOffre){
    return this.http.get(`${this.env.url}deleteOffresOperateur?idOperateur=${idOperateur}&idOffre=${idOffre}`, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}

}