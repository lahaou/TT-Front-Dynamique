import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
declare const $: any;


@Injectable({ providedIn: 'root' })
export class OperateurService {
    env = environment;

    constructor(private http: HttpClient,private auth:AuthenticationService) { 
        
    }
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
        console.log(error.error);

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
    
    getAll() {
        return this.http.get(`${this.env.url}listOperateurs`, this.httpOptions).pipe(retry(0), catchError(this.handleError)).toPromise();
    }


    addOperateur(data){    
        return this.http.post(`${this.env.url}addOperateur`, data, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
    }

    deleteOperateur(id){
        return this.http.get(`${this.env.url}operateurs/delete/${id}`, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
    }


    addCodeUssd(data){    
        return this.http.post(`${this.env.url}addUssd`, data, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
    }


    addCodeUssdList(data){    
        return this.http.post(`${this.env.url}addUssdList`, data, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
    }

    getUssdByIdoperateur(id) {
        return this.http.get(`${this.env.url}listUssds/${id}`, this.httpOptions).pipe(retry(0), catchError(this.handleError)).toPromise();
    }

    addCompte(data){    
        return this.http.post(`${this.env.url}addCompte`, data, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
    }
    addExpressionDureeOperateur(data){    
        return this.http.post(`${this.env.url}addExpressionDureeOperateur`, data, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
    }


 



    listCompteByIdoperateur(id) {
        return this.http.get(`${this.env.url}listComptes/${id}`, this.httpOptions).pipe(retry(0), catchError(this.handleError)).toPromise();
    }

    expressionsDureeOperateur(id) {
        return this.http.get(`${this.env.url}expressionsDureeOperateur/${id}`, this.httpOptions).pipe(retry(0), catchError(this.handleError)).toPromise();
    }


    
    


    deleteCompte(id){
        return this.http.get(`${this.env.url}comptes/delete/${id}`, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
    }


    
    deleteUSSD(id){
        return this.http.get(`${this.env.url}ussds/delete/${id}`, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
    }


    listTypeValeur(){
        return this.http.get(`${this.env.url}comptes/typeValeur`, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
    }


    addExpression(data){    
        return this.http.post(`${this.env.url}addExpression`, data, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
    }


    deleteExpression(id){    
        return this.http.get(`${this.env.url}expressions/delete/${id}`, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
    }


    deleteExpressionDureeOperateur(id){    
        return this.http.get(`${this.env.url}expressionsDureeOperateur/delete/${id}`, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
    }




    /*
    @RequestMapping(value="/addExpression", method = RequestMethod.POST)
    @RequestMapping(value="/listExpressions", method = RequestMethod.GET)
    @RequestMapping(value = "/expressions/{id}", method = RequestMethod.GET)
    @RequestMapping(value = "/expressions/delete/{id}", method = RequestMethod.GET)
    */
}