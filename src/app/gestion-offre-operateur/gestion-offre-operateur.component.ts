  import { Component, OnInit } from '@angular/core';
  import {  OffreService, OperateurService, GestionOffreOperateurService, TraductionService } from '../_services';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  
  declare const $: any;
  
  
  @Component({
    selector: 'app-gestion-offre-operateur',
    templateUrl: './gestion-offre-operateur.component.html',
    styleUrls: ['./gestion-offre-operateur.component.css']
  })
  export class GestionOffreOperateurComponent implements OnInit {
  offres:any;
  operateurs:any;
  offersSelected=[];
  OffresAssocie=[];
  OperateurForm: FormGroup;


constructor(
  public traduction: TraductionService ,
  private offreService: OffreService,
  private operateurService: OperateurService,
  private formBuilder: FormBuilder,
  public gestion: GestionOffreOperateurService) { }

ngOnInit() {
  this.OperateurForm = this.formBuilder.group({
    operateur: ['1', Validators.required],

});
this.listeOffresParOperateur(this.OperateurForm.value.operateur)
  this.listeoffres();
  this.listeOperateurs();
}

listeoffres(){
    this.offreService.getAll().subscribe(offres => {
        this.offres = offres;
        console.log(offres);
    });
}

listeOperateurs(){
  this.operateurService.getAll().then((operateurs:any) => {
      this.operateurs=operateurs;
      console.log(operateurs)
  });
}



deleteFromlist(offre){
  this.offersSelected.forEach( (element, index) => {
    if(element.id==offre.id){
      this.offersSelected.splice(index,1);
    }
  });
}

addTolist(offre){
if(!this.offersSelected.includes(offre)){
  this.offersSelected.push(offre);
}
}

idOperateur
addOffreoperateur(){
  this.idOperateur=this.OperateurForm.value.operateur;
  console.log(this.idOperateur)

  this.gestion.linkOffreToOperateur(this.idOperateur,this.offersSelected).then(data=>{
    console.log("-->",data)
    this.OffresAssocie=data['offres'];
    $('#default-confirmation').modal('show');

  })
}

listeOffresParOperateur(id){
  this.gestion.getOffresByOperateur(id).subscribe(data=>{
    console.log(data)
    this.OffresAssocie=data['offres'];
  })
}

ChangingValue(){
  this.offersSelected=[];
  this.idOperateur=this.OperateurForm.value.operateur;
  console.log( this.idOperateur)
  this.listeOffresParOperateur(this.OperateurForm.value.operateur);
}

Offre


selectOffre(idOperateur,Offre){
  console.log(Offre)
  this.Offre=Offre;
}

deleteoffre(idOperateur,Offre){
  this.gestion.deleteoffre(idOperateur,Offre.id).then(data=>{
    this.OffresAssocie=data['offres'];
    console.log("offre supprimer :",data)
  })
}




listoffreOperateur=[];
listoffreparoperateur(){

  this.listoffreOperateur=[];
  this.operateurs.forEach(element => {

    this.gestion.getOffresByOperateur(element.id).subscribe(data=>{

      this.listoffreOperateur.push({"operateur":element,"offres":data['offres']});
      console.log(this.listoffreOperateur);
    });
  });



}







}