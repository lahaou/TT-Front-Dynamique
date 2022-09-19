import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { OperateurComponent } from './operateur/operateur.component';
import { OffreComponent } from './offre/offre.component';
import { ServeurFtpComponent } from './serveur-ftp/serveur-ftp.component';
import { UserComponent } from './user/user.component';
import { GestionOffreOperateurComponent } from './gestion-offre-operateur/gestion-offre-operateur.component';
import { SimComponent } from './sim/sim.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { TacheComponent } from './tache/tache.component';
import { CampagneComponent } from './campagne/campagne.component';
import { FormsModule } from '@angular/forms';
import { PlanificationComponent } from './planification/planification.component';
import { ResultatComponent } from './resultat/resultat.component';
import { ChartsModule ,BaseChartDirective } from 'ng2-charts';
import { MenuSimComponent } from './menu-sim/menu-sim.component';
import { TraceComponent } from './trace/trace.component';
import { LogComponent } from './log/log.component';
import { ExecutionComponent } from './execution/execution.component';
import { ParametreComponent } from './parametre/parametre.component';
import { DatePipe } from '@angular/common';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        FormsModule,
        ChartsModule,
     
    
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        OperateurComponent ,
        OffreComponent ,
        ServeurFtpComponent ,
        UserComponent ,
        SimComponent,
        ScenarioComponent,
        TacheComponent,
        CampagneComponent,
        GestionOffreOperateurComponent,
        PlanificationComponent ,
        ParametreComponent,
        ResultatComponent ,
        TraceComponent,
        LogComponent,
        ExecutionComponent,
        MenuSimComponent  ],
    providers: [
        DatePipe,
        // provider used to create fake backend
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }