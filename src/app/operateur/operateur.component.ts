import { Component, OnInit } from '@angular/core';
import { OperateurService, TraductionService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare const $: any;


@Component({
    selector: 'app-operateur',
    templateUrl: './operateur.component.html',
    styleUrls: ['./operateur.component.css']
})
export class OperateurComponent implements OnInit {

    operateurs: any;
    operateurForm: FormGroup;
    edit = false;
    erreursaisie = false;
    codeRecharge;
    codeConsultationSolde;
    codeConsultationData;
    codeNumero;
    apnInternet;
    compteForm: FormGroup;
    ussdForm: FormGroup;
    regexForm: FormGroup;
    retourTempsOperateurForm: FormGroup;

    typeValeurs=[];
    natureComptes=[];
    nomOperateurs=[];


    constructor(private operateurService: OperateurService, private formBuilder: FormBuilder, public traduction: TraductionService) { }

    ngOnInit() {
        this.resetForm();
        this.onResetcompte();
        this.listeOperateurs();
        this.listeNomOperateurs();
        this.listTypeValeur();
        this.listNatureCompte();
    }


    listTypeValeur(){
        this.operateurService.listTypeValeur().then((data:any)=>{
            this.typeValeurs=data;
        })
    }

    listeNomOperateurs() {
        this.operateurService.nomsOperateurs().then((data:any) => {
            this.nomOperateurs = data;
        });
    }

    listNatureCompte(){
        this.operateurService.listNatureCompte().then((data:any)=>{
            this.natureComptes=data;
        })
    }

    onSubmit() {

        if (this.operateurForm.value.nom &&
            this.operateurForm.value.codeRecharge &&
            this.operateurForm.value.apnInternet && this.operateurForm.value.codeNumero) {

            this.operateurService.addOperateur(this.operateurForm.value).then(data => {
                this.listeOperateurs();
                $('#default-confirmation').modal('show');
                this.erreursaisie = false;
            });
        } else {

            this.erreursaisie = true;
        }
    }

    onSubmitEdit() {
        if (this.operateurForm.value.nom &&
            this.operateurForm.value.codeRecharge &&
            this.operateurForm.value.apnInternet && this.operateurForm.value.codeNumero) {
            this.operateurService.addOperateur(this.operateurForm.value).then(data => {
                this.listeOperateurs();
                $('#default-confirmation').modal('show');
                this.erreursaisie = false;
            });
        } else {
            this.erreursaisie = true;
        }
    }


    onReset() {
        this.resetForm();
        this.edit = false;
    }


    resetForm() {
        this.operateurForm = this.formBuilder.group({
            nom: ['', Validators.required],
            codeRecharge: ['', Validators.required],
            apnInternet: ['', Validators.required],
            enumPDPType: ['IP'],
            codeNumero: [''],
            mnc: [''],
            mcc: [''],
        });

    }

    listeOperateurs() {
        this.operateurService.getAll().then(operateurs => {
            this.operateurs = operateurs;

            console.log(operateurs)
        });
    }

    editOperateur(operateur) {
        this.edit = true;
        this.operateurForm = this.formBuilder.group({
            id: [operateur.id],
            nom: [operateur.nom],
            codeRecharge: [operateur.codeRecharge],
            apnInternet: [operateur.apnInternet],
            enumPDPType: [operateur.enumPDPType],
            codeNumero: [operateur.codeNumero],
            mnc: [operateur.mnc],
            mcc: [operateur.mcc],
        });

    }

    operateurDelete;
    deleteOperateur(operateur) { this.operateurDelete = operateur; }

    deleteOperateurConfirm(operateurDelete) {
        this.operateurService.deleteOperateur(operateurDelete.id).then(result => {
            this.listeOperateurs();
        });
    }






    listCompteByIdoperateur = [];


    listeCompteussd(id) {
        this.idOperateurSelected = id;
        this.operateurService.listCompteByIdoperateur(id).then((comptes: any) => {
            this.listCompteByIdoperateur = comptes;
            console.log(comptes)
        });

        //ToDo
        this.addCompte(id);


    }





    inputoperateur = false;
    addinputoperateur(status) {
        this.inputoperateur = status;
    }

    idOperateurSelected
    listUssd = [];
    addCompte(id) {
        this.onResetcompte();
        this.editActiveCompte = false;
        this.idOperateurSelected = id;
        this.operateurService.getUssdByIdoperateur(id).then((data: any) => {
            console.log(data)
            this.listUssd = data;
            //this.ussdForm.value.code=data[0].id;

        })
    }

    onSubmitCompte() {
        this.compteForm.value.ussd = { 'id': this.compteForm.value.code }

        console.log(this.compteForm.value.id );
        if(this.compteForm.value.id =="0"){

            if(this.compteForm.value.prefixe=="" && this.compteForm.value.suffixe==""){
                this.compteForm.value.typeValeur=null;
            }
            let expressions=[{"prefixe":this.compteForm.value.prefixe,"typeValeur":this.compteForm.value.typeValeur,"suffixe":this.compteForm.value.suffixe ,"forfait":false,"formatSoldeConsomme":false}];
            this.compteForm.value.expressions = expressions;
            
        console.log(this.compteForm.value );
        }
       
        this.operateurService.addCompte(this.compteForm.value).then(data => {
            console.log("compte added !!");
            this.listeCompteussd(this.idOperateurSelected);
        })

    }

    onSubmitCodeussd() {

        if(this.listCodeUssd.length>0){
            this.operateurService.addCodeUssdList(this.listCodeUssd).then(data => {
                console.log("list ussd added !!");
                this.listeCompteussd(this.idOperateurSelected);
             //   $('#modal-compte').hide();
              //  $('#modal-compte2').hide();
             //   $('#modal-ussd').hide();
              //  $('.modal-backdrop').remove();
    
            })
        }else{
          
              
              if(this.editActiveCompte && this.ussdForm.value.master){
                this.ussdForm.value.operateur = { 'id': this.idOperateurSelected }
              }
              if(this.ussdForm.value.id==0){
                this.ussdForm.value.operateur = { 'id': this.idOperateurSelected }
              }

            if(this.ussdForm.value.code){
                this.operateurService.addCodeUssd(this.ussdForm.value).then(data => {
                    console.log("ussd added !!");
                    this.listeCompteussd(this.idOperateurSelected);
                },err=>{
                    console.log(err);
                })
            }else if(this.ussdForm.value.codeDynamique || this.ussdForm.value.suiteMessage ){
                
                this.operateurService.addCodeUssd(this.ussdForm.value).then(data => {
                    console.log("ussd added !!");
                    this.listeCompteussd(this.idOperateurSelected);
                },err=>{
                    console.log(err);
                })
            }else{
                console.log("compte vide!!");
            }  
        } 

    }





    IDussdSelected
    deleteUssdCompte(cp){
        this.IDussdSelected=cp.id;

    }
    deletetussd(){

        this.operateurService.deleteUSSD(this.IDussdSelected).then(data => {
            this.listeCompteussd(this.idOperateurSelected);
        })


    }



listCodeUssd=[];

    addOnlist(){
        this.ussdForm.value.operateur = { 'id': this.idOperateurSelected }
        this.ussdForm.value.date = new Date().getTime();


        if(this.ussdForm.value.typeValeur==0){
            this.ussdForm.value.typeValeur=null;
        }
        this.listCodeUssd.push(this.ussdForm.value)
        console.log(this.listCodeUssd)
        this.ussdForm = this.formBuilder.group({
            id: ['0', Validators.required],
            code: ['', Validators.required],
            typeRetourUSSD: ['USSD', Validators.required],
            operateur: ['', Validators.required],
            codeDynamique: [false, Validators.required],
            prefixe: ['', Validators.required],
            typeValeur: ['0', Validators.required],
            suffixe: ['', Validators.required],
            suiteMessage: [false, Validators.required],
            prefixeS: ['', Validators.required],
            typeValeurS: ['0', Validators.required],
            suffixeS: ['', Validators.required],
         
        });
    }







   




editActiveCompte = false;
editmulticompte=[];
selectCompteToUpdate(cp){
    this.compteSelected=null;
    this.editmulticompte=[];
    let next=cp.ussdSuivant;
    this.editmulticompte.push(cp);
    while(next != null){
      this.editmulticompte.push(next);
        next=next.ussdSuivant;
    }
}




    compteSelected
 
    
    editCompte(cp) {
        console.log(cp);
        this.compteSelected=cp;
      
        this.ussdForm = this.formBuilder.group({
            id: [cp.id, Validators.required],
            code: [cp.code, Validators.required],
            typeRetourUSSD: [cp.typeRetourUSSD, Validators.required],
            prefixe: [cp.prefixe, Validators.required],
            suffixe: [cp.suffixe, Validators.required],
            prefixeS: [cp.prefixeS, Validators.required],
            suffixeS: [cp.suffixeS, Validators.required],
            typeValeur: [cp.typeValeur, Validators.required],
            typeValeurS: [cp.typeValeurS, Validators.required],
            codeDynamique: [cp.codeDynamique, Validators.required],
            suiteMessage: [cp.suiteMessage, Validators.required],
            master: [cp.master, Validators.required],
        });

        
        this.editActiveCompte = true;
    }




    editCompte3(cp) {
        console.log(cp);
        this.compteSelected=cp;

        this.ussdForm = this.formBuilder.group({
            id: [cp.id, Validators.required],
            code: [cp.code, Validators.required],
            typeRetourUSSD: [cp.typeRetourUSSD, Validators.required],
            operateur: [cp.operateur.id, Validators.required],
            master: [cp.master, Validators.required],
    
        });
    
            this.addCompte(cp.operateur.id);
         
            if(cp.ussd){
                this.compteForm = this.formBuilder.group({
                    id: [cp.id, Validators.required],
                    code: [cp.ussd.id, Validators.required],
                    nom: [cp.nom, Validators.required],
                    prefixe: [cp.prefixe, Validators.required],
                    regex: [cp.regex, Validators.required],
                    typeValeur: [cp.typeValeur, Validators.required],
                    suffixe: [cp.suffixe, Validators.required],
                    ussd: [cp.ussd.id, Validators.required],
                    expressions: [cp.expressions, Validators.required],
                });
            }
        
        

        this.editActiveCompte = true;
    }

    editCompte2(cp){
        console.log(cp)
        this.compteForm = this.formBuilder.group({
            id: [cp.id, Validators.required],
            code: [cp.ussd.id, Validators.required],
            nature: [cp.nature, Validators.required],
            nom: [cp.nom, Validators.required],
            prefixe: [cp.prefixe, Validators.required],
            regex: [cp.regex, Validators.required],
            typeValeur: [cp.typeValeur, Validators.required],
            suffixe: [cp.suffixe, Validators.required],
            ussd: [cp.ussd.id, Validators.required],
            expressions: [cp.expressions, Validators.required],
        });


    }


    defaultcompteussd(){
        console.log(this.compteDelete);
      
        this.operateurService.deleteCompte(this.compteDelete.id).then(data => {
            console.log("compte deleted !!");
            this.listeCompteussd(this.idOperateurSelected);
        })
       
    }




    test(cp){
        let next=cp.ussdSuivant;
        let code=cp.code;


        while(next != null){
            if(next.codeDynamique){
                code=code+"-> Dynamique"+"(Prefixe: "+next.prefixe+" / Suffixe: "+next.suffixe+")";
                if(next.suiteMessage){
                    code=code+"-> SuiteMessage"+"(Prefixe: "+next.prefixeS+" / Suffixe: "+next.suffixeS+")";
                }
            }else{
                code=code+"->"+next.code;
                if(next.suiteMessage){
                    code=code+"-> SuiteMessage"+"(Prefixe: "+next.prefixeS+" / Suffixe: "+next.suffixeS+")";}
            }

            


            next=next.ussdSuivant;
         //   console.log(code) 
        }

        return code;
    }

    onResetcompte() {

        this.hideformvariable=false;
        this.listCodeUssd=[];

        this.compteForm = this.formBuilder.group({
            id: ['0', Validators.required],
            nom: ['', Validators.required],
            nature: ['Monnaie', Validators.required],
            code: [0, Validators.required],
            prefixe: ['', Validators.required],
            regex: ['0', Validators.required],
            typeValeur: ['0', Validators.required],
            suffixe: ['', Validators.required],
            ussd: ['', Validators.required],
            expressions: ["", Validators.required],
        });


        this.ussdForm = this.formBuilder.group({
            id: ['0', Validators.required],
            code: ['', Validators.required],
            typeRetourUSSD: ['USSD', Validators.required],
            operateur: ['', Validators.required],
            codeDynamique: [false, Validators.required],
            prefixe: ['', Validators.required],
            typeValeur: ['0', Validators.required],
            suffixe: ['', Validators.required],
            suiteMessage: [false, Validators.required],
            prefixeS: ['', Validators.required],
            typeValeurS: ['0', Validators.required],
            suffixeS: ['', Validators.required],
        });





        this.regexForm= this.formBuilder.group({
            id: ['', Validators.required],
            compte: ['', Validators.required],
            prefixe: ['', Validators.required],
            typeValeur: ['0', Validators.required],
            suffixe: ['', Validators.required],
            forfait: [false, Validators.required],
            formatSoldeConsomme: [false, Validators.required],

            prefixe2: ['', Validators.required],
            typeValeur2: ['0', Validators.required],
            suffixe2: ['', Validators.required],
        });


        this.retourTempsOperateurForm = this.formBuilder.group({
            prefixe: ['', Validators.required],
            typeValeur: ['0', Validators.required],
            suffixe: ['', Validators.required],
            operateurTemps: ['', Validators.required],
        });


    }






    compteDelete
    deleteCompte(cp) {
        this.compteDelete = cp;
    }

    deleteCompteConfirm(compteDelete) {
        this.operateurService.deleteCompte(compteDelete.id).then(data => {
            console.log("compte deleted !!");
            this.listeCompteussd(this.idOperateurSelected);
        })
    }







    
     
    
  









compteregex;
addRegex(c){  
this.hideformvariable=false;
this.compteregex=c;
}
onSubmitRegex(){
    this.regexForm.value.compte = { 'id': this.compteregex.id }

    console.log(this.regexForm.value);
    
if(this.regexForm.value.formatSoldeConsomme){

    this.operateurService.addExpression(this.regexForm.value).then(data => {
        console.log("regex 1 added !!");
       // this.listeCompteussd(this.idOperateurSelected);
    }).then(data=>{
        this.regexForm.value.forfait=true;
        this.regexForm.value.prefixe=this.regexForm.value.prefixe2;
        this.regexForm.value.typeValeur=this.regexForm.value.typeValeur2;
        this.regexForm.value.suffixe=this.regexForm.value.suffixe2;
        this.operateurService.addExpression(this.regexForm.value).then(data => {
            console.log("regex 2 added !!");
            this.listeCompteussd(this.idOperateurSelected);
        })
    })
}else{
    this.operateurService.addExpression(this.regexForm.value).then(data => {
        console.log("regex added !!");
        this.listeCompteussd(this.idOperateurSelected);
    })
}

    
    
}


deleteRegex(id){
    this.operateurService.deleteExpression(id).then(data => {
        console.log("regex deleted !!");
      //  this.compteregex=data;
      $('#regex-ussd-list').modal('toggle');
          //     $('#regex-ussd-list').hide();
           //    $('.modal-backdrop').remove();
        this.listeCompteussd(this.idOperateurSelected);
        console.log(data);
    })

}

deleteRegexTempsOperateur(id){
    this.operateurService.deleteExpressionDureeOperateur(id).then(data => {
        console.log("regex deleted !!");
        this.operateurService.expressionsDureeOperateur(this.idoperateurselected).then((data:any)=>{
            console.log(data)
            this.listretourTempsoperateur=data;
        })
    })

}





modifierRegex(regex){
    console.log(regex)
    this.regexForm= this.formBuilder.group({
        id: [regex.id],
        prefixe: [regex.prefixe],
        typeValeur: [regex.typeValeur],
        suffixe: [regex.suffixe],
    });
    console.log(this.regexForm.value)
}



onSubmitRetourTempsOperateur() {
    this.retourTempsOperateurForm.value.operateurTemps    = { 'id': this.idoperateurselected }
    console.log(this.retourTempsOperateurForm.value );
  

    this.operateurService.addExpressionDureeOperateur(this.retourTempsOperateurForm.value).then(data => {
        console.log("retourTempsOperateurForm added !!");

        this.operateurService.expressionsDureeOperateur(this.idoperateurselected).then((data:any)=>{
            this.listretourTempsoperateur=data;
        })
    })

}





idoperateurselected;
listretourTempsoperateur=[];
idoperateur(id){
    this.idoperateurselected=id;
    this.operateurService.expressionsDureeOperateur(id).then((data:any)=>{
        this.listretourTempsoperateur=data;
    })
}



modifierTempOperateur(cp){
    console.log(cp)
    this.retourTempsOperateurForm = this.formBuilder.group({
        id: [cp.id],
        prefixe: [cp.prefixe],
        typeValeur: [cp.typeValeur],
        suffixe: [cp.suffixe],
        operateurTemps: [{"id":cp.operateurTemps.id}],
    });

}





hideformvariable=false;
hideform(state){
    this.hideformvariable=state;
}

closeModal(){
    this.hideformvariable=false;
    $('#regex-ussd-list').modal('toggle');
}

}
