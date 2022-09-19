import { Component, OnInit } from '@angular/core';
import {  OffreService, OperateurService, GestionOffreOperateurService, SimService, TraductionService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare const $: any;
@Component({
  selector: 'app-sim',
  templateUrl: './sim.component.html',
  styleUrls: ['./sim.component.css']
})
export class SimComponent implements OnInit {

  offres:any;
  operateurs:any;
  offersSelected=[];
  OffresAssocie=[];
  SimsAssocie=[];
  SimForm: FormGroup;
  PinForm: FormGroup;
  edit=false;
  hideInput=true;
  SIM
  idOperateur


constructor(
  public traduction :TraductionService ,
  private offreService: OffreService,
  private operateurService:OperateurService,
   private formBuilder: FormBuilder,
   public gestion:GestionOffreOperateurService,
   public sim:SimService) { }

ngOnInit() {
  this.SimForm = this.formBuilder.group({
    idOperateur: ['1', Validators.required],
    idOffre: ['', Validators.required],
    imsi: ['', Validators.required],
    msisdn: ['', Validators.required],
    portSim: ['', Validators.required],
    typePayement: ['PREPAYEE', Validators.required],
    note: ['', Validators.required],
    etat: ['NO_SIM', Validators.required]
 

});


this.PinForm = this.formBuilder.group({
  portSim: ['', Validators.required],
  codeUSSD: ['', Validators.required],
 });



this.listeOffresParOperateur(this.SimForm.value.idOperateur);
this.listeSimsParOperateur(this.SimForm.value.idOperateur,false);
  this.listeoffres();
  this.listeOperateurs();
}

listeoffres(){
    this.offreService.getAll().subscribe(offres => {
        this.offres=offres;
        console.log(offres)
    });
}

listeOperateurs(){
  this.operateurService.getAll().then((operateurs:any) => {
      this.operateurs=operateurs;
      console.log(operateurs)
  });
}

addSIM(){

if(this.SimForm.value.idOffre=='' || this.SimForm.value.idOffre==0 || this.SimForm.value.idOffre==null){
  $('#default-confirmation2').modal('show');
}else{

  this.sim.addSim(this.SimForm.value).then((data:any)=>{
    console.log("sim-->",data)
    this.SimsAssocie=data;
    $('#default-confirmation').modal('show');
  })
}





}

addSIMToDB(){
  if(this.SimForm.value.idOffre=='' || this.SimForm.value.idOffre==0 || this.SimForm.value.idOffre==null){
    $('#default-confirmation2').modal('show');
  }else{
  this.sim.addSimToDB(this.SimForm.value).then((data:any)=>{
    console.log("sim-->",data)
    this.SimsAssocie=data;
    $('#default-confirmation').modal('show');
  })
}
}

listeOffresParOperateur(id){
  this.gestion.getOffresByOperateur(id).subscribe(data=>{
    console.log(data)
   
    this.OffresAssocie=data['offres'];
  })
}

listeSimsParOperateur(id,status){
  if(this.hideInput || status){
  this.SimsAssocie=[];
  this.hideInput=true;

      if(id==null){
        console.log('id not null')
      id=  this.operateurs[0].id
      }


  this.sim.SimByOperateur(id).then((data:any)=>{
    console.log(data)
    this.SimsAssocie=data;
  })
}
}

deletesim(idSim){
  this.sim.deleteSim(idSim).then((data:any)=>{
    console.log(data);
    this.SimsAssocie = data;
  });

}

editSim(sim){
  this.SIM=sim;
  this.edit = true;


  

if(!sim.operateur || !sim.offre){
  this.SimForm = this.formBuilder.group({
    idOperateur: [''],
    idOffre: [''],
    imsi: [sim.imsi],
    msisdn: [sim.msisdn],
    portSim: [sim.portSim],
    typePayement: [sim.typePayement],
    note: [sim.note],
    etat: [sim.etat],
    codePin:[''],

  });
}else{
  this.listeOffresParOperateur(sim.operateur.id);
  this.SimForm = this.formBuilder.group({
   
    id: [sim.id],
    idOperateur: [sim.operateur.id],
    idOffre: [sim.offre.id],
    imsi: [sim.imsi],
    msisdn: [sim.msisdn],
    portSim: [sim.portSim],
    typePayement: [sim.typePayement],
    note: [sim.note],
    etat: [sim.etat],
    codePin:[''],
  });

}
 

}

onReset(){
  this.edit = false;

  this.SimForm = this.formBuilder.group({
    idOperateur: ['1', Validators.required],
    idOffre: ['', Validators.required],
    imsi: ['', Validators.required],
    msisdn: ['', Validators.required],
    portSim: ['', Validators.required],
    typePayement: ['PREPAYEE', Validators.required],
    note: ['', Validators.required],
    etat: ['NO_SIM', Validators.required],
    codePin:[''],
});

}

selectSim(sim){
  this.SIM = sim;

}

setPIN(port){
  this.PinForm.value.portSim=port;
  console.log("this.PinForm.value-->",this.PinForm.value)
  this.sim.setPIN(this.PinForm.value).then((data:any)=>{
    console.log("object-->",data);
    this.SimsAssocie = data;
  })


}

ChangingValue(){
  this.offersSelected=[];
  this.idOperateur=this.SimForm.value.operateur;
  this.listeOffresParOperateur(this.SimForm.value.idOperateur);
  this.listeSimsParOperateur(this.SimForm.value.idOperateur,false);
}

reloadSIM(){
  this.hideInput=false;
  this.SimsAssocie=[];

  this.sim.refreshSIM().then((data:any)=>{
    this.SimsAssocie=data;
    console.log("SIM-->",data)

  })

}

disconnectAll(){

  this.sim.disconnectAllPort().then((data:any)=>{
  console.log("disconnectAllPort-->",data)
  })

}

}
