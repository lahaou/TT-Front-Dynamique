import { Injectable, Testability } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

declare const $: any;


@Injectable({ providedIn: 'root' })
export class ResultatService {
    env = environment;

    constructor(private http: HttpClient,private auth:AuthenticationService,private datePipe: DatePipe) { }




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

        return this.http.get(`${this.env.url}listUsers`, this.httpOptions).pipe(retry(0), catchError(this.handleError));
    }




    resultatByScenarioAndDate(data){    
      return this.http.post(`${this.env.url}resultatByScenarioAndDate`, data, this.httpOptions2).pipe(retry(0), catchError(this.handleError)).toPromise();
  }





public exportAsExcelFile(filename,VoixOrangeArray,smsOrangeArray,dataOrangeArray,Voixonatel,smsonatel,dataonatel){

/* generate a worksheet */


var testOrangevoix = XLSX.utils.json_to_sheet(VoixOrangeArray);
var testOrangesms = XLSX.utils.json_to_sheet(smsOrangeArray);
var testOrangedata = XLSX.utils.json_to_sheet(dataOrangeArray);

var testonatelvoix = XLSX.utils.json_to_sheet(Voixonatel);
var testonatelsms = XLSX.utils.json_to_sheet(smsonatel);
var testonateldata = XLSX.utils.json_to_sheet(dataonatel);

/* add to workbook */
var wb = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(wb,testOrangevoix , "Voix Orange");
XLSX.utils.book_append_sheet(wb,testOrangesms , "SMS Orange");
XLSX.utils.book_append_sheet(wb,testOrangedata , "DATA Orange");

XLSX.utils.book_append_sheet(wb,testonatelvoix , "Voix Onatel");
XLSX.utils.book_append_sheet(wb,testonatelsms , "SMS Onatel");
XLSX.utils.book_append_sheet(wb,testonateldata , "DATA Onatel");




/* write workbook and force a download */
XLSX.writeFile(wb, filename+".xlsx");


}

public exportAsExcelFile1(filename,ArrayVoix,ArraySMS,ArrayData){

  /* generate a worksheet */
  var testvoix = XLSX.utils.json_to_sheet(ArrayVoix);
  var testsms = XLSX.utils.json_to_sheet(ArraySMS);
  var testdata = XLSX.utils.json_to_sheet(ArrayData);


  /* add to workbook */
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,testvoix , "Voix");
  XLSX.utils.book_append_sheet(wb,testsms , "SMS");
  XLSX.utils.book_append_sheet(wb,testdata , "Data");

  
  
  
  
  /* write workbook and force a download */
  XLSX.writeFile(wb, filename+".xlsx");
  
  
  }

public exportTracabilite(filename,voixArray){
var trace = XLSX.utils.json_to_sheet(voixArray);
/* add to workbook */
var wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb,trace , "Tab 1");

/* write workbook and force a download */
XLSX.writeFile(wb, filename+".xlsx");

}



public exportLog(filename,voixArray){
  var log = XLSX.utils.json_to_sheet(voixArray);
  /* add to workbook */
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,log , "Tab 1");
  
  /* write workbook and force a download */
  XLSX.writeFile(wb, filename+".xlsx");
  
  }


}



