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
