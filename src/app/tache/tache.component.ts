import { Component, OnInit } from '@angular/core';
import {  OperateurService, SimService, TraductionService, ScenarioService, TaskService, ServeurFtpService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare const $: any;

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit {


    SimsAssocie=[];
    tarifications=[];
    taches=[];

    serveurFTPs=[];
    taskForm: FormGroup;
    SIM
    operateurs;

    simEmettrice
    simDestinataire
    operateur
    scenarios=[];
    idSimsUtilises=[];
    switch="VOIX";

    stateErreur=false;
    messageErreue;


   
    
    tempsAvantUSSD="5";

    typeScenarioSelected
    senarioType
    simEmettriceFix
    typeOffreSelected;
    noOffre=false;


  constructor(
    public traduction :TraductionService ,
     private formBuilder: FormBuilder,
     public operateurService:OperateurService,
     public taskService:TaskService,
     public serveurService:ServeurFtpService,
     public ScenarioService:ScenarioService,
     public sim:SimService) { }

  ngOnInit() {
    this.onReset();
    this.reloadSIM();
    this.listOperateur();
    this.listScenario();
    this.listServeurFTP();
  }


  switchInfo(data){
    this.switch=data;
  }

  onReset(){
     this.taskForm = this.formBuilder.group({
    simEmettrice: ['', Validators.required],
    numeroDestinataire: ['', Validators.required],
    operateur: ['', Validators.required],
    typeTache: ['', Validators.required],

    simDestinataire: ['', Validators.required],

    nombreIteration: [1, Validators.required],
    tempsInterIteration: [5, Validators.required],
    tempsAvantUSSD: [5, Validators.required],
    scenario: ['', Validators.required],
    contexte: ['ONNET', Validators.required],
    dureeNombre: [0, Validators.required],
    tarification: ['', Validators.required],
    fichier: ['F_1M', Validators.required],
    serveurFTP: ['', Validators.required],
    facturation: ['VOLUME', Validators.required],

});

  }

  selectSim(sim){
    this.SIM = sim;
  }

idTask
  deleteTask(id){
    this.idTask=id;
  }



  deleteTaskwithId(){
    console.log("delete-->",this.idTask)
    this.taskService.deleteTask(this.idTask).then(data=>{
      console.log("list-->",data)
      this.valueChangeScenario();
    })
  }

  reloadSIM(){
    this.SimsAssocie=[];

    this.sim.refreshSIM().then((data:any)=>{
      this.SimsAssocie=data;


      if(data[0]){
        this.simEmettrice=data[0].id;
      }
      
      if(data[1]){
      this.simDestinataire=data[1].id;
      }

    })

  }

  disconnectAll(){
    this.sim.disconnectAllPort().then((data:any)=>{
   // console.log("disconnectAllPort-->",data)
    });
  }


  cnx="ONNET"
  valueChange(){
    
   
    
      if(this.taskForm.value.simDestinataire=='0'){
        this.sim.getContext(this.taskForm.value.simEmettrice,0,this.operateur).then((data:any)=>{
          this.cnx=data.reponse;
        })
      }else{
        this.sim.getContext(this.taskForm.value.simEmettrice,this.taskForm.value.simDestinataire,null).then((data:any)=>{
          this.cnx=data.reponse;
        })
      }

   


    if(this.taskForm.value.simEmettrice!=0){
      

      if(this.noOffre){
        this.taskForm.value.simEmettrice = this.simEmettrice;
  
      }
  
  
      this.taskForm.value.simDestinataire = this.simDestinataire;
      this.taskForm.value.operateur = this.operateur;
      var object;

      if(this.taskForm.value.simDestinataire=='0'){
        this.sim.getContext(this.taskForm.value.simEmettrice,0,this.operateur).then((data:any)=>{
          this.cnx=data.reponse;
        })
      }else{
        this.sim.getContext(this.taskForm.value.simEmettrice,this.taskForm.value.simDestinataire,null).then((data:any)=>{
          this.cnx=data.reponse;
        })
      }
  
  
  
      if(this.taskForm.value.facturation=="INTERNETDIRECT" && this.taskForm.value.typeTache=="FTP" ){
      
        object={'idSim':this.taskForm.value.simEmettrice, 'idOperateurDestinataire':this.taskForm.value.operateur, 'typeTarification':"DATA"}
        this.taskService.listTarificationsSimEmOpDestType(object).then((data:any)=>{
         this.tarifications = data;
         console.log('tarification --> ',data);
        })
      }else if(this.taskForm.value.simDestinataire=='0'){
         object={'idSim':this.taskForm.value.simEmettrice, 'idOperateurDestinataire':this.taskForm.value.operateur, 'typeTarification':this.taskForm.value.typeTache}
         this.taskService.listTarificationsSimEmOpDestType(object).then((data:any)=>{
          this.tarifications = data;
         })
  
      }else{
        this.SimsAssocie.forEach(element => {
          if(element.id==this.taskForm.value.simDestinataire){
             object={'idSim':this.taskForm.value.simEmettrice, 'idOperateurDestinataire':element.operateur.id, 'typeTarification':this.taskForm.value.typeTache}
             this.taskService.listTarificationsSimEmOpDestType(object).then((data:any)=>{
              console.log('tarification --> ',data);
              this.tarifications = data;
             })
          }
        });
      }
    }


  }


onSubmit(){

  this.taskForm.value.contexte=this.cnx;
  console.log(this.taskForm.value);
  

  if(this.taskForm.value.facturation=="VOLUME" && this.taskForm.value.typeTache=='FTP'){this.taskForm.value.tarification=0}

        if(this.typeScenarioSelected=='PARALLELE'){


          if(!this.idSimsUtilises.includes(Number(this.taskForm.value.simEmettrice)) && !this.idSimsUtilises.includes(Number(this.taskForm.value.simDestinataire)) ){

            if(this.taskForm.value.simEmettrice==this.taskForm.value.simDestinataire && this.taskForm.value.typeTache=='VOIX'){
              this.messageErreue=this.traduction.langue.duplicatesim;
            this.stateErreur=true;
            }else{
               if(this.taskForm.value.simDestinataire=='0'){
                this.stateErreur=false;
                this.taskService.addTask(this.taskForm.value).then((data:any)=>{
                  this.taches=data.taches;
                  this.idSimsUtilises=data.idSimsUtilises;
                 // this.valueChangeScenario();
                  $('#default-confirmation').modal('show');
                 })

             }else{
              this.taskForm.value.operateur=0;
              this.stateErreur=false
              this.taskService.addTask(this.taskForm.value).then((data:any)=>{
                this.taches=data.taches;
                this.idSimsUtilises=data.idSimsUtilises;
             //   this.valueChangeScenario();
                $('#default-confirmation').modal('show');
               });

             }

            }

          }else{
            console.log('--> SIM OCCUPER');
            this.messageErreue=this.traduction.langue.simoccuper;
            this.stateErreur=true;
          }



        }else{

          if(this.taskForm.value.simEmettrice==this.taskForm.value.simDestinataire && this.taskForm.value.typeTache=='VOIX'){
            this.messageErreue=this.traduction.langue.duplicatesim;;
            this.stateErreur=true;
          }else{
             if(this.taskForm.value.simDestinataire=='0'){
              this.stateErreur=false;
              this.taskService.addTask(this.taskForm.value).then((data:any)=>{
                console.log(data)

                this.taches=data.taches;
                this.idSimsUtilises=data.idSimsUtilises;
               // this.valueChangeScenario();
                $('#default-confirmation').modal('show');
               })

           }else{
            this.taskForm.value.operateur=0;
            this.stateErreur=false;
            console.log(this.taskForm.value)
            this.taskService.addTask(this.taskForm.value).then((data:any)=>{
              console.log(data)
              this.taches=data.taches;
              this.idSimsUtilises=data.idSimsUtilises;
              //this.valueChangeScenario();
              $('#default-confirmation').modal('show');
             })


           }

          }

        }


}

listScenario() {
  this.ScenarioService.getAll().subscribe((data: any) => {
    this.scenarios = data;
  });
}

listServeurFTP() {
  this.serveurService.getAll().subscribe((data: any) => {
    this.serveurFTPs = data;
  });
}

listOperateur() {
    this.operateurService.getAll().then((data: any) => {
      this.operateurs = data;
      console.log(this.operateurs)
      if(data[0]) {
        this.operateur = data[0].id;
        console.log(this.operateur)
      }
    });
  }


valueChangeScenario(){


this.taskService.verifierSim(this.taskForm.value.scenario).then((data:any)=>{
  console.log(data);
 this.taches=data.taches;
 this.idSimsUtilises=data.idSimsUtilises;
 this.typeScenarioSelected =data.execution;


 this.scenarios.forEach(data=>{
    if(data.id==this.taskForm.value.scenario){
      this.senarioType=data.typeScenario;

      this.typeOffreSelected=data.typeScenario;
     // console.log("ddd",data.typeScenario);

    }
 });

if(data.taches.length==0 && data.taches.length==0 ){

  this.noOffre=true;

}else{
  this.noOffre=false;


  if(data.taches.length!=0){
    this.taskForm.value.simEmettrice=data.taches[0].simEmettrice.msisdn;
    this.simEmettriceFix=data.taches[0].simEmettrice;







    this.taskForm.value.simEmettrice=this.simEmettriceFix.id;
    this.taskForm.value.simDestinataire=this.simDestinataire;
    this.taskForm.value.operateur=this.operateur;
    var object;





    if(this.taskForm.value.facturation=="INTERNETDIRECT" && this.taskForm.value.typeTache=="FTP" ){
    
      object={'idSim':this.taskForm.value.simEmettrice, 'idOperateurDestinataire':this.taskForm.value.operateur, 'typeTarification':"DATA"}

      this.taskService.listTarificationsSimEmOpDestType(object).then((data:any)=>{
       this.tarifications = data;
       console.log('tarification --> ',data);
      })
    }else if(this.taskForm.value.simDestinataire=='0'){
       object={'idSim':this.taskForm.value.simEmettrice, 'idOperateurDestinataire':this.taskForm.value.operateur, 'typeTarification':this.taskForm.value.typeTarification}
       this.taskService.listTarificationsSimEmOpDestType(object).then((data:any)=>{
        this.tarifications = data;
       })

    }else{
      this.SimsAssocie.forEach(element => {
        if(element.id==this.taskForm.value.simDestinataire){
           object={'idSim':this.taskForm.value.simEmettrice, 'idOperateurDestinataire':element.operateur.id, 'typeTarification':this.taskForm.value.typeTarification}
           this.taskService.listTarificationsSimEmOpDestType(object).then((data:any)=>{
            this.tarifications = data;
           })
        }
      });
    }




















  }
  if(data.taches.length!=0){
    this.taskForm.value.simEmettrice=data.taches[0].simEmettrice.msisdn;
    this.simEmettriceFix=data.taches[0].simEmettrice;



    this.taskForm.value.simEmettrice=this.simEmettriceFix.id;
    this.taskForm.value.simDestinataire=this.simDestinataire;
    this.taskForm.value.operateur=this.operateur;
    var object;

    if(this.taskForm.value.facturation=="INTERNETDIRECT" && this.taskForm.value.typeTache=="FTP" ){
    
      object={'idSim':this.taskForm.value.simEmettrice, 'idOperateurDestinataire':this.taskForm.value.operateur, 'typeTarification':"DATA"}
      this.taskService.listTarificationsSimEmOpDestType(object).then((data:any)=>{
      // this.tarifications = data;
       console.log('tarification --> ',data);
      })
    }else if(this.taskForm.value.simDestinataire=='0'){
       object={'idSim':this.taskForm.value.simEmettrice, 'idOperateurDestinataire':this.taskForm.value.operateur, 'typeTarification':this.taskForm.value.typeTarification}
       this.taskService.listTarificationsSimEmOpDestType(object).then((data:any)=>{
     //   this.tarifications = data;
       })

    }else{
      this.SimsAssocie.forEach(element => {
        if(element.id==this.taskForm.value.simDestinataire){
           object={'idSim':this.taskForm.value.simEmettrice, 'idOperateurDestinataire':element.operateur.id, 'typeTarification':this.taskForm.value.typeTarification}
           this.taskService.listTarificationsSimEmOpDestType(object).then((data:any)=>{
        //    this.tarifications = data;
           })
        }
      });
    }









  }


}


});



  }

}
