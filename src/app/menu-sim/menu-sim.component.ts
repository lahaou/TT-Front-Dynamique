  import { Component, OnInit } from '@angular/core';
  import { OperateurService, SimService, TraductionService} from '../_services';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import * as moment from 'moment/moment.js';
  
  @Component({
    selector: 'app-menu-sim',
    templateUrl: './menu-sim.component.html',
    styleUrls: ['./menu-sim.component.css']
  })
  export class MenuSimComponent implements OnInit {
  
  
      SimsAssocie=[];   //liste des sims in simBOX
      taskForm: FormGroup;
      SIM
 

    constructor(
      public traduction :TraductionService ,
       private formBuilder: FormBuilder,
       public sim:SimService,
       public operateur:OperateurService) { }

    ngOnInit() {
      this.onReset();
      this.reloadSIM();
    }

    onReset(){
       this.taskForm = this.formBuilder.group({
        Sim: ['', Validators.required],
        portSim: ['', Validators.required],
        codeUSSD: ['', Validators.required],
        SMS: ['', Validators.required],
         });
    }



    message
    sendmessage(){
      this.sim.sendSMS(this.taskForm.value.portSim,this.taskForm.value.SMS,this.message).then(data=>{
        this.USSDmessage=data['reponse'];
        this.message="";
        console.log("solde",data['reponse']);
      });
    }





    selectSim(sim){
      this.SIM = sim;
    }

    reloadSIM(){
      this.SimsAssocie=[];

      this.sim.refreshSIM().then((data:any)=>{
        this.SimsAssocie=data;
        console.log("SIM-->",data)

      })

    }


  
listComptes=[];
    valueChange(){
      console.log(this.taskForm.value.portSim);
      this.listComptes=[];

    
      this.SimsAssocie.forEach(element => {
        if(element.portSim==this.taskForm.value.portSim){
          this.SIM=element;

          this.operateur.getUssdByIdoperateur(this.SIM.operateur.id).then((data:any )=>{
            this.listComptes=data;
            console.log("listComptes",data);
          });
        }
        
      });


    }


  
 


    suiviSolde(compteId){
          this.reset();
          this.sim.suiviSolde(this.taskForm.value.portSim,compteId.target.value).then(data=>{
          this.USSDmessage=data['reponse'];
        });

    }



    solde(){
      this.reset();
      this.sim.getSolde(this.taskForm.value.portSim).then(data=>{
        this.USSDmessage=data['reponse'];
        console.log("solde",data['reponse']);
      });
    }


    SMSmessage
    getSms(){
      //this.reset();
      this.sim.getSms(this.taskForm.value.portSim).then(data=>{
        this.SMSmessage=data;
        console.log("SMS",data['reponse']);
      });
    }
    deleteSMS(indexSMS){
      this.sim.deleteSms(this.taskForm.value.portSim,indexSMS).then(data=>{
        this.SMSmessage=data;
        console.log("SMS",data['reponse']);
      });
    }



    restart(){
      this.reset();
      this.sim.restart(this.taskForm.value.portSim).then(data=>{
        console.log("restart",data['reponse']);
      });
    }


    cancel(){
      this.reset();
      this.sim.cancel(this.taskForm.value.portSim).then(data=>{
        console.log("cancel",data['reponse']);
      });

    }

    numerocarte
    recharge(){

   
    
      console.log("numerocarte:",this.numerocarte);
      this.taskForm.value.codeUSSD=this.numerocarte;
      this.sim.recharge(this.taskForm.value).then(data=>{
        this.USSDmessage=data['reponse'];
        console.log("recharge",data['reponse']);
       // this.reset();
      });
      
    }



    ussdd
    sms
    USSDmessage;
    valider(){
      console.log(this.taskForm.value);
      this.USSDmessage="";
        this.sim.setUSSD(this.taskForm.value).then(data=>{
          this.USSDmessage=data['reponse'];
        });
    }



    monNumero(){
      console.log(this.taskForm.value);
      this.USSDmessage="";
        this.sim.simNumber(this.taskForm.value).then(data=>{
          this.USSDmessage=data['reponse'];
        });
    }







    appele(variable){
      console.log(variable);
      this.USSDmessage="";
      if(variable){
        this.sim.appeler(this.taskForm.value.portSim,this.taskForm.value.SMS).then(data=>{
        //  this.USSDmessage=data['reponse'];
        });

      }else{
        this.sim.raccrocher(this.taskForm.value).then(data=>{
      //    this.USSDmessage=data['reponse'];
        });

      }


    }



time;
    timeModem(){
   this.sim.getTimeModem(this.taskForm.value.portSim).then(data=>{
        this.time=data['reponse'];
      });


    }




    reset(){
    
      this.USSDmessage="";
      this.ussdd="";
      this.sms="";
      //this.taskForm.value.codeUSSD="";
      this.numerocarte=""
    }

  
    }
    