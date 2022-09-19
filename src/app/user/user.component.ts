import { Component } from '@angular/core';
import { UserService, TraductionService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare const $: any;


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
 
users:any;
userForm: FormGroup;
edit=false;
erreursaisie=false;


    constructor(private userService: UserService, private formBuilder: FormBuilder,public traduction:TraductionService) { }

    ngOnInit() {
        this.resetForm();
        this.listeUsers();
    }
  

    getUser(){
        
    }

    onSubmit() {
        // console.log(this.userForm.value); 
        if(this.userForm.value.nom && this.userForm.value.prenom && this.userForm.value.email && this.userForm.value.username && this.userForm.value.password){
         this.userService.addUser(this.userForm.value).then(data=>{
            this.listeUsers();
            $('#default-confirmation').modal('show');

         });
         this.erreursaisie = false;
        }else{

            this.erreursaisie = true;
        }


        }

        onSubmitEdit() {



            if(this.userForm.value.nom && this.userForm.value.prenom && this.userForm.value.email && this.userForm.value.username && this.userForm.value.password){
                this.userService.addUser(this.userForm.value).then(data=>{
                    this.listeUsers();
                    $('#default-confirmation').modal('show');
        
                 });
                 this.erreursaisie = false;
                }else{

                    this.erreursaisie = true;
                }




          

           }
    onReset()  { 
       // console.log("effacer");
        this.resetForm();
        this.edit=false;
    }


    resetForm(){
        this.userForm = this.formBuilder.group({
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
            email: ['', Validators.required],
            username: [''],
            password: [''],
            role: ['Administrateur', Validators.required],
            enable: ['false']
        });
    }

    listeUsers(){
        this.userService.getAll().subscribe(users => {
            this.users=users;
           // console.log(users)
        });
    }


    editUser(user){
        this.edit=true;
        this.userForm = this.formBuilder.group({
            id: [user.id],
            nom: [user.nom],
            prenom: [user.prenom],
            email: [user.email],
            username: [user.username],
            password: [user.password],
            role: [user.role],
            enable: [user.enable]
        });


    }

    userDelete;
    deleteUser(user){this.userDelete=user; }
    
    deleteUserConfirm(userDelete){
        
        this.userService.deleteUser(userDelete.id).then(result=>{
            this.listeUsers();
        })
    }
}