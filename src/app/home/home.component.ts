import { Component } from '@angular/core';
import { TraductionService, OperateurService, ServeurFtpService, ScenarioService, SimService, AuthenticationService } from '../_services';
declare const $: any;
import * as moment from 'moment/moment.js';
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
 
dash
result="";

currentUser;
date

SimsAssocie=[];

    constructor(public ScenarioService : ScenarioService, public traduction : TraductionService,public login:AuthenticationService, public sim:SimService) {

      this.date= moment(new Date()).format("YYYY-MM-DDThh:mm");

      login.dashboard().subscribe(data=>{
        this.dash=data;
      })


      var user=localStorage.getItem('currentUser');
      var userObject=JSON.parse(user)
      this.currentUser=userObject.user;
      console.log(this.currentUser)
    }

    ngOnInit() {

      this.listeSims()

    }


    listeSims(){
      this.sim.refreshSIM().then((data:any)=>{
        console.log(data)
        this.SimsAssocie=data;
      })
    }
 






}