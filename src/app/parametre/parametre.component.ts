  import { Component, OnInit } from '@angular/core';
  import { OperateurService, ParametreService, SimService, TraductionService} from '../_services';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import * as moment from 'moment/moment.js';
  declare const $: any;
  @Component({
    selector: 'app-parametre',
    templateUrl: './parametre.component.html',
    styleUrls: ['./parametre.component.css']
  })
  export class ParametreComponent implements OnInit {
  
  
      params=[];  
      
    constructor(
      public traduction :TraductionService ,
       public param:ParametreService) { }

    ngOnInit() {
      this.getParames();
    }

  

    valider(){
      this.param.paramsUpdate(this.params).then((data:any)=>{
        console.log(data)
        $('#default-confirmation').modal('show');
      });

    }

    
 
    getParames(){
      this.param.getAll().subscribe((data:any)=>{
        this.params=data;
        console.log(this.params)
      });
    }
  






    }
    