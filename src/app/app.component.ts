import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, TraductionService } from './_services';
import { environment } from '../environments/environment';


@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    env = environment;
    currentUser;
    loginpage=false;
 
    scrolltoTheTop(){
        window.scrollTo(0, 0);
    }
    

    constructor(
        private router: Router,
        public authenticationService: AuthenticationService,
        public traduction: TraductionService
    ) {


        traduction.getLangue();

        var token=localStorage.getItem('token');


      console.log('--> app')
            if(token){
                console.log('token ok')
                var user=localStorage.getItem('currentUser');
                var userObject=JSON.parse(user)
                this.currentUser=userObject.user;
                console.log(this.currentUser.role)
                this.router.navigate(['']);
                this.loginpage=true;
            }else{
                console.log('token not ok')
                this.router.navigate(['/login']);
                this.loginpage=false;
            }

    }

    switchLangue(ln){
        localStorage.setItem('langue' , ln);
        this.traduction.getLangue();
        console.log(ln);

    }

}