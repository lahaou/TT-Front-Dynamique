import { Component, OnInit, ViewChild, SimpleChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScenarioService, TraductionService } from '../_services';
import * as moment from 'moment/moment.js';
import { DatePipe } from '@angular/common';
import {  ElementRef } from '@angular/core';
import { ResultatService } from '../_services/resultat.service';
declare const $: any;


@Component({
  selector: 'app-execution',
  templateUrl: './execution.component.html',
  styleUrls: ['./execution.component.css']
})
export class ExecutionComponent implements OnInit {
  id;
  resultForm: FormGroup;

constructor( public result:ScenarioService,public ScenarioService:ScenarioService,public traduction :TraductionService,private formBuilder: FormBuilder){
}


  ngOnInit() {

    this.resultForm = this.formBuilder.group({
      idScenario: [0, Validators.required]
    });

        this.getListScenarios();
        this.getStatusScenario();

        this.id = setInterval(() => {
         // console.log("status ++")
          this.getStatusScenario(); 
        }, 2000);

  }



  stop(){
    this.ScenarioService.stopScenario().then(data=>{console.log(data)});
    if (this.id) {
      clearInterval(this.id);
    }
    this.ScenarioService.resultglobal="";
  }





  idScenario;
  Scenarios=[];
  getListScenarios(){
    this.ScenarioService.scenariosEnExecution().then((data:any)=>{
      this.Scenarios=data;
      if(data[0]){
        this.idScenario = data[0].id;
      }
    });
  }

  tab=[]
  getStatusScenario(){

    if(this.idScenario){

      this.ScenarioService.execStatusScenario(this.idScenario).then(data=>{
        if(data['data']!=null){
          if(data['data']!="Fin d'exécution"){
            this.tab.push(data);
          } else {
            this.tab = [];
          }
        }
       // if(data['data']=="Fin d'exécution"){
        //this.stop();
        //this.ScenarioService.resultglobal="";
        //}
        document.querySelector('.mesgs').scrollTop = document.querySelector('.mesgs').scrollHeight
          
        });

    }
    
  }



    public ngOnDestroy() {
      clearInterval(this.id);
    }


}