import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable,throwError } from 'rxjs';
import { map,retry, catchError  } from 'rxjs/operators';

import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  env = environment;
  currentUser;
  loginError=false;
 
    constructor(private http: HttpClient, private router: Router) {
       // localStorage.getItem('currentUser')
    }
    httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Authorization': 'Bearer ' + this.getToken()
      })
    }
  
    httpOptions2 = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getToken()
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
        }
  
        if (error.error.message.includes('Connexion sur un autre appareil!')) {
          console.log("Connexion sur un autre appareil!");
  
          alert("Vous êtes connecté sur un autre appareil, veuillez vous réconnecter pour reprendre la main");
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
          location.reload();
        }

        
  
          // return an observable with a user-facing error message
          return throwError(
            'Something bad happened; please try again later.');
        };


      getToken(){
       return localStorage.getItem('token');
      }

      

        login(credentials) {
            let httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json' }) };
          
            return this.http.post(`${this.env.url}login`, credentials, httpOptions).toPromise().then(
              (result:any) => {
                console.log(result);
                
 
            if (result['user']) {
             
                localStorage.setItem('currentUser' , JSON.stringify(result));
                localStorage.setItem('token',result['token']);
               // this.router.navigate(['/home']);
               location.reload();
            }
         

              }).catch((err) => {
                this.loginError=true;
              //  alert("une erreur s'est produite lors de l'authentification")
                console.warn("une erreur s'est produite lors de l'authentification");

            }
              )
          }




   logout() {
        // remove user from local storage to log user out
        console.log("remove user from local storage to log user out");
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        location.reload();
     

    }






dashboard(){
    return this.http.get(`${this.env.url}dashboard/count`, this.httpOptions2).pipe(retry(0), catchError(this.handleError));
  
}



}