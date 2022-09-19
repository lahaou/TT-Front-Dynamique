import { Component, OnInit } from '@angular/core';
import {  OffreService, OperateurService, TraductionService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare const $: any;



@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
offres:any;
operateurs:any;
tarificationsVoix:any;
tarificationsSMS:any;
tarificationsDATA:any;
offreForm: FormGroup;
tarifForm: FormGroup;
edit=false;
typeOffre='VOIX'
typeAppel='Seconde'
typeAppel2='Seconde'
offerselected
operateurselected
erreursaisie=false;
erreursaisie1=false;
divisible=false;






divisionApresTemps: null
uniteFacturationApresDivision: null
tarifApresDivision: null




    constructor(public traduction :TraductionService,private offreService: OffreService,private operateurService:OperateurService, private formBuilder: FormBuilder) { }


    //todo reset form tarification  retour after modif
    //todo alert offre existant backend control

    ngOnInit() {
        this.listeoffres();
        this.listeOperateurs();
        this.resetForm();
        this.resettarificationForm();
    }

    onSubmit() {

      if(this.offreForm.value.nom){

          this.offreService.addoffre(this.offreForm.value).subscribe(data => {
              this.listeoffres();
              $('#default-confirmation').modal('show');
           }, err => {
             console.log(err);
             if(err['status'] == '500'){
                   alert("Offre existant");
             }

           });

           this.erreursaisie = false;
      }
      else {
          this.erreursaisie = true;
      }

        }










onSubmitTarif() {
    if(!this.divisible) {
        this.tarifForm.value.divisionApresTemps = null;
        this.tarifForm.value.uniteFacturationApresDivision = null;
        this.tarifForm.value.tarifApresDivision = null;
    }



    if(this.typeAppel=="Appel" && this.typeOffre != 'DATA'){
        this.tarifForm.value.uniteFacturation = -1;  
    }

    if(this.typeAppel2=="Appel"){
        this.tarifForm.value.uniteFacturationApresDivision = -1;  
    }

  this.offres.forEach(element => {
      if(element.id == this.tarifForm.value.offre) {
      this.tarifForm.value.offre = element;
      }
  });






  if(this.tarifForm.value.libelle!="" && this.tarifForm.value.tarif>-1 && (this.tarifForm.value.uniteFacturation || this.tarifForm.value.enumTypeTarification =="SMS")){
      this.operateurs.forEach(element => {
          if(element.id == this.tarifForm.value.operateurDestinataire){
              this.tarifForm.value.operateurDestinataire = element;
          }
      });


      this.erreursaisie1=false;
      $('#modal-tarif').hide();
      $('.modal-backdrop').remove() ;
      this.offreService.addTarif(this.tarifForm.value).subscribe(data=>{
          this.listeoffres();
          $('#default-confirmation').modal('show');
      });

  }
  else {
      this.erreursaisie1=true;

  }




  this.onReset();

}













         onSubmitTarifEdit() {
         this.offres.forEach(element => {
             if(element.id==this.tarifForm.value.offre){
              this.tarifForm.value.offre = element;
             }
         });

         this.operateurs.forEach(element => {
          if(element.id == this.tarifForm.value.operateurDestinataire){
           this.tarifForm.value.operateurDestinataire= element;
          }
      });

      if(this.tarifForm.value.libelle && this.tarifForm.value.tarif && (this.tarifForm.value.uniteFacturation || this.tarifForm.value.enumTypeTarification =="SMS")){
          this.offreService.addTarif(this.tarifForm.value).subscribe(data => {
           this.listeoffres();
           $('#default-confirmation').modal('show');
        });

        this.erreursaisie1=false;
        $('#modal-tarif').hide();
      $('.modal-backdrop').remove() ;
      }
      else{
          this.erreursaisie1=true;

      }


         }

   onSubmitEdit() {
            this.offreService.addoffre(this.offreForm.value).subscribe(data => {
               this.listeoffres();
               $('#default-confirmation').modal('show');
            },err=>{
              console.log(err)
              if(err['status']=='500')
              alert("Offre existant");
            });
           }

    onReset()  {
        this.resetForm();
        this.resettarificationForm();
        this.edit=false;
        this.edittarif=false;
        this.typeOffre='VOIX'
    }








    resetForm(){
        this.offreForm = this.formBuilder.group({
            nom: ['', Validators.required],
        });
    }
    resettarificationForm(){
      this.tarifForm = this.formBuilder.group({
          libelle: ['', Validators.required],
          enumTypeTarification: ['VOIX'],
          tarif: ['', Validators.required],
          operateurDestinataire: [null],
          offre: [null],
          uniteFacturation: ['', Validators.required],
          divisible: [false],
          divisionApresTemps: ['', Validators.required],
          uniteFacturationApresDivision: ['', Validators.required],
          tarifApresDivision: ['', Validators.required],
          typeAppel: ['Seconde', Validators.required],
          typeAppel2: ['Seconde', Validators.required],
      });


  }

    listeoffres(){
        this.offreService.getAll().subscribe(offres => {
            this.offres = offres;

            this.tarifForm.value.offre=offres[0].id;
            this.offerselected=offres[0].id;

        });
    }

    listeOperateurs(){
      this.operateurService.getAll().then(operateurs=> {
          this.operateurs = operateurs;
        //  console.log(operateurs[0].id)
        if(operateurs[0]){
          this.tarifForm.value.operateurDestinataire = operateurs[0].id;
          this.operateurselected = operateurs[0].id;
        }

      });
  }




  divisibleExist=false;

  listetarificationVoix(id){
    this.divisibleExist=false;
    
    this.offreService.getTariffsVoix(id).subscribe(tarifications => {
        this.tarificationsVoix = tarifications;
        console.log(this.tarificationsVoix);

        this.tarificationsVoix.forEach(data=>{
            console.log(data.divisible)
            if(data.divisible){

                
                this.divisibleExist=true;
            }
        });


    });


   


}
  listetarificationSMS(id){
      this.offreService.getTariffsSMS(id).subscribe(tarifications => {
          this.tarificationsSMS = tarifications;
      });
  }

  editoffre(offre){
    this.edit=true;
    this.offreForm = this.formBuilder.group({
        id: [offre.id],
        nom: [offre.nom],
    });
}

  listetarificationDATA(id){
      this.offreService.getTariffsDATA(id).subscribe(tarifications => {
          this.tarificationsDATA = tarifications;
      });
  }

    

    selectoffre(offre){

      this.listetarificationSMS(offre.id);
      this.listetarificationVoix(offre.id);
      this.listetarificationDATA(offre.id);

  }

  edittarif = false ;
  selectTarification(tv,type) {
      this.typeOffre=type;
      console.log(tv);
      this.edittarif = true;

      if(type=="DATA"){
          this.tarifForm = this.formBuilder.group({
              id: [tv.id],
              libelle: [tv.libelle],
              enumTypeTarification: [tv.enumTypeTarification],
              tarif: [tv.tarif],
            //  operateurDestinataire: [tv.operateurDestinataire.id],
              uniteFacturation: [tv.uniteFacturation],
              offre: [tv.offre.id],
              divisible: [tv.divisible],
              divisionApresTemps: [tv.divisionApresTemps],
              uniteFacturationApresDivision: [tv.uniteFacturationApresDivision],
              tarifApresDivision: [tv.tarifApresDivision],
          });
  
      }else{
          this.tarifForm = this.formBuilder.group({
              id: [tv.id],
              libelle: [tv.libelle],
              enumTypeTarification: [tv.enumTypeTarification],
              tarif: [tv.tarif],
              operateurDestinataire: [tv.operateurDestinataire.id],
              uniteFacturation: [tv.uniteFacturation],
              offre: [tv.offre.id],
              divisible: [tv.divisible],
              divisionApresTemps: [tv.divisionApresTemps],
              uniteFacturationApresDivision: [tv.uniteFacturationApresDivision],
              tarifApresDivision: [tv.tarifApresDivision],
              typeAppel: ['Seconde'],
              typeAppel2: ['Seconde'],
          });
  
      }





      if( tv.uniteFacturation ==-1){
        //  this.tarifForm.value.typeAppel="Appel";
          this.typeAppel="Appel";
      }else{
        this.typeAppel="Seconde"; 
      }


      if( tv.uniteFacturationApresDivision ==-1){
        //  this.tarifForm.value.typeAppel="Appel";
          this.typeAppel2="Appel";
      }else{
        this.typeAppel2="Seconde"; 
      }

      if(tv.divisible){
        this.divisible=true;
      }else{
        this.divisible=false;
      }






      
  }


    offreDelete;
    deleteoffre(offre){this.offreDelete=offre; }

    tarificationDelete;
    deletetarification(tarif){
        this.tarificationDelete=tarif; 
      }

    deleteoffreConfirm(offreDelete){
        this.offreService.deleteoffre(offreDelete.id).then(result=>{
      
            this.listeoffres();
        });
    }

    deletetarifficationConfirm(tarificationDelete){
      this.offreService.deleteTarrification(tarificationDelete.id).then(result => {
          this.listeoffres();
        //  this.selectoffre(this.offerselected)
     
      });
  }


}