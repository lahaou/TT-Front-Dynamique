import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, TraductionService } from '../_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    // click : boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        public authenticationService: AuthenticationService,
        private traduction: TraductionService
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

    }


    onSubmit() {
        this.authenticationService.login(this.loginForm.value);
        
        // .pipe(finalize(() =>  this.click = !this.click));
    }





























}
