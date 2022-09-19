import { Component, OnInit } from '@angular/core';
import { ServeurFtpService, TraductionService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare const $: any;


@Component({
  selector: 'app-serveur-ftp',
  templateUrl: './serveur-ftp.component.html',
  styleUrls: ['./serveur-ftp.component.css']
})
export class ServeurFtpComponent implements OnInit {
 
serveurFtps:any;
serveurFtpForm: FormGroup;
edit=false;
erreursaisie=false;


    constructor(public traduction :TraductionService ,private serveurFtpService: ServeurFtpService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.resetForm();
        this.listeserveurFtps();
    }

    onSubmit() {
            if(this.serveurFtpForm.value.nom &&
                 this.serveurFtpForm.value.adresse &&
                  this.serveurFtpForm.value.username &&
                  this.serveurFtpForm.value.password){

                    this.serveurFtpService.addserveurFtp(this.serveurFtpForm.value).then(data=>{
                        this.listeserveurFtps();
                        $('#default-confirmation').modal('show');
                     });
                     this.erreursaisie=false;
            }else{
                this.erreursaisie=true;
            }
        }

    onSubmitEdit() {
            if(this.serveurFtpForm.value.nom &&
                this.serveurFtpForm.value.adresse &&
                 this.serveurFtpForm.value.username &&
                 this.serveurFtpForm.value.password){
            this.serveurFtpService.addserveurFtp(this.serveurFtpForm.value).then(data => {
               this.listeserveurFtps();
               $('#default-confirmation').modal('show');

            });
            this.erreursaisie = false;
        }else{
            this.erreursaisie = true;
        }

    }

    onReset()  {
        this.resetForm();
        this.edit = false;
    }


    resetForm(){
        this.serveurFtpForm = this.formBuilder.group({
          nom: ['', Validators.required],
          adresse: ['', Validators.required],
          username: ['', Validators.required],
          password: ['', Validators.required],
          port: ['20'],
          mode: ['Actif'],
          type: ['Binaire']
        });
    }

    listeserveurFtps(){
        this.serveurFtpService.getAll().subscribe(serveurFtps => {
            this.serveurFtps = serveurFtps;
            console.log(serveurFtps)
        });
    }


    editserveurFtp(serveurFtp){
        this.edit=true;
        this.serveurFtpForm = this.formBuilder.group({
            id: [serveurFtp.id],
            nom: [serveurFtp.nom],
            adresse: [serveurFtp.adresse],
            username: [serveurFtp.username],
            password: [serveurFtp.password],
            port: [serveurFtp.port],
            mode: [serveurFtp.mode],
            type: [serveurFtp.type]
        });


    }

    serveurFtpDelete;
    deleteserveurFtp(serveurFtp){this.serveurFtpDelete=serveurFtp; }

    deleteserveurFtpConfirm(serveurFtpDelete){
        this.serveurFtpService.deleteserveurFtp(serveurFtpDelete.id).then(result=>{
            this.listeserveurFtps();
        })
    }
}
