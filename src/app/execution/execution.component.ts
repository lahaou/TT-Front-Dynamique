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

constructor( public result:ScenarioService,public ScenarioService:ScenarioService,public traduction :TraductionService){
}


  ngOnInit() {
        this.getStatusScenario();
        this.id = setInterval(() => {
          console.log("status ++")
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





  getStatusScenario(){
    this.ScenarioService.execStatusScenario().then((data:any)=>{
    if(data['data']!=null){
      this.ScenarioService.resultglobal = this.ScenarioService.resultglobal+"<br>" + data['data'];
    }
    if(data['data']=="Fin d'exécution"){
    //this.stop();
	this.ScenarioService.resultglobal="";
    }
    document.querySelector('.mesgs').scrollTop = document.querySelector('.mesgs').scrollHeight
      
    });
    }



    public ngOnDestroy() {
      clearInterval(this.id);
    }


}