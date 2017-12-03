import { Component } from '@angular/core';
import { NavController, App, MenuController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
	openTicketResult: any = [];
	userPostData = {"user_id":"","token":""};

	constructor(public navCtrl: NavController, public app: App, public authService : AuthServiceProvider, public menuCtrl: MenuController, public alertCtrl: AlertController, public http: Http) {
	
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

/*this.http.get('http://18.195.41.230:8080/otrs/nph-genericinterface.pl/Webservice/GenericTicketConnectorRest/Ticket/1?UserLogin=otrsuser&Password=Password@1')
.map(res => res.json()).subscribe(data => {
	console.log(data.Ticket);
},
err => {
	console.log('error');
});*/

this.authService.getDataOTRS('?UserLogin=otrsuser&Password=Password@1&State=open').then((result) => {
	
	//openTicketResult= [];
	this.responseData = result;
	if( this.responseData ) {
		if( 0 < this.responseData.TicketID.length) {
			this.openTicketResult= [];
	        for (let i = 0; i < this.responseData.TicketID.length; i++){
				this.authService.getDataOTRS('/'+this.responseData.TicketID[i]+'?UserLogin=otrsuser&Password=Password@1').then((resultTicket) => {
					this.responseData = resultTicket;
					if( this.responseData.Ticket ) {
						 this.openTicketResult.push({TicketID: this.responseData.Ticket[0].TicketID, TicketNumber: this.responseData.Ticket[0].TicketNumber, Title:this.responseData.Ticket[0].Title });
					}else {
						//console.log('here1');
						}
					}, (err) => {
						console.log(err);
				});
	        }
		}
	}else {
		let alert = this.alertCtrl.create({
		title: 'Error!',
		subTitle: 'Invalid Request!',
		buttons: ['OK']
		});
		alert.present();
		}
	}, (err) => {
		console.log(err);
	});

/*this.authService.postTest('otrsuser','Password@1', 'new' ).then((result) => {
	this.responseData = result;
	if( this.responseData ) {
		console.log(this.responseData);
		
	}else {
		let alert = this.alertCtrl.create({
		title: 'Error!',
		subTitle: 'Invalid Request!',
		buttons: ['OK']
		});
		alert.present();
		}
	}, (err) => {
		console.log(err);
	});*/

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

/*get_ticket_details(){
	this.http.get('http://18.195.41.230:8080/otrs/nph-genericinterface.pl/Webservice/GenericTicketConnectorRest/Ticket/1?UserLogin=otrsuser&Password=Password@1')
	.map(res => res.json()).subscribe(data => {
		console.log(data.Ticket);
	},
	err => {
		console.log('error');
	});
}*/

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
