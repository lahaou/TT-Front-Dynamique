import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { OperateurComponent } from './operateur/operateur.component';
import { OffreComponent } from './offre/offre.component';
import { ServeurFtpComponent } from './serveur-ftp/serveur-ftp.component';
import { UserComponent } from './user/user.component';
import { GestionOffreOperateurComponent } from './gestion-offre-operateur/gestion-offre-operateur.component';
import { SimComponent } from './sim/sim.component';
import { AppComponent } from './app.component';
import { ScenarioComponent } from './scenario/scenario.component';
import { TacheComponent } from './tache/tache.component';
import { CampagneComponent } from './campagne/campagne.component';
import { PlanificationComponent } from './planification/planification.component';
import { ResultatComponent } from './resultat/resultat.component';
import { MenuSimComponent  } from './menu-sim/menu-sim.component';
import { TraceComponent } from './trace/trace.component';
import { LogComponent  } from './log/log.component';
import { ExecutionComponent  } from './execution/execution.component';
import { ParametreComponent } from './parametre/parametre.component';


const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'operateur',
        component: OperateurComponent
    },
    {
        path: 'offre',
        component: OffreComponent
    },
    {
        path: 'serveurFTP',
        component: ServeurFtpComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'gestion',
        component: GestionOffreOperateurComponent
    },
    {
        path: 'sim',
        component: SimComponent
    },
    {
        path: 'index',
        component: AppComponent
    },

    {
        path: 'scenario',
        component: ScenarioComponent
    },
    {
        path: 'param',
        component: ParametreComponent
    },

    
    {
        path: 'tache',
        component: TacheComponent
    },
    {
        path: 'campagne',
        component: CampagneComponent
    },
    {
        path: 'planification',
        component: PlanificationComponent
    },
    {
        path: 'resultat',
        component: ResultatComponent
    },
    {
        path: 'menuSim',
        component: MenuSimComponent
    },
    {
        path: 'trace',
        component: TraceComponent
    },
    {
        path: 'log',
        component: LogComponent
    },

    {
        path: 'execution',
        component: ExecutionComponent
    },




    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);