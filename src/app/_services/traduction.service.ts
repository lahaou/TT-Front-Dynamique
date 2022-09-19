import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TraductionService {

  langue;
  nomLangue;

    constructor(private router: Router) { 
    //  this.getLangue();
    }

 fr={
    //formulaire
    "add_formulaire_operateur":"FORMULAIRE : OPERATEUR",
    "add_formulaire_offre":"FORMULAIRE : OFFRE",
    "add_formulaire_tache":"FORMULAIRE : TACHE",
    "add_formulaire_campagne":"FORMULAIRE : CAMPAGNE",
    "add_formulaire_planification":"FORMULAIRE : PLANIFICATION",

    "add_formulaire_tarificartion":"FORMULAIRE : TARIFICATION",

    "add_formulaire_serveurftp":"FORMULAIRE : SERVEUR FTP",
    "add_formulaire_user":"FORMULAIRE : UTILISATEUR",
    "add_formulaire_gestionoffreoperateur":"FORMULAIRE : OPERATEUR/OFFRE",
    "add_formulaire_sim":"FORMULAIRE : SIM",
    "add_formulaire_scenario":"FORMULAIRE : SCENARIO",

    "list_formulaire_operateur":"LISTE DES OPERATEURS",
    "list_formulaire_offre":"LISTE DES OFFRES",
    "list_formulaire_planification":"LISTE DES PLANIFICATIONS",
 

    "list_formulaire_tache":"LISTE DES TACHES",

    "list_formulaire_tarificartion_voix":"LISTE DES TARIFICATIONS VOIX",
    "list_formulaire_tarificartion_sms":"LISTE DES TARIFICATIONS SMS",

    "list_formulaire_serveurftp":"LISTE DES SERVEURS FTP",
    "list_formulaire_user":"LISTE DES UTILISATEURS",
    "list_formulaire_gestionoffreoperateur":"LISTE DES OFFRES DE L'OPERATEUR",
    "list_formulaire_sim":"LISTE DES SIMs",
    "list_formulaire_scenario":"LISTE DES SCENARIOS",

    "scenarioselectionnes":"Scénarios sélectionnés",
    "listscenariosparcampagne":"Liste des scénarios de la campagne",
    "listcampagne":"Liste des campagnes",


      //operateur
      "nom":"Nom",
      "codeRecharge":"Code de Recharge",
      "codeConsultationSolde":"Code de consultation du Solde",
      "codeConsultationData":"Code de consultation Data",

      "codeRechargeT":"Code de Recharge",
      "codeConsultationSoldeT":"Code de consultation du Solde",
      "codeConsultationDataT":"Code de consultation Data",



      "regExConsultationSolde":"RegEx Consultation Solde",
      "formatSolde": "Format Solde",
     
      "regExConsultationData":"RegEx Consultation Data",
      "formatData":"Format Data",
      "urlMMS":"Url MMS",
      "protocoleMMS":"Protocole MMS",
      "passerelleMMS":"Passerelle MMS",
      "portMMS":  "Port MMS",
      "apnMMS":"APN MMS",
      "apnInternet":"APN Internet",
      "enumPDPType":"Type de socket",

      //offre
      "typedeconnexion":"Type de connexion",
      "operateur":"Opérateur",
      "tarifdivisibleapres":"Tarif divisible après",
      "unitefacturation":"Unité de facturation (sec)",
      "tarif":"Tarif",
      "libelle":"Libellé",
      "divisionApresTemps":"Division après (sec)",
      "tarifApresDivision":"Tarif après division",
	  
      "operateurdestinataire":"Opérateur destinataire",

      //serveur ftp
      "adresseServeur":"Adresse",
      "usernameServeur":"Nom d'utilisateur",
      "portServeur":"Port",
      "modeServeur":"Mode",
      "typeServeur":"Type",
      "passwordServeur":"Mot de passe",

      //user
      "prenom":"Prénom",
      "email":"Email",
      "login":"Identifiant",
      "role":"Privilège",
      "etat":"Etat",
      "password" :"Mot de passe",

      //gestion
      "listeoffreselectionner":"Offres sélectionnées ",
      "listeoffre":"Offres ",
      "listeoffreassocier":"Offres associées à l'opérateur ",
	  "list_offre_par_operateur":"Offres par Opérateur",

      //sim
      "imsi":"IMSI",
      "msisdn":"MSISDN",

      //action
      "ajouter":"Ajouter",
      "effacer":"Effacer",
      "modifier":"Modifier",
      "annuler":"Annuler",
      "supprimer":"Supprimer",
      "action":"Action",

      //dashboard

    
      "serveurftp":"Serveurs FTP",
      "user":"Utilisateurs",
      "gestionoffreoperateur":"Offres / Opérateur",
      "sim":"Cartes SIM",
      "offre":"Offres",
      "Offre":"Offres",
      "tariffication":"Tariffication",
      "portSim":"Port",

      "gestionscenario":"Gestion des scénarios",
      "gestiontache":"Gestion des tâches",
      "campagne":"Campagnes",
    
      "planification":"Planifications",
      "resultat":"Résultats",
      "resultats":"Résultats",
      "dashboard":"Dashboard",
      "general":"Général",
      "operateurs":"Opérateurs",
      "scenarios":"Scénarios",
      "execution":"Exécution",


      
     //etat sim

     "notsave":"Non enregistrée",
     "nosim":"Pas de SIM",
     "connected":"Connectée",
     "disconnected":"Déconnectée",
     "save":"Enregistrée",
     "pinwaiting":"Attente PIN",


     //title
     "reload":"Rafrâichir",
     "database":"Base de données",
     "connectall":"Tout connecté",
     "disconnectall":"Tout deconnecté",



     "scenario":"Scénario",
     "enumExecution":"Type d'exécution",
     "typeScenario":"Type de scénario",
     "codeConsultationSoldePackage":"Code de consultation",
     "dateCreation":"Date de création",



      'nombreIteration':"Nombre d'itération",
      'tempsInterIteration':'Temps inter-itération',
      'simEmettrice':'SIM émettrice',
      'contexte':'Contexte',
      'numeroDestinataire':'Numéro destinataire',
      'dureeNombre':'Durée(sec)/Nombre',
      'simDestinataire':  'SIM destinataire',
      'tarification':'Tarification',
      'fichier':'Fichier',
      'serveurFTP':'Serveur FTP',
      'saisienumero':'Saisir un numéro',
      'typetache':'Type de tâche',
      'typeTarification':'Type de tarification',


      //erreur
      'duplicatesim':'La SIM émettrice est identique à la SIM destinataire',
      'simoccuper':'SIM OCCUPEE',
      'tarificationobligatoire':'Tarification obligatoire',
      'loginerreur':' Identifiant ou Mot de passe incorrect',
     


      //message modal
      'headerdelete':'Alerte de suppression ?',
      'messagedelete':'Voulez-vous vraiment supprimer ces enregistrements? Ce processus ne peut pas être annulé.',
      'messageconfirmation':'Enregistrement effectué.',
      'btndelete':'Supprimer',
      'btncancel':'Annuler',
      'stopexecution':"Arrêter l'exécution",
      'champsobligatoires':'Veuillez remplir tous les champs',
      'minimum':'Une itération au minimum',
      'minimumsec':'Minimum : 5 sec',
      'existe':"Ce nom est déjà utilisé",

      'AUTRE':'AUTRE',
      'date':'Date',
      'dateEx':"Date d'exécution",

      //resultat

  'resutatscenarios':'Résultat des scénarios ',
  'datede':'Date de début',
  'datefin':'Date de fin',
  'dateDebut':'Date de début',
  'search':'Rechercher',
  'soldeInitial':'Solde initial',
  'soldeBonusInitial':'Solde Bonus initial',
  'soldeFinal':'Solde final',
  'soldeBonusFinal':'Solde Bonus final',
  'coutTheorique':'Coût théorique',
  'coutPratique':'Coût pratique',
  'difference':'Différence',
  'tempsReel':'Temps réel',
  'volumePratique':'Volume pratique',
  'volumeTheorique':'Volume théorique',
  'soldeDataFinal':'Solde data final',
  'soldeDataInitial':'Solde data initial',
  'soldeBonusDataFinal':'Solde Bonus data final',
  'soldeBonusDataInitial':'Solde Bonus data initial',
  'soldePrincipalInitial':'Solde Principal initial',
  'soldePrincipalFinal':'Solde Principal final',


  
//rapport pdf
'titrePart1':'Tariffs Tracker® : Outil de',
'titrePart2':'contrôle automatique des tarifs',
'sousTitre':'Détails Scénario',
'owner':' Généré par : ',
'VOIX':'VOIX',
'SMS':'SMS',
'DATA':'DATA',
'genpdf':'Génération du PDF en cours',
'pourcentage':'Pourcentage',




'restart':'Redémarrer',
'restartSim':'Redémarrer Modem',
'tarifAnnonce':"Tarif annoncé",
'unite':"Unité",
'nombre':'Nombre',
'duree':'Durée',
'uniteFacturationApresDivision':'Unité après division',


'visualiser':'Visualiser',
'graphe':'Graphe',
'logout':'Déconnexion',

//
'menu':'Menu',
'utilitaireSIM':'Utilitaire SIM',


//PACKAGE

'packSMSInitial':'Package SMS Initial',
'packSMSFinal':'Package SMS Final',
'packDifferenceSMS':'Différence Package SMS',
'packDataInitial':'Package Data Initial',
'packDataFinal':'Package Data Final',
'packDifferenceData':'Différence Package Data',
'packVoixONNETInitial':'Package Voix ONNET Initial',
'packVoixONNETFinal':'Package Voix ONNET Final',
'packDifferenceVoixONNET':'Différence Package Voix ONNET',
'packVoixOFFNETInitial':'Package Voix OFFNET Initial',
'packVoixOFFNETFinal':'Package Voix OFFNET Final',
'packDifferenceVoixOFFNET':'Différence Package Voix OFFNET',
'packVoixMinutesInitial':'Package Voix Minutes Initial',
'packVoixMinutesFinal':'Package Voix Minutes Final',
'packDifferenceVoixMinutes':'Différence Package Voix Minutes',
'packVoixSecondesInitial':'Package Voix Seconde Initial',
'packVoixSecondesFinal':'Package Voix Seconde Final',
'packDifferenceVoixSecondes':'Différence Package Voix Seconde',


 }

 en={
   //formulaire
    "add_formulaire_operateur":"FORM : OPERATOR",
    "add_formulaire_offre":"FORM : OFFER",
    "add_formulaire_tache":"FORM : TASK",
    "add_formulaire_campagne":"FORM : CAMPAIGN",
    "add_formulaire_planification":"FORM : SCHEDULING",

    "add_formulaire_tarificartion":"FORM : PRICING",

    "add_formulaire_serveurftp":"FORM : FTP SERVER",
    "add_formulaire_user":"FORM : USER",
    "add_formulaire_gestionoffreoperateur":"FORM : OPERATOR/OFFER",
    "add_formulaire_sim":"FORM : SIM",
    "add_formulaire_scenario":"FORM : SCENARIO",

    "list_formulaire_operateur":"OPERATORS",
    "list_formulaire_offre":"OFFERS",
    "list_formulaire_planification":"SCHEDULES",
 

    "list_formulaire_tache":"TASKS",

    "list_formulaire_tarificartion_voix":"VOICE PRICING",
    "list_formulaire_tarificartion_sms":"SMS PRICING",

    "list_formulaire_serveurftp":"FTP SERVERS",
    "list_formulaire_user":"USERS",
    "list_formulaire_gestionoffreoperateur":"OPERATOR'S OFFERS",
    "list_formulaire_sim":"SIMS",
    "list_formulaire_scenario":"SCENARIOS",

    "scenarioselectionnes":"Selected scenarios",
    "listscenariosparcampagne":"Campaign's scenarios",
    "listcampagne":"Campaigns",


      //operateur
      "nom":"Name",
      "codeRecharge":"Reload code",
      "codeConsultationSolde":"Balance request code",
      "codeConsultationData":"Data request code",

      "codeRechargeT":"Reload code",
      "codeConsultationSoldeT":"Balance request code",
      "codeConsultationDataT":"Data request code",



      "regExConsultationSolde":"RegEx Consultation Solde",
      "formatSolde": "Format Solde",
     
      "regExConsultationData":"RegEx Consultation Data",
      "formatData":"Format Data",
	  
      "urlMMS":"Url MMS",
      "protocoleMMS":"Protocole MMS",
      "passerelleMMS":"Passerelle MMS",
      "portMMS":  "Port MMS",
      "apnMMS":"APN MMS",
	  
      "apnInternet":"Internet APN",
      "enumPDPType":"Socket type",

      //offre
      "typedeconnexion":"Connection type",
      "operateur":"Operator",
      "tarifdivisibleapres":"Divisible pricing after ",
      "unitefacturation":"Billing unit (sec)",
      "tarif":"Tariff",
      "libelle":"Wording",
      "divisionApresTemps":"Billing unit after dividing (sec)",
      "tarifApresDivision":"Tariff after dividing",
	  
      "operateurdestinataire":"Recipient operator",

      //serveur ftp
      "adresseServeur":"Address",
      "usernameServeur":"Username",
      "portServeur":"Port",
      "modeServeur":"Mode",
      "typeServeur":"Type",
      "passwordServeur":"Password",

      //user
      "prenom":"First name",
      "email":"Email",
      "login":"Username",
      "role":"Privilege",
      "etat":"Status",
      "password" :"Password",

      //gestion
      "listeoffreselectionner":"Selected offers",
      "listeoffre":"Offers",
      "listeoffreassocier":"Associated Offers",

      //sim
      "imsi":"IMSI",
      "msisdn":"MSISDN",

      //action
      "ajouter":"Add",
      "effacer":"Delete",
      "modifier":"Edit",
      "annuler":"Cancel",
      "supprimer":"Delete",
      "action":"Action",

      //dashboard

    
      "serveurftp":"FTP Servers",
      "user":"Users",
      "gestionoffreoperateur":"Offers/Operator",
      "sim":"SIM Cards",
      "offre":"Offers",
      "Offre":"Offers",
      "tariffication":"Pricings",
      "portSim":"Ports",

      "gestionscenario":"Manage scenarios",
      "gestiontache":"Manage tasks",
      "campagne":"Campaigns",
    
      "planification":"Schedules",
      "resultat":"Results",
      "resultats":"Results",
      "dashboard":"Dashboard",
      "general":"Global",
      "operateurs":"Operators",
      "scenarios":"Scenarios",
      "execution":"Execution",


      
     //etat sim

     "notsave":"Not saved",
     "nosim":"No SIM",
     "connected":"Connected",
     "disconnected":"Disconnected",
     "save":"Saved",
     "pinwaiting":"Waiting PIN",


     //title
     "reload":"Refresh",
     "database":"Database",
     "connectall":"Connect all",
     "disconnectall":"Disconnect all",



     "scenario":"Scenario",
     "enumExecution":"Execution type",
     "typeScenario":"Scenario type",
     "codeConsultationSoldePackage":"Balance request code",
     "dateCreation":"Creation date",



      'nombreIteration':"Number of iterations",
      'tempsInterIteration':'Time between two iterations',
      'simEmettrice':'Emitting SIM',
      'contexte':'Context',
      'numeroDestinataire':'Recipient number',
      'dureeNombre':'Time(sec)/Number',
      'simDestinataire':  'Recipient SIM',
      'tarification':'Pricing',
      'fichier':'File',
      'serveurFTP':'FTP Server',
      'saisienumero':'Enter a number',
      'typetache':'Task type',
      'typeTarification':'Pricing type',
    
      //erreur
      'duplicatesim':'The same SIM in emitting can not be used as the recipient SIM',
      'simoccuper':'SIM BUSY',
      'tarificationobligatoire':'Pricing is mandatory',
      'loginerreur':'Wrong username or password',
     

      //message modal
      'headerdelete':'Delete warning ?',
      'messagedelete':'Do you really want to delete this record? This process can not be canceled.',
      'messageconfirmation':'Saved',
      'btndelete':'Delete',
      'btncancel':'Cancel',
      'stopexecution':"Stop execution",
      'champsobligatoires':'Please fill out all entry',
      'minimum':'At least 1 itération',
      'minimumsec':'At least : 5 sec',
      'existe':"This name is already used",

      'AUTRE':'OTHER',
      'date':'Date',
      'dateEx':"Execution date",

      //resultat

  'resutatscenarios':'Results',
  'datede':'Start',
  'datefin':'End',
  'dateDebut':'Start',
  'search':'Find',
  'soldeInitial':'Initial balance',
  'soldeBonusInitial':'Initial balance Bonus',
  'soldeFinal':'Remaining balance',
  'soldeBonusFinal':'Remaining balance Bonus',
  'coutTheorique':'Announced cost',
  'coutPratique':'Billed cost',
  'difference':'Difference',
  'tempsReel':'Time',
  'volumePratique':'Billed volume',
  'volumeTheorique':'Data traffic volume',
  'soldeDataFinal':'Initial data balance',
  'soldeDataInitial':'Remaining data balance',
  'soldeBonusDataFinal':'Initial bonus data balance',
  'soldeBonusDataInitial':'Remaining bonus data balance',


  
//rapport pdf
'titrePart1':'Tariffs Tracker® : Telecommunications',
'titrePart2':'Services Tariffs Control',
'sousTitre':'Scenario details',
'owner':' Generated by : ',
'VOIX':'VOICE',
'SMS':'SMS',
'DATA':'DATA',
'genpdf':'PDF generation in progress',
'pourcentage':'Percentage',




'restart':'Restart',
'restartSim':'Restart Modem',
'tarifAnnonce':"Announced Tariff",
'unite':"Unit",
'nombre':'Number',
'duree':'Time',
'uniteFacturationApresDivision':'Unit after dividing',


'visualiser':'Display',
'graphe':'Graph',
'logout':'LOG OUT',

//
'menu':'Menu',
'utilitaireSIM':'SIM tool',





//PACKAGE

'packSMSInitial':'packSMSInitial',
'packSMSFinal':'packSMSFinal',
'packDifferenceSMS':'packDifferenceSMS',
'packDataInitial':'packDataInitial',
'packDataFinal':'packDataFinal',
'packDifferenceData':'packDifferenceData',
'packVoixONNETInitial':'packVoixONNETInitial',
'packVoixONNETFinal':'packVoixONNETFinal',
'packDifferenceVoixONNET':'packDifferenceVoixONNET',
'packVoixOFFNETInitial':'packVoixOFFNETInitial',
'packVoixOFFNETFinal':'packVoixOFFNETFinal',
'packDifferenceVoixOFFNET':'packDifferenceVoixOFFNET',
'packVoixMinutesInitial':'packVoixMinutesInitial',
'packVoixMinutesFinal':'packVoixMinutesFinal',
'packDifferenceVoixMinutes':'packDifferenceVoixMinutes',









 }







getLangue(){

   var langue =localStorage.getItem('langue');

      if(langue=="en"){
         this.langue={}
         this.nomLangue='en';
          this.langue=this.en;
          this.router.navigate(['']);
          console.log("langue set to en -->",langue);
      }else if(langue=="fr"){
         this.nomLangue='fr';
         this.langue={}
         this.langue=this.fr;
         this.router.navigate(['']);
          console.log("langue set to fr-->",langue);
      }else{
         this.nomLangue='fr';
         this.langue={}
         localStorage.setItem('langue' , 'fr');
         this.langue=this.fr;
         this.router.navigate(['']);
         console.log("langue par defaut -->",langue);
      }

}








 




}