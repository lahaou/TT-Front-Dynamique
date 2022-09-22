import { Component, OnInit } from '@angular/core';
import { TraductionService, CampagneService, PlanificationService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare const $: any;
import * as moment from 'moment/moment.js';

@Component({
  selector: 'app-planification',
  templateUrl: './planification.component.html',
  styleUrls: ['./planification.component.css']
})
export class PlanificationComponent implements OnInit {

  campagnes=[];
  planifications=[];
  planificationForm: FormGroup;
  datePlanification
  constructor(public traduction:TraductionService,public campagne:CampagneService,public planification:PlanificationService,private formBuilder: FormBuilder) { }
 
  ngOnInit() {
    this.listCampagne();
    this.listPlanification();
    this.onReset();


  //  document.getElementById("default-confirmation").;
  }


listCampagne(){
  this.campagne.listCampagnesAvecScenarios().subscribe((data:any)=>{
    this.campagnes=data;

  })
}

onReset(){
  this.datePlanification= moment(new Date()).format("YYYY-MM-DDTHH:mm");
  this.planificationForm = this.formBuilder.group({
    idCampagne: ['', Validators.required],
    datePlanification: ['', Validators.required],
});

}



onSubmit(){
  console.log(this.planificationForm.value);
  this.planificationForm.value.idCampagne=this.CAMPAGNE.campagne.id;

  this.planificationForm.value.datePlanification=moment(
	this.planificationForm.value.datePlanification).format("YYYY-MM-DDTHH:mmZZ");

  if(this.planificationForm.value.idCampagne){
    this.planification.addPlanification(this.planificationForm.value).then((data:any)=>{
      console.log('after add',data)
      this.planifications=data;
      $('#default-confirmation').modal('show');
    })
  }


}

listPlanification(){
  this.planification.getAll().subscribe((data:any)=>{
    console.log('planification',data)
    this.planifications=data;

  })
}

PLANIFICATION
selectPlanification(plan){
  this.PLANIFICATION=plan;
}



/**********Update************/
update=false;
selectPlanification2(plan){
  this.datePlanification= moment(plan.datePlanification).format("YYYY-MM-DDTHH:mm");

 this.PLANIFICATION=plan;
 this.update=true;
}
annuler(){
  this.update=false;
}
modifier(){
  this.planificationForm.value.idCampagne=this.PLANIFICATION.campagne.id;
  this.planificationForm.value.id=this.PLANIFICATION.id;
  
  
  this.planificationForm.value.datePlanification=moment(
	this.planificationForm.value.datePlanification).format("YYYY-MM-DDTHH:mmZZ");
  
  
  this.planification.deletePlanification(this.PLANIFICATION.id).then((data:any)=>{
    this.planification.addPlanification(this.planificationForm.value).then((data:any)=>{
      this.update=false;
      console.log('after add',data)
      this.planifications=data;
      $('#default-confirmation').modal('show');
    })
  
  })
}
/****************************/


CAMPAGNE
selectCampagne(campagne){
  this.CAMPAGNE=campagne;

  $("tr").click(function(){
    $(this).addClass("selected").siblings().removeClass("selected");
});​

}

deletePlanification(){
  this.planification.deletePlanification(this.PLANIFICATION.id).then((data:any)=>{
    this.planifications=data;
  })
}


}
