import { Component, OnInit } from '@angular/core';
import { TraductionService, ScenarioService, CampagneService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare const $: any;

@Component({
  selector: 'app-campagne',
  templateUrl: './campagne.component.html',
  styleUrls: ['./campagne.component.css']
})
export class CampagneComponent implements OnInit {

  scenarios=[];
  scenariosSelected=[];
  campagnes=[]
  campagneForm: FormGroup;
  camp;

  constructor(public traduction:TraductionService,public scenarioService:ScenarioService,private formBuilder: FormBuilder,public campagne:CampagneService) { }

  ngOnInit() {
    this.listScenarios();
    this.onReset();
    this.listCampagne();
  }

  onReset(){
    this.campagneForm = this.formBuilder.group({
      nom: ['', Validators.required],
      idScenarios: ['', Validators.required],
  });
  
  }
  

  onSubmit(){
   var ids=[];
   this.scenariosSelected.forEach(element => {ids.push(element.id) });
   this.campagneForm.value.idScenarios=ids;


  console.log('add-->',this.campagneForm.value)
   this.campagne.addCampagne(this.campagneForm.value).then((data:any)=>{ 
     console.log('after add-->',data)
     this.campagnes=data;
     $('#default-confirmation').modal('show');
    });
}


listScenarios(){
  this.scenarioService.getAll().subscribe((data:any) => {
    console.log('scenario-->',data)
    this.scenarios=data;

  })

}


listCampagne(){
  this.campagne.listCampagnesAvecScenarios().subscribe((data:any)=>{
    console.log('campagne -->',data)
    this.campagnes=data;
  })
}



deleteCampagne(){

this.campagne.deleteCampagnes(this.idCampagne).then((data:any)=>{
  console.log('delete -->',data)
  this.campagnes=data;
  this.detail=[];
})


}


deleteScenario(){

  this.campagne.deleteScenario({'idCampagne':this.idCampagne,'idScenario':this.SCENARIO.id}).then((data:any)=>{
    console.log('delete -->',data)
    this.detail=data.scenarios;

  })

  }


  SCENARIO
  selectScenario(sc){
    this.SCENARIO=sc;

  }



deleteFromlist(scenario){
  this.scenariosSelected.forEach( (element, index) => {
    if(element.id==scenario.id){
      this.scenariosSelected.splice(index,1);
    }
  });
}

addTolist(scenario){
if(!this.scenariosSelected.includes(scenario)){
  this.scenariosSelected.push(scenario);
}
}


valueChangeCampagne(campagne){
  console.log('campagne :-->',campagne)

}

detail;
idCampagne
test(camp){

  this.campagnes.forEach(element => {
    if(element.campagne.id==camp){
     this.idCampagne=element.campagne.id;
     this.detail=element.scenarios;
    }
    
  });

}
}
