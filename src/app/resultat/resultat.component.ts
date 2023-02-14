import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { ResultatService } from '../_services/resultat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ScenarioService, TraductionService } from '../_services';
import * as moment from 'moment/moment.js';
import { DatePipe } from '@angular/common';


import { ElementRef } from '@angular/core';


import * as CanvasJS from './../../assets/assets/js/canvasjs.min';
declare const $: any;

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})
export class ResultatComponent implements OnInit {



  public barChartOptionsv = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        type: 'linear',
        ticks: {
          min: 0,
        //  max: 10,
          stepSize: 1
        }
      }],
    }
    

  };


  public barChartTypev = 'bar';
  public barChartLegendv = true;
  public barChartLabelsv = [''];

  constructor(public result: ResultatService, public ScenarioService: ScenarioService, private formBuilder: FormBuilder, public traduction: TraductionService, public datepipe: DatePipe, private elementRef: ElementRef) {

    this.barChartVar = [
      { data: [0], label: 'Variation Coût Théorique' },
      { data: [0], label: 'Variarion Solde' }
    ];


  }


  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,

  };
  public barChartLabels = ['statistique'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [];
  public barChartVar = [];


  ngOnInit() {
    this.listScenario();
    this.onReset();
  }


 tacheDATA=[];
  exportAsXLSX(): void {


    var filename = this.scenario.scenario + " de " + this.datepipe.transform(this.dateDebut, 'dd-MM-yyyy HH:mm') + " a " + this.datepipe.transform(this.dateFin, 'dd-MM-yyyy HH:mm');


    var voixArray = []
    var smsArray = []
    var dataArray = []
    


    this.tacheVoix.forEach(task => {
      task.resultatVoixDTOs.forEach(element => {
        var item: any;
        let itemRoaming;  
        if(element.roaming){
          itemRoaming="Oui";
        }else{
          itemRoaming="Non";
        }

        item={"Contexte":task.tacheVoixDTO.contexte};
        item.Operateur_simEmettrice=task.tacheVoixDTO.operateurEmetteur;
        item.Offre_simEmettrice = task.tacheVoixDTO.offreEmetteur;
        item.Numéro_Sim_Emettrice = task.tacheVoixDTO.simEmettrice;
        item.Operateur_simDestinataire = task.tacheVoixDTO.operateurDestinataire;
        item.Offre_simDestinataire = task.tacheVoixDTO.offreDestinataire;
        item.Numéro_Sim_Destinataire = task.tacheVoixDTO.simDestinataire;
        item.Etat = element.etat;
        item.Roaming = itemRoaming;
        item.Date_Début = this.datepipe.transform(element.dateDebut, 'dd-MM-yyyy HH:mm:ss');
        item.Date_Fin = this.datepipe.transform(element.datefin, 'dd-MM-yyyy HH:mm:ss');
		
		item.Tarif_Annonce = element.tarifAnnonce;
        if (element.unite == -1) { item.Unite = "Appel" } else { item.Unite = element.unite };
		
		item.Duree_seconde = element.duree;
        item.Notification_Fin_Appel = element.tempsOperateur;
		
        item.Cout_Theorique = Math.round(element.coutTheorique * 100) / 100;
        item.Cout_Theorique_TempsOperateur = Math.round(element.coutTheoriqueTempsOperateur * 100) / 100;
        
        item.retourUSSDInitial = element.retourUSSDInitial;
        item.retourUSSDFinal = element.retourUSSDFinal;
        item.retourSMSInitial = element.retourSMSInitial;
        item.retourSMSFinal = element.retourSMSFinal;
        item.tentativesInitial = element.tentativesInitial;
        item.tentativesFinal = element.tentativesFinal;
        item.retourTempsOperateur = element.retourTempsOperateur;

        element.resultatCompteDTOs.forEach(element => {
          item["Solde Initial "+element.compte]=element.initiale;
          item["Solde Final "+element.compte]=element.finale;
          item["Variation "+element.compte]=element.variation;
          
        });

        voixArray.push(item);

      });

    });

    this.tacheSMS.forEach(task => {
        task.resultatSMSDTOs.forEach(element => {

          let itemRoaming;  
          if(element.roaming){
            itemRoaming="Oui";
          }else{
            itemRoaming="Non";
          }



          var item: any;
          item={"Contexte":task.tacheSMSDTO.contexte};
          item.Operateur_simEmettrice=task.tacheSMSDTO.operateurEmetteur;
          item.Offre_simEmettrice = task.tacheSMSDTO.offreEmetteur;
          item.Numéro_Sim_Emettrice = task.tacheSMSDTO.simEmettrice;
          item.Operateur_simDestinataire = task.tacheSMSDTO.operateurDestinataire;
          item.Offre_simDestinataire = task.tacheSMSDTO.offreDestinataire;
          item.Numéro_Sim_Destinataire = task.tacheSMSDTO.simDestinataire;
          item.Etat = element.etat;
          item.Roaming = itemRoaming;
          item.Date_Début = this.datepipe.transform(element.dateDebut, 'dd-MM-yyyy HH:mm:ss');
          item.Date_Fin = this.datepipe.transform(element.datefin, 'dd-MM-yyyy HH:mm:ss');
          
		  item.Tarif_Annonce = element.tarifAnnonce;
		  item.Nombre = element.nombre;
		  item.Cout_Theorique = Math.round(element.coutTheorique * 100) / 100;
          
          item.retourUSSDInitial = element.retourUSSDInitial;
          item.retourUSSDFinal = element.retourUSSDFinal;
          item.retourSMSInitial = element.retourSMSInitial;
          item.retourSMSFinal = element.retourSMSFinal;

          item.tentativesInitial = element.tentativesInitial;
          item.tentativesFinal = element.tentativesFinal;

  
          element.resultatCompteDTOs.forEach(element => {
            item["Solde Initial "+element.compte]=element.initiale;
            item["Solde Final "+element.compte]=element.finale;
            item["Variation "+element.compte]=element.variation;
          });
          smsArray.push(item);
        });
    });



    this.tacheFTP.forEach(task => {
        task.resultatDataDTOs.forEach(element => {
          var item: any;
          item={"Fichier":task.tacheDataDTO.fichierTelecharge};
          item.Service="FTP";
          item.Serveur=task.tacheDataDTO.serveur;
         
          item.Operateur=task.tacheDataDTO.operateurEmetteur;
          item.Offre = task.tacheDataDTO.offreEmetteur;
          item.Numéro_Sim = task.tacheDataDTO.simEmettrice;
  
          item.Etat = element.etat;
          item.dateExecution = this.datepipe.transform(element.dateExecution, 'dd-MM-yyyy HH:mm:ss');
		  item.Duree_seconde = element.Duree_seconde;
		  
		  item.Tarif_Annonce = element.tarifAnnonce;
      
          item.Volume_Theorique = Math.round(element.volumeTheorique * 100) / 100;
         
          item.Temps_Avant_USSD = task.tacheDataDTO.tempsAvantUSSD;
          item.retourUSSDInitial = element.retourUSSDInitial;
          item.retourUSSDFinal = element.retourUSSDFinal;
          item.retourSMSInitial = element.retourSMSInitial;
          item.retourSMSFinal = element.retourSMSFinal;

          item.tentativesInitial = element.tentativesInitial;
          item.tentativesFinal = element.tentativesFinal;

          element.resultatCompteDTOs.forEach(element => {
            item["Solde Initial "+element.compte]=element.initiale;
            item["Solde Final "+element.compte]=element.finale;
            item["Variation "+element.compte]=element.variation;
          });
          dataArray.push(item);
        });
    });
    this.tacheHTTP.forEach(task => {
      task.resultatDataDTOs.forEach(element => {
        var item: any;
        item={"Service":"HTTP"};
 
        item.Serveur=task.tacheDataDTO.serveur;
       
        item.Operateur=task.tacheDataDTO.operateurEmetteur;
        item.Offre = task.tacheDataDTO.offreEmetteur;
        item.Numéro_Sim = task.tacheDataDTO.simEmettrice;

        item.Etat = element.etat;
        item.dateExecution = this.datepipe.transform(element.dateExecution, 'dd-MM-yyyy HH:mm:ss');

        item.Volume_Theorique = Math.round(element.volumeTheorique * 100) / 100;
        item.Duree_seconde = element.Duree_seconde;
        item.Tarif_Annonce = element.tarifAnnonce;
        item.Temps_Avant_USSD = task.tacheDataDTO.tempsAvantUSSD;

        item.retourUSSDInitial = element.retourUSSDInitial;
        item.retourUSSDFinal = element.retourUSSDFinal;
        item.retourSMSInitial = element.retourSMSInitial;
        item.retourSMSFinal = element.retourSMSFinal;

        item.tentativesInitial = element.tentativesInitial;
        item.tentativesFinal = element.tentativesFinal;

        element.resultatCompteDTOs.forEach(element => {
          item["Solde Initial "+element.compte]=element.initiale;
          item["Solde Final "+element.compte]=element.finale;
          item["Variation "+element.compte]=element.variation;
        });
        dataArray.push(item);
      });
  });
  this.tacheSTREAM.forEach(task => {
    task.resultatDataDTOs.forEach(element => {
      var item: any;
      item={"Service":"STREAMING"};
   
      item.Serveur=task.tacheDataDTO.serveur;
     
      item.Operateur=task.tacheDataDTO.operateurEmetteur;
      item.Offre = task.tacheDataDTO.offreEmetteur;
      item.Numéro_Sim = task.tacheDataDTO.simEmettrice;

      item.Etat = element.etat;
      item.dateExecution = this.datepipe.transform(element.dateExecution, 'dd-MM-yyyy HH:mm:ss');

      item.Volume_Theorique = Math.round(element.volumeTheorique * 100) / 100;
      item.Duree_seconde = element.Duree_seconde;
      item.Tarif_Annonce = element.tarifAnnonce;
      item.Temps_Avant_USSD = task.tacheDataDTO.tempsAvantUSSD;

      item.retourUSSDInitial = element.retourUSSDInitial;
      item.retourUSSDFinal = element.retourUSSDFinal;
      item.retourSMSInitial = element.retourSMSInitial;
      item.retourSMSFinal = element.retourSMSFinal;

      item.tentativesInitial = element.tentativesInitial;
      item.tentativesFinal = element.tentativesFinal;

      element.resultatCompteDTOs.forEach(element => {
        item["Solde Initial "+element.compte]=element.initiale;
        item["Solde Final "+element.compte]=element.finale;
        item["Variation "+element.compte]=element.variation;
      });
      dataArray.push(item);
    });
});


   // this.result.exportAsExcelFile(filename, voixArray, smsOrangeArray, dataOrangeArray, voixonatelArray, smsonatelArray, dataonatelArray);
   this.result.exportAsExcelFile1(filename, voixArray,smsArray,dataArray);

  }

  showBar = false;
  showBarFn() {
    if (this.showBar) {
      this.showBar = false;
    }
    else {
      this.showBar = true;
    }
  }

  fullQuality;
  dataPointsCharVoix = [];
  dataPointsCharSMS = [];
  dataPointsCharData = [];

  expot() {

    var user = localStorage.getItem('currentUser');
    var userObject = JSON.parse(user)
    let doc = new jsPDF('l');
    //let doc = new jsPDF();
    doc.autoTable({ html: '.ok' });
    let finalY = doc.previousAutoTable.finalY;
	
   doc.text("Autorité de Régulation des \nCommunications Electroniques \net des Postes", 10, 15);
    doc.addImage(this.logotariff, 'PNG', 140, 10, 30, 20);
    doc.setFontSize(14);
    doc.text("BURKINA FASO", 232, 15);
    doc.setFontSize(12);
    doc.text("UNITE - PROGRES - JUSTICE", 220, 20);
	
    doc.autoTable.previous.finalY = doc.previousAutoTable.finalY + 40;
    var stateVOIX = true;

    
    var tabVariation=[];
    var nomComptes=[];
    this.tacheVoix.forEach(task => {

      this.dataPointsCharVoix = [];
      if (task.resultatVoixDTOs.length > 0) {
        if (stateVOIX) {
          stateVOIX = false;
          doc.setTextColor(1);
          doc.setFontSize(18);
          doc.text(this.traduction.langue.VOIX, 14, doc.autoTable.previous.finalY);
        }

        let coutTheorique = 0;
        let coutTheoriqueTempsOperateur = 0;
        var table = [];
        var tableHead = [];


  
        task.resultatVoixDTOs.forEach((element, indexresult) => {
          coutTheorique += element.coutTheorique;
          coutTheoriqueTempsOperateur += element.coutTheoriqueTempsOperateur;
          element.resultatCompteDTOs.forEach((value, index) => {
            if(indexresult==0){
              nomComptes.push(value.compte);
              tabVariation[index]=  Math.round(value.variation * 100) / 100 ;
            }else{
              tabVariation[index]=tabVariation[index]+(Math.round(value.variation * 100) / 100 );
            }
          });
        

          





            tableHead = [
              [
                { content: "Date", styles: { halign: 'center' } },
                { content: "Roaming", styles: { halign: 'center' } },
                { content: "Temps réel", styles: { halign: 'center' } },
                { content: "Temps\nOpérateur", styles: { halign: 'center' } },
                { content: "Coût théorique", styles: { halign: 'center' } },
                { content: "Coût Théorique\n(Temps Opérateur)", styles: { halign: 'center' } },
                { content: "Nom Compte", styles: { halign: 'center' } },
                { content: "Solde initial", styles: { halign: 'center' } },
                { content: "Solde Final", styles: { halign: 'center' } },
                { content: "Variation", styles: { halign: 'center' } },
                { content: "Etat", styles: { halign: 'center' } },
              ]];


              let Nomcompte="";
              let compteInitiale="";
              let compteFinale="";
              let compteVariation="";

              element.resultatCompteDTOs.forEach(element => {
                Nomcompte=Nomcompte+element.compte+"\n";   
              });
              element.resultatCompteDTOs.forEach(element => {
                compteInitiale=compteInitiale+Math.round(element.initiale * 100) / 100 +"\n";   
              });
              element.resultatCompteDTOs.forEach(element => {
                compteFinale=compteFinale+Math.round(element.finale * 100) / 100 +"\n";   
              });
              element.resultatCompteDTOs.forEach(element => {
                compteVariation=compteVariation+Math.round(element.variation * 100) / 100 +"\n";   
              });

              let itemRoaming;  
              if(element.roaming){
                itemRoaming="Oui";
              }else{
                itemRoaming="Non";
              }
            table.push([
              this.datepipe.transform(element.dateDebut, 'dd-MM-yyyy HH:mm:ss') + "\n" + this.datepipe.transform(element.datefin, 'dd-MM-yyyy HH:mm:ss'),
              itemRoaming,
              element.duree,
              element.tempsOperateur,
              Math.round(element.coutTheorique * 100) / 100,
              Math.round(element.coutTheoriqueTempsOperateur * 100) / 100,
              Nomcompte,
              compteInitiale,
              compteFinale,
              compteVariation,
              element.etat
            ]);

        

        });

        var index = doc.autoTable.previous.finalY + 10;


          
        this.dataPointsCharVoix.push({ y: Math.round(coutTheorique * 100) / 100, label: 'Coût Théorique', indexLabel: "" + Math.round(coutTheorique * 100) / 100, indexLabelFontSize: 28, labelFontSize: 28 })
        this.dataPointsCharVoix.push({ y: Math.round(coutTheoriqueTempsOperateur * 100) / 100, label: 'Coût Théorique TO', indexLabel: "" + Math.round(coutTheoriqueTempsOperateur * 100) / 100, indexLabelFontSize: 28, labelFontSize: 28 })
        
        this.dataPointsCharVoix.push({ y: Math.round(task.tacheVoixDTO.cumulVariationMonnaie * 100) / 100, label: 'Cumul Variation Monnaie', indexLabel: "" + Math.round(task.tacheVoixDTO.cumulVariationMonnaie * 100) / 100, indexLabelFontSize: 28, labelFontSize: 28 })
        
        tabVariation.forEach((element ,index)=> {
          this.dataPointsCharVoix.push({ y: Math.round(element * 100) / 100, label: nomComptes[index], indexLabel: "" + Math.round(element * 100) / 100, indexLabelFontSize: 28, labelFontSize: 28 })
        });



        $(".one").append('<div id="' + task.tacheVoixDTO.contexte + task.tacheVoixDTO.id + '" style="height: 370px; width: 100%;;visibility:hidden;"></div>');
        let chart = new CanvasJS.Chart(task.tacheVoixDTO.contexte + task.tacheVoixDTO.id + "", {
          animationEnabled: false, exportEnabled: false,
          title: { text: "Variation des comptes" , fontWeight: "kk", }, axisX: { labelFontSize: 20 }, axisY: { labelFontSize: 20 },
          data: [{
            type: "bar", axisYIndex: 1, 
            dataPoints: this.dataPointsCharVoix
          }]
        });

        chart.canvas.setAttribute("id", "id" + task.tacheVoixDTO.contexte + task.tacheVoixDTO.id);
        chart.render();


        var canvas = document.getElementById("id" + task.tacheVoixDTO.contexte + task.tacheVoixDTO.id) as HTMLCanvasElement;
        this.fullQuality = canvas.toDataURL('image/png', 1.0);

        //doc.text("size", 280, 210);

        if (index + 60 > 210) {
          doc.addPage();
          doc.addImage(this.fullQuality, 'PNG', 100, 15, 150, 50);
          doc.setFontSize(9);
          doc.setTextColor(100)
          doc.text(this.traduction.langue.contexte + ": " + task.tacheVoixDTO.contexte, 14, 10);
          doc.text(this.traduction.langue.operateur + ": " + task.tacheVoixDTO.operateurEmetteur, 14, 15);
          doc.text(this.traduction.langue.offre + ": " + task.tacheVoixDTO.offreEmetteur, 14, 20);
          doc.text(this.traduction.langue.simEmettrice + ": " + task.tacheVoixDTO.simEmettrice, 14, 25);
          doc.text(this.traduction.langue.operateur + ": " + task.tacheVoixDTO.operateurDestinataire, 14, 30);
          doc.text(this.traduction.langue.offre + ": " + task.tacheVoixDTO.offreDestinataire, 14, 35);
          doc.text(this.traduction.langue.simDestinataire + ": " + task.tacheVoixDTO.simDestinataire, 14, 40);


          if (task.resultatVoixDTOs[0].unite == -1) {
            doc.text(this.traduction.langue.tarifAnnonce + ": " + task.resultatVoixDTOs[0].tarifAnnonce + " " + this.traduction.langue.unite + " : " + "Appel", 14, 45);
          } else {
            doc.text(this.traduction.langue.tarifAnnonce + ": " + task.resultatVoixDTOs[0].tarifAnnonce + " " + this.traduction.langue.unite + " : " + task.resultatVoixDTOs[0].unite, 14, 45);
          }



          doc.autoTable({
            startY: 65,
            styles: {
              halign: 'center',
              fontSize: 8,
              width: 50,
              cellPadding: 0.2
            },
            head: tableHead,
            body: table,
          });











        } else {
          doc.addImage(this.fullQuality, 'PNG', 100, index, 150, 50);
          doc.setFontSize(9);
          doc.setTextColor(100)
          doc.text(this.traduction.langue.contexte + ": " + task.tacheVoixDTO.contexte, 14, doc.autoTable.previous.finalY + 20);
          doc.text(this.traduction.langue.operateur + ": " + task.tacheVoixDTO.operateurEmetteur, 14, doc.autoTable.previous.finalY + 25);
          doc.text(this.traduction.langue.offre + ": " + task.tacheVoixDTO.offreEmetteur, 14, doc.autoTable.previous.finalY + 30);
          doc.text(this.traduction.langue.simEmettrice + ": " + task.tacheVoixDTO.simEmettrice, 14, doc.autoTable.previous.finalY + 35);
          doc.text(this.traduction.langue.operateur + ": " + task.tacheVoixDTO.operateurDestinataire, 14, doc.autoTable.previous.finalY + 40);
          doc.text(this.traduction.langue.offre + ": " + task.tacheVoixDTO.offreDestinataire, 14, doc.autoTable.previous.finalY + 45);
          doc.text(this.traduction.langue.simDestinataire + ": " + task.tacheVoixDTO.simDestinataire, 14, doc.autoTable.previous.finalY + 50);


          if (task.resultatVoixDTOs[0].unite == -1) {
            doc.text(this.traduction.langue.tarifAnnonce + ": " + task.resultatVoixDTOs[0].tarifAnnonce + " " + this.traduction.langue.unite + " : " + "Appel", 14, doc.autoTable.previous.finalY + 55);
          } else {
            doc.text(this.traduction.langue.tarifAnnonce + ": " + task.resultatVoixDTOs[0].tarifAnnonce + " " + this.traduction.langue.unite + " : " + task.resultatVoixDTOs[0].unite, 14, doc.autoTable.previous.finalY + 55);
          }









          doc.autoTable({
            startY: doc.autoTable.previous.finalY + 65,
            styles: {
              halign: 'center',
              fontSize: 8,
              width: 50,
              cellPadding: 0.2
            },
            head: tableHead,
            body: table,
          });





        }









      }




    });

    if(this.tacheVoix.length>0){
    doc.autoTable.previous.finalY = doc.previousAutoTable.finalY + 10;
    }
    var stateSMS = true;
    this.tacheSMS.forEach(task => {
      this.dataPointsCharSMS = [];
      if (task.resultatSMSDTOs.length > 0) {
        if (stateSMS) {
          stateSMS = false;
          doc.setTextColor(1);
          doc.setFontSize(18);
          doc.text(this.traduction.langue.SMS, 14, doc.autoTable.previous.finalY);
        }
        var table = [];
        var tableHead = [];
        let coutTheorique = 0;
        let differenceSolde = 0;

      

        task.resultatSMSDTOs.forEach((element ,indexresult)=> {

          coutTheorique += element.coutTheorique;
          differenceSolde += element.differenceSolde;

          element.resultatCompteDTOs.forEach((value, index) => {
            if(indexresult==0){
              nomComptes.push(value.compte);
              tabVariation[index]=  Math.round(value.variation * 100) / 100 ;
            }else{
              tabVariation[index]=tabVariation[index]+(Math.round(value.variation * 100) / 100 );
            }
          });
        

            tableHead = [
              [
                { content: "Date", styles: { halign: 'center' } },
                { content: "Roaming", styles: { halign: 'center' } },
                { content: "Coût théorique", styles: { halign: 'center' } },
                { content: "Nom Compte", styles: { halign: 'center' } },
                { content: "Solde initial", styles: { halign: 'center' } },
                { content: "Solde Final", styles: { halign: 'center' } },
                { content: "Variation", styles: { halign: 'center' } },
                { content: "Etat", styles: { halign: 'center' } },
              ]];



              let Nomcompte="";
              let compteInitiale="";
              let compteFinale="";
              let compteVariation="";

              element.resultatCompteDTOs.forEach(element => {
                Nomcompte=Nomcompte+element.compte+"\n";   
              });
              element.resultatCompteDTOs.forEach(element => {
                compteInitiale=compteInitiale+Math.round(element.initiale * 100) / 100 +"\n";   
              });
              element.resultatCompteDTOs.forEach(element => {
                compteFinale=compteFinale+Math.round(element.finale * 100) / 100 +"\n";   
              });
              element.resultatCompteDTOs.forEach(element => {
                compteVariation=compteVariation+Math.round(element.variation * 100) / 100 +"\n";   
              });

            let itemRoaming;  
            if(element.roaming){
              itemRoaming="Oui";
            }else{
              itemRoaming="Non";
            }


            table.push([
              this.datepipe.transform(element.dateDebut, 'dd-MM-yyyy HH:mm:ss') + "\n" + this.datepipe.transform(element.datefin, 'dd-MM-yyyy HH:mm:ss'),
              itemRoaming,
              Math.round(element.coutTheorique * 100) / 100,
              Nomcompte,
              compteInitiale,
              compteFinale,
              compteVariation,
              element.etat
            ]);
        });


        var index = doc.autoTable.previous.finalY + 10;
 
        this.dataPointsCharSMS.push({ y: Math.round(coutTheorique * 100) / 100, label: 'Coût Théorique', indexLabel: "" + Math.round(coutTheorique * 100) / 100, indexLabelFontSize: 28, labelFontSize: 28 })

        this.dataPointsCharSMS.push({ y: Math.round(task.tacheSMSDTO.cumulVariationMonnaie * 100) / 100, label: 'Cumul Variarion Monnaie', indexLabel: "" + Math.round(task.tacheSMSDTO.cumulVariationMonnaie * 100) / 100, indexLabelFontSize: 28, labelFontSize: 28 })

        tabVariation.forEach((element ,index)=> {
          this.dataPointsCharSMS.push({ y: Math.round(element * 100) / 100, label: nomComptes[index], indexLabel: "" + Math.round(element * 100) / 100, indexLabelFontSize: 28, labelFontSize: 28 })
        });



        $(".one").append('<div id="SMS' + task.tacheSMSDTO.contexte + task.tacheSMSDTO.id + '" style="height: 370px; width: 100%;visibility:hidden;"></div>');
        let chart = new CanvasJS.Chart("SMS" + task.tacheSMSDTO.contexte + task.tacheSMSDTO.id + "", {
          animationEnabled: false, exportEnabled: false,
          title: { text: "Variation des comptes" , fontWeight: "kk",  }, axisX: { labelFontSize: 20 }, axisY: { labelFontSize: 20, },
          data: [{ type: "bar", axisYIndex: 1, dataPoints: this.dataPointsCharSMS }]
        });
        chart.canvas.setAttribute("id", "idSMS" + task.tacheSMSDTO.contexte + task.tacheSMSDTO.id);
        chart.render();



        var canvas = document.getElementById("idSMS" + task.tacheSMSDTO.contexte + task.tacheSMSDTO.id) as HTMLCanvasElement;
        this.fullQuality = canvas.toDataURL('image/png', 1.0);



        if (index + 60 > 210) {
          doc.addPage();
          doc.addImage(this.fullQuality, 'PNG', 100, 10, 150, 50);
          doc.setFontSize(9);
          doc.setTextColor(100)

          doc.text(this.traduction.langue.contexte + ": " + task.tacheSMSDTO.contexte, 14, 10);
          doc.text(this.traduction.langue.operateur + ": " + task.tacheSMSDTO.operateurEmetteur, 14, 15);
          doc.text(this.traduction.langue.offre + ": " + task.tacheSMSDTO.offreEmetteur, 14, 20);
          doc.text(this.traduction.langue.simEmettrice + ": " + task.tacheSMSDTO.simEmettrice, 14, 25);
          doc.text(this.traduction.langue.operateur + ": " + task.tacheSMSDTO.operateurDestinataire, 14, 30);
          doc.text(this.traduction.langue.offre + ": " + task.tacheSMSDTO.offreDestinataire, 14, 35);
          doc.text(this.traduction.langue.simDestinataire + ": " + task.tacheSMSDTO.simDestinataire, 14, 40);
          doc.text(this.traduction.langue.tarifAnnonce + ": " + task.resultatSMSDTOs[0].tarifAnnonce + " " + this.traduction.langue.nombre + " : " + task.resultatSMSDTOs[0].nombre, 14, 45);


          doc.autoTable({
            startY: 65,
            styles: {
              halign: 'center',
              fontSize: 8,
              width: 50,
              cellPadding: 0.2
            },

            head: tableHead,
            body: table,
          });



        } else {
          doc.addImage(this.fullQuality, 'PNG', 100, index + 5, 150, 50);
          doc.setFontSize(9);
          doc.setTextColor(100)
          doc.text(this.traduction.langue.contexte + ": " + task.tacheSMSDTO.contexte, 14, doc.autoTable.previous.finalY + 15);
          doc.text(this.traduction.langue.operateur + ": " + task.tacheSMSDTO.operateurEmetteur, 14, doc.autoTable.previous.finalY + 20);
          doc.text(this.traduction.langue.offre + ": " + task.tacheSMSDTO.offreEmetteur, 14, doc.autoTable.previous.finalY + 25);
          doc.text(this.traduction.langue.simEmettrice + ": " + task.tacheSMSDTO.simEmettrice, 14, doc.autoTable.previous.finalY + 30);
          doc.text(this.traduction.langue.operateur + ": " + task.tacheSMSDTO.operateurDestinataire, 14, doc.autoTable.previous.finalY + 35);
          doc.text(this.traduction.langue.offre + ": " + task.tacheSMSDTO.offreDestinataire, 14, doc.autoTable.previous.finalY + 40);
          doc.text(this.traduction.langue.simDestinataire + ": " + task.tacheSMSDTO.simDestinataire, 14, doc.autoTable.previous.finalY + 45);
          doc.text(this.traduction.langue.tarifAnnonce + ": " + task.resultatSMSDTOs[0].tarifAnnonce + " " + this.traduction.langue.nombre + " : " + task.resultatSMSDTOs[0].nombre, 14, doc.autoTable.previous.finalY + 50);

          doc.autoTable({
            startY: doc.autoTable.previous.finalY + 65,
            styles: {
              halign: 'center',
              fontSize: 8,
              width: 50,
              cellPadding: 0.2
            },

            head: tableHead,
            body: table,
          });






        }







      }
    });

    
    if(this.tacheSMS.length>0){
      doc.autoTable.previous.finalY = doc.previousAutoTable.finalY + 20;
    }
   



    if (this.tacheFTP.length > 0 || this.tacheHTTP.length > 0 || this.tacheSTREAM.length > 0) {
      doc.setTextColor(1);
      doc.setFontSize(18);
      doc.text(this.traduction.langue.DATA, 14, doc.autoTable.previous.finalY);
    }

   var tacheData=[];
    this.tacheFTP.forEach(task => {
      task.resultatDataDTOs.forEach(element => {
        element.service="FTP";
      })
      tacheData.push(task);
    });

    this.tacheHTTP.forEach(task => {
      task.resultatDataDTOs.forEach(element => {
        element.service="HTTP";
      })
      tacheData.push(task);
    });

    this.tacheSTREAM.forEach(task => {
      task.resultatDataDTOs.forEach(element => {
        element.service="STREAMING";
      })
      tacheData.push(task);
    });



    tacheData.forEach(task => {
      this.dataPointsCharData = [];
      if (task.resultatDataDTOs.length > 0) {
        var table = [];
        var tableHead = [];
        let volumeTheorique = 0;
  
        task.resultatDataDTOs.forEach((element,indexresult) => {

          volumeTheorique += element.volumeTheorique;


          element.resultatCompteDTOs.forEach((value, index) => {
            if(indexresult==0){
              nomComptes.push(value.compte);
              tabVariation[index]=  Math.round(value.variation * 100) / 100 ;
            }else{
              tabVariation[index]=tabVariation[index]+(Math.round(value.variation * 100) / 100 );
            }
          });

            tableHead = [
              [
                { content: "Date", styles: { halign: 'center' } },
                { content: "Service", styles: { halign: 'center' } },
                { content: "Volume\nThéorique", styles: { halign: 'center' } },
                { content: "Nom Compte", styles: { halign: 'center' } },
                { content: "Solde initial", styles: { halign: 'center' } },
                { content: "Solde Final", styles: { halign: 'center' } },
                { content: "Variation", styles: { halign: 'center' } },
                this.traduction.langue.duree,
                { content: "Etat", styles: { halign: 'center' } },
              ]];

              
              let Nomcompte="";
              let compteInitiale="";
              let compteFinale="";
              let compteVariation="";

              element.resultatCompteDTOs.forEach(element => {
                Nomcompte=Nomcompte+element.compte+"\n";   
              });
              element.resultatCompteDTOs.forEach(element => {
                compteInitiale=compteInitiale+Math.round(element.initiale * 100) / 100 +"\n";   
              });
              element.resultatCompteDTOs.forEach(element => {
                compteFinale=compteFinale+Math.round(element.finale * 100) / 100 +"\n";   
              });
              element.resultatCompteDTOs.forEach(element => {
                compteVariation=compteVariation+Math.round(element.variation * 100) / 100 +"\n";   
              });

            table.push([
              this.datepipe.transform(element.dateExecution, 'dd-MM-yyyy HH:mm:ss'),
              element.service,
              Math.round(element.volumeTheorique * 100) / 100,
              Nomcompte,
              compteInitiale,
              compteFinale,
              compteVariation,
              element.duree,
              element.etat

            ]);


        });
        var index = doc.autoTable.previous.finalY;

          this.dataPointsCharData.push({ y: Math.round(volumeTheorique * 100) / 100, label: 'Volume Théorique', indexLabel: "" + Math.round(volumeTheorique * 100) / 100, indexLabelFontSize: 28, labelFontSize: 28 })
          tabVariation.forEach((element ,index)=> {
            this.dataPointsCharData.push({ y: Math.round(element * 100) / 100, label: nomComptes[index], indexLabel: "" + Math.round(element * 100) / 100, indexLabelFontSize: 28, labelFontSize: 28 })
          });
  





        $(".one").append('<div id="' + task.tacheDataDTO.serveur + task.tacheDataDTO.id + '" style="height: 370px; width: 100%;visibility:hidden;"></div>');
        let chart = new CanvasJS.Chart(task.tacheDataDTO.serveur + task.tacheDataDTO.id + "", {
          animationEnabled: false, exportEnabled: false,
          title: { text: "Variation des comptes" , fontWeight: "kk",  }, axisX: { labelFontSize: 20 }, axisY: { labelFontSize: 20, },
          data: [{ type: "bar", dataPoints: this.dataPointsCharData }]
        });





        chart.canvas.setAttribute("id", "id" + task.tacheDataDTO.serveur + task.tacheDataDTO.id);
        chart.render();


        var canvas = document.getElementById("id" + task.tacheDataDTO.serveur + task.tacheDataDTO.id) as HTMLCanvasElement;
        this.fullQuality = canvas.toDataURL('image/png', 1);



        if (index + 70 > 210) {
          doc.addPage();
          doc.addImage(this.fullQuality, 'PNG', 100, 10, 150, 50);
          doc.setFontSize(9);
          doc.setTextColor(100)
          if (this.tacheFTP.length !=0) {doc.text(this.traduction.langue.fichier + ": " + task.tacheDataDTO.fichierTelecharge, 14, 10);}
          doc.text(this.traduction.langue.operateur + ": " + task.tacheDataDTO.operateurEmetteur, 14, 15);
          doc.text(this.traduction.langue.offre + ": " + task.tacheDataDTO.offreEmetteur, 14, 20);
          doc.text(this.traduction.langue.simEmettrice + ": " + task.tacheDataDTO.simEmettrice, 14, 25);
          doc.text(this.traduction.langue.serveurFTP + ": " + task.tacheDataDTO.serveur, 14, 30);
          doc.autoTable({
            startY: 60,
            styles: {
              fontSize: 8,
              halign: 'center',
              width: 50,
              cellPadding: 0.2
            },
            head: tableHead,
            body: table,
          });
        } else {
          doc.addImage(this.fullQuality, 'PNG', 100, index + 5, 150, 50);
          doc.setFontSize(11);
          doc.setTextColor(100)
          if (this.tacheFTP.length !=0) {doc.text(this.traduction.langue.fichier + ": " + task.tacheDataDTO.fichierTelecharge, 14, doc.autoTable.previous.finalY + 15);}
          doc.text(this.traduction.langue.operateur + ": " + task.tacheDataDTO.operateurEmetteur, 14, doc.autoTable.previous.finalY + 20);
          doc.text(this.traduction.langue.offre + ": " + task.tacheDataDTO.offreEmetteur, 14, doc.autoTable.previous.finalY + 25);
          doc.text(this.traduction.langue.simEmettrice + ": " + task.tacheDataDTO.simEmettrice, 14, doc.autoTable.previous.finalY + 30);
          doc.text(this.traduction.langue.serveurFTP + ": " + task.tacheDataDTO.serveur, 14, doc.autoTable.previous.finalY + 35);
          doc.autoTable({
            startY: doc.autoTable.previous.finalY + 60,
            styles: {
              fontSize: 8,
              halign: 'center',
              width: 50,
              cellPadding: 0.2
            },



            head: tableHead,
            body: table,
          });
        }

      }
    });











    
    var i;
    var pageCount = doc.internal.getNumberOfPages();
    for (i = 0; i < pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
 
      doc.text(20, 204, "__________________________________________________________________________________________________________________________________________________________________");
      doc.text(120, 202, "Source : Tariffs Tracker ®");
      doc.addImage(this.logosfm, 'PNG', 156, 198, 10, 5);
      doc.text(65, 208, "ARCEP - Adresse:  01 BP 6437 Ouagadougou 01, Burkina Faso, E-mail : secretariat@arcep.bf, Site Web: www.arcep.bf");
      doc.text(60, 214, "");

    }

    doc.save(this.scenario.scenario + "-" + this.datepipe.transform(this.dateDebut, 'dd-MM-yyyy') + "-" + this.datepipe.transform(this.dateFin, 'dd-MM-yyyy') + '.pdf');
  }










  scenario
  tacheAutreResultats = [];
  tacheDataResultats = [];




  tacheVoix = [];
  tacheSMS = [];
  tacheFTP = [];
  tacheSTREAM = [];
  tacheHTTP = [];
  typeScenario;

  onSubmit() {
/*
    if (!this.resultForm.value.dateDebut.includes("T00:00")) {
      this.resultForm.value.dateDebut = this.resultForm.value.dateDebut + "T00:00";
      this.resultForm.value.dateFin = this.resultForm.value.dateFin + "T23:59";
    }
*/

this.resultForm.value.dateDebut=moment(this.resultForm.value.dateDebut).format("YYYY-MM-DDTHH:mmZZ");
this.resultForm.value.dateFin=moment(this.resultForm.value.dateFin).format("YYYY-MM-DDTHH:mmZZ");



    console.log(this.resultForm.value);

    this.result.resultatByScenarioAndDate(this.resultForm.value).then(data => {
      this.scenario = data
      this.typeScenario = data['typeScenario'];

      this.tacheFTP = data['tacheFTPResultats'];
      this.tacheSTREAM = data['tacheSTREAMINGResultats'];
      this.tacheHTTP = data['tacheHTTPResultats'];

      this.tacheSMS = data['tacheSMSResultats'];
      this.tacheVoix = data['tacheVoixResultats'];
      console.log(data['tacheDataResultats']);
      console.log(data['tacheSMSResultats']);
      console.log(data['tacheVoixResultats']);
      //this.getchart();
    });


  }


  onSubmit2() {

    this.resultForm.value.dateDebut=moment(this.resultForm.value.dateDebut).format("YYYY-MM-DDTHH:mmZZ");
    this.resultForm.value.dateFin=moment(this.resultForm.value.dateFin).format("YYYY-MM-DDTHH:mmZZ");
    
    
    
        console.log(this.resultForm.value);
    
        this.result.recalculResultatByScenarioAndDate(this.resultForm.value).then(data => {
          this.scenario = data
          this.typeScenario = data['typeScenario'];
    
          this.tacheFTP = data['tacheFTPResultats'];
          this.tacheSTREAM = data['tacheSTREAMINGResultats'];
          this.tacheHTTP = data['tacheHTTPResultats'];
    
          this.tacheSMS = data['tacheSMSResultats'];
          this.tacheVoix = data['tacheVoixResultats'];
          console.log(data['tacheDataResultats']);
          console.log(data['tacheSMSResultats']);
          console.log(data['tacheVoixResultats']);
          //this.getchart();
        });
    
    
      }




  resultForm: FormGroup;
  Scenarios = [];
  listScenario() {
    this.ScenarioService.getAll().subscribe((data: any) => {
      console.log("scenarios--->", data)
      this.Scenarios = data;

    })

  }





  dateDebut
  dateFin
  onReset() {
    this.dateDebut = moment(new Date()).format("YYYY-MM-DD")+'T00:00';
    this.dateFin = moment(new Date()).format("YYYY-MM-DD")+'T23:59';

    console.log(this.dateDebut)
    this.resultForm = this.formBuilder.group({
      idScenario: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
    });

  }


  resultatVoix

  nomOperateur
  getResultVoix(result, nomOperateur) {
    console.log(result)
    this.resultatVoix = result;
    this.nomOperateur = nomOperateur;
  }

  resultatSMS
  getResultSMS(result, nomOperateur) {
    this.resultatSMS = result;
    this.nomOperateur = nomOperateur;
  }

  resultatData
  getResultData(result, nomOperateur) {
    this.resultatData = result;
    this.nomOperateur = nomOperateur;
  }

  valueChangeScenario() {

    console.log(this.resultForm.value)
  }




  status
  switchInfo(status) {
    this.status = status;
  }




  colorsbar = [];
  chartGLOB(id,type) {
    this.showBar = true;
    var tabVariation=[];
    var list=[];
    var sommeCoutTheorique=0;
	var sommeCoutTheoriqueTempsOperateur=0;
    var sommevolumeTheorique=0;
    this.colorsbar=[{backgroundColor:"#89b4c4"},{backgroundColor:"#f1d3a1"},{backgroundColor:"#7f2524"}]
    if(type=="FTP"){list=this.tacheFTP;}
    if(type=="HTTP"){list=this.tacheHTTP;}
    if(type=="STREAMING"){list=this.tacheSTREAM;}
    if(type=="VOIX"){list=this.tacheVoix;}
    if(type=="SMS"){list=this.tacheSMS;}


    if(type=='FTP' || type=='HTTP' ||type=='STREAMING'){
      list.forEach(task => {
        console.log(task)
        if (task.tacheDataDTO.id == id) {
          task.resultatDataDTOs.forEach((element , indexresult) => {
            sommevolumeTheorique=sommevolumeTheorique+element.volumeTheorique;
            element.resultatCompteDTOs.forEach((value, index) => {
              if(indexresult==0){
                this.barChartLabelsv[0]="VolumeTheorique";
                this.barChartLabelsv[index+1]=value.compte;
                tabVariation[index+1]=  Math.round(value.variation * 100) / 100 ;
              }else{
                tabVariation[index+1]=tabVariation[index+1]+(Math.round(value.variation * 100) / 100 );
              }
            });
          });
          tabVariation[0]=(Math.round(sommevolumeTheorique * 100) / 100 );;
          console.log(tabVariation)
          this.barChartVar = [{ data: tabVariation , label: 'Variation comptes' }];
        }
      });
    }
    
    if(type=='VOIX' ){
      list.forEach(task => {
        console.log(task)
        if (task.tacheVoixDTO.id == id) {
          task.resultatVoixDTOs.forEach((element , indexresult) => {
            sommeCoutTheorique=sommeCoutTheorique+element.coutTheorique;
            sommeCoutTheoriqueTempsOperateur=sommeCoutTheoriqueTempsOperateur+element.coutTheoriqueTempsOperateur;
            element.resultatCompteDTOs.forEach((value, index) => {
              if(indexresult==0){
                this.barChartLabelsv[0]="CoutTheorique";
                this.barChartLabelsv[1]="CoutThéorique TO";
                this.barChartLabelsv[index+2]=value.compte;
                tabVariation[index+2]=  Math.round(value.variation * 100) / 100 ;
              }else{
                tabVariation[index+2]=tabVariation[index+2]+(Math.round(value.variation * 100) / 100 );
              }
            });
          });
          tabVariation[0]=(Math.round(sommeCoutTheorique * 100) / 100 );
          tabVariation[1]=(Math.round(sommeCoutTheoriqueTempsOperateur * 100) / 100 );
          console.log(tabVariation)
          this.barChartVar = [{ data: tabVariation , label: 'Variation comptes' }];
        }
      });
    }

    if(type=='SMS' ){
      list.forEach(task => {
        console.log(task)
        if (task.tacheSMSDTO.id == id) {
          task.resultatSMSDTOs.forEach((element , indexresult) => {
            sommeCoutTheorique=sommeCoutTheorique+element.coutTheorique;
            element.resultatCompteDTOs.forEach((value, index) => {
              if(indexresult==0){
                this.barChartLabelsv[0]="CoutTheorique";
                this.barChartLabelsv[index+1]=value.compte;
                tabVariation[index+1]=  Math.round(value.variation * 100) / 100 ;
              }else{
                tabVariation[index+1]=tabVariation[index+1]+(Math.round(value.variation * 100) / 100 );
              }
            });
          });
          tabVariation[0]=(Math.round(sommeCoutTheorique * 100) / 100 );
          console.log(tabVariation)
          this.barChartVar = [{ data: tabVariation , label: 'Variation comptes' }];
        }
      });
    }

  }

logotariff=`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`

logosfm=`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`

}