import { Component, OnInit } from '@angular/core';
import { SimService, TraductionService, ScenarioService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare const $: any;
import * as moment from 'moment/moment.js';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.css']
})
export class ScenarioComponent implements OnInit {

  //TODO add scenario probleme
  Scenarios=[];
  scenarioForm: FormGroup;
  SCENARIO
  edit=false;
  erreursaisie=false;
  id;
  result="";
constructor(
  public traduction :TraductionService ,
   private formBuilder: FormBuilder,
   public ScenarioService:ScenarioService,
   public sim:SimService) { }

ngOnInit() {
  this.onReset();
  this.listScenario();
}




onReset(){
  this.dateCreation= moment(new Date()).format("YYYY-MM-DDThh:mm");
  this.scenarioForm = this.formBuilder.group({
    nom: ['', Validators.required],
    enumExecution: ['SERIE', Validators.required],
    codeConsultationSoldePackage: ['', Validators.required],
    dateCreation: ['', Validators.required],
});

this.edit=false;

}

dateCreation
selectScenario(scenario){
  this.dateCreation= moment(scenario.dateCreation).format("YYYY-MM-DDThh:mm");
  this.edit=true
  this.SCENARIO = scenario;

  this.scenarioForm = this.formBuilder.group({
    id: [scenario.id],
    nom: [scenario.nom],
    enumExecution: [scenario.enumExecution],
    codeConsultationSoldePackage: [scenario.codeConsultationSoldePackage],
    dateCreation: [scenario.dateCreation],
});

}


listScenario(){
  this.ScenarioService.getAll().subscribe((data:any)=>{
    console.log("scenarios--->",data)
    this.Scenarios=data;
    $(document).ready( function () {
      $('#recent-orders').DataTable({
       "scrollY":        "400px",
        "order": [[ 3, "desc" ]],
          "scrollCollapse": true,
      "language": {
              
          "sProcessing":     "Traitement en cours...",
          "sSearch":         "Rechercher&nbsp;:",
          "sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
          "sInfo":           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
          "sInfoEmpty":      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
          "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
          "sInfoPostFix":    "",
          "sLoadingRecords": "Chargement en cours...",
          "sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
          "sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
          "oPaginate": {
            "sFirst":      "Premier",
            "sPrevious":   "Pr&eacute;c&eacute;dent",
            "sNext":       "Suivant",
            "sLast":       "Dernier"
          },
          "oAria": {
            "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
            "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
          }
  
          }
    
    });
  } );
  })

}


onSubmit(){
 if(this.scenarioForm.value.nom){



  this.ScenarioService.addScenario(this.scenarioForm.value).then((data:any)=>{
    console.log("After add scenario-->",data);
    this.Scenarios=data;
    $('#default-confirmation').modal('show');
  
  });

  this.erreursaisie=false;
 }else{
  this.erreursaisie=true;
 }

 
this.edit=false;

}


delete(SCENARIO){
 
  this.ScenarioService.deleteScenario(SCENARIO.id).then((data:any)=>{
  console.log("After delete scenario-->",data);
  this.Scenarios=data;
  this.onReset();
})


}

message
execution(id){
  
  this.ScenarioService.executeScenario(id).then((data:any)=>{
	  this.message = data.data;
    console.log("result Execute-->",data);
  },err=>{
	      console.log("result Execute-->",err);
  });

}




}
