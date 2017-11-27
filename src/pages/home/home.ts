import { Component } from '@angular/core';
import { NavController, App, MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { ReportIncidentPage } from '../report-incident/report-incident';
import { RaiseRequestPage } from '../raise-request/raise-request';
import { RegisterComplaintPage } from '../register-complaint/register-complaint';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	userDetails : any;
	responseData: any;
	buttonOpenColor: string = '#345465';
	buttonClosedColor: string = '#4c4cff';
	hideOpen : any;
	hideClosed : any;
	userPostData = {"user_id":"","token":""};

	constructor(public navCtrl: NavController, public app: App, public authService : AuthServiceProvider, public menuCtrl: MenuController) {
	
	const data = JSON.parse(localStorage.getItem('userData'));
	if(data){
		this.userDetails = data.userData;
	}

	if( this.userPostData.user_id && this.userPostData.token ) {
		this.userPostData.user_id = this.userDetails.user_id;
		this.userPostData.token = this.userDetails.token;
	}
}

ionViewDidLoad() {
  this.hideOpen = true;
  this.hideClosed = false;
}

reportIncident(){
  this.navCtrl.push(ReportIncidentPage);
}

raiseRequest(){
  this.navCtrl.push(RaiseRequestPage);
}

registerComplaint(){
  this.navCtrl.push(RegisterComplaintPage);
}

knowledgeBase(){
	console.log('knowledgeBase');
  //this.navCtrl.push(RegisterComplaintPage);
}

openTickets(){
this.hideClosed = false;
this.hideOpen = true;
this.buttonOpenColor = '#345465';
this.buttonClosedColor = '#4c4cff';
/*
 FUNCTION CODE
*/
}

closedTickets(){
this.hideClosed = true;
this.hideOpen = false;
this.buttonClosedColor = '#345465';
this.buttonOpenColor = '#4c4cff';
/*
 FUNCTION CODE
*/
}

//backToWelcome(){
//	const root = this.app.getRootNav();
//	root.popToRoot();
//}
//
//logout(){
//	localStorage.clear();
//	setTimeout(() => this.backToWelcome(), 1000);
//}

}
