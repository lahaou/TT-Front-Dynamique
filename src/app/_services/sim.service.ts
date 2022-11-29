import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
declare const $: any;


@Injectable({ providedIn: 'root' })
export class SimService {
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
    
    getAll() {
        return this.http.get(`${this.env.url}listSims`, this.httpOptions2).pipe(retry(0), catchError(this.handleError));
    }


    addSim(data){ 
        return this.http.post(`${this.env.url}addSim`, data, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
    }

    addSimToDB(data){
            return this.http.post(`${this.env.url}updateSim`, data, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
        }

deleteSim(id){
    return this.http.get(`${this.env.url}deleteSim/${id}`, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}


SimByOperateur(id){
    return this.http.get(`${this.env.url}listSimsByOperateur/${id}`, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}

getContext(sim1,sim2,operateur){
    return this.http.post(`${this.env.url}contexte`,{"sim1":sim1,"sim2":sim2,"operateur":operateur} ,this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}



refreshSIM(){
    return this.http.get(`${this.env.url}refreshListSIM`, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}


disconnectAllPort(){
    return this.http.get(`${this.env.url}disconnectAllPort`, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}


setPIN(data){
        return this.http.post(`${this.env.url}setPIN`, data, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
    }



setUSSD(data){
    return this.http.post(`${this.env.url}ussd`, data, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}

simNumber(data){
    return this.http.post(`${this.env.url}simNumber`, data, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}





getSolde(numPort){
    return this.http.get(`${this.env.url}suiviSolde/${numPort}`,this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}



sendSMS(numPort,codeUSSD,textMessage){
    return this.http.post(`${this.env.url}sendSMS`,{"portSim":numPort,"codeUSSD":codeUSSD,"textMessage":textMessage},this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}



recharge(data){
    return this.http.post(`${this.env.url}recharge`, data, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}

restart(numPort){
    return this.http.get(`${this.env.url}restart/${numPort}`,this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}


cancel(numPort){
    return this.http.get(`${this.env.url}cancelUSSD/${numPort}`,this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}


getTimeModem(numPort){
    return this.http.get(`${this.env.url}modemTime/${numPort}`,this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}

getSms(numPort){
    return this.http.post(`${this.env.url}allSMS`,{"portSim":numPort},this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}

deleteSms(numPort,index){
    return this.http.post(`${this.env.url}deleteSMS`,{"portSim":numPort,"index":index},this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}

suiviSolde(numPort,compteId){
    return this.http.post(`${this.env.url}suiviSolde`,{"portSim":numPort,"compteId":compteId},this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}

appeler(numPort,codeUSSD){
    return this.http.post(`${this.env.url}appeler`, {"portSim":numPort,"codeUSSD":codeUSSD}, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}

raccrocher(data){
    return this.http.post(`${this.env.url}raccrocher`, data, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
}


}