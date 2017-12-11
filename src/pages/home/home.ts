import { Component } from '@angular/core';
import { NavController, App, MenuController, AlertController, LoadingController } from 'ionic-angular';
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
	responseDataTicket: any;
	buttonOpenColor: string = '#345465';
	buttonClosedColor: string = '#4c4cff';
	hideOpen : any;
	hideClosed : any;
	openTicketResult: any = [];
	closedTicketResult: any = [];
	//responseUpdateData: any = [];
	userPostData = {"user_id":"","token":"", "password":""};

	constructor(public navCtrl: NavController, public app: App, public authService : AuthServiceProvider, public menuCtrl: MenuController, public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController) {
	
		const data = JSON.parse(localStorage.getItem('userData'));
		if(data){
			this.userDetails = data.userData;
		}

		if( this.userPostData.user_id && this.userPostData.token ) {
			this.userPostData.user_id = this.userDetails.user_id;
			this.userPostData.token = this.userDetails.token;
		}

  		this.openTickets();
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

showLoader() {
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 3000);
}

openTickets(){
	this.hideClosed = false;
	this.hideOpen = true;
	this.buttonOpenColor = '#345465';
	this.buttonClosedColor = '#4c4cff';
	this.showLoader();
	//this.authService.getDataOTRS('?UserLogin=otrsuser&Password=Password@1&StateType=open').then((result) => {
	this.authService.getDataOTRS('?CustomerUserLogin='+this.userDetails.username+'&Password='+this.userDetails.password+'&StateType=open').then((result) => {	
	this.responseData = result;
	if( this.responseData && this.responseData.TicketID) {
		this.showLoader();
			this.openTicketResult = [];
	        for (let i = 0; i < this.responseData.TicketID.length; i++){
				this.authService.getDataOTRS('/'+this.responseData.TicketID[i]+'?CustomerUserLogin='+this.userDetails.username+'&Password='+this.userDetails.password).then((resultTicket) => {
					this.responseDataTicket = resultTicket;
					if( this.responseDataTicket.Ticket ) {
						 this.openTicketResult.push({TicketID: this.responseDataTicket.Ticket[0].TicketID, TicketNumber: this.responseDataTicket.Ticket[0].TicketNumber, Title:this.responseDataTicket.Ticket[0].Title });
					}else {
						//console.log('here1');
						}
					}, (err) => {
						console.log(err);
				});
	        }
	}else {
		let alert = this.alertCtrl.create({
			title: 'Error!',
			subTitle: 'No Tickets Available for the Loggined User!',
			buttons: ['OK']
		});
		alert.present();
		}
	}, (err) => {
		console.log(err);
	});
}

closedTickets(){
	this.hideClosed = true;
	this.hideOpen = false;
	this.buttonClosedColor = '#345465';
	this.buttonOpenColor = '#4c4cff';

	this.showLoader();
	this.authService.getDataOTRS('?CustomerUserLogin='+this.userDetails.username+'&Password='+this.userDetails.password+'&StateType=closed').then((result) => {
	//this.authService.getDataOTRS('?UserLogin=otrsuser&Password=Password@1&StateType=closed').then((result) => {
	this.responseData = result;
	if( this.responseData && this.responseData.TicketID) {
		this.closedTicketResult= [];
        for (let i = 0; i < this.responseData.TicketID.length; i++){
			this.authService.getDataOTRS('/'+this.responseData.TicketID[i]+'?CustomerUserLogin='+this.userDetails.username+'&Password='+this.userDetails.password).then((resultTicketClosed) => {
				this.responseData = resultTicketClosed;
				if( this.responseData.Ticket ) {
					 this.closedTicketResult.push({TicketID: this.responseData.Ticket[0].TicketID, TicketNumber: this.responseData.Ticket[0].TicketNumber, Title:this.responseData.Ticket[0].Title });
				}else {
					//console.log('here1');
					}
				}, (err) => {
					console.log(err);
			});
        }
	}else {
		let alert = this.alertCtrl.create({
			title: 'Error!',
			subTitle: 'No Tickets Available for the Loggined User!',
			buttons: ['OK']
			});
			alert.present();
		}
	}, (err) => {
		console.log(err);
	});

}

openTicketDetails(ticketID)	{
	if( ticketID ) {
		this.authService.getDataOTRS('/'+ticketID+'?CustomerUserLogin='+this.userDetails.username+'&Password='+this.userDetails.password+'&AllArticles=1&DynamicFields=1').then((result) => {
		this.responseData = result;
		if( this.responseData.Ticket ) {
			if( this.responseData.Ticket[0].Type && "Incident" == this.responseData.Ticket[0].Type ) {
				this.navCtrl.push( ReportIncidentPage, {
		    		responseUpdateData: this.responseData.Ticket[0]
		  		});
			}else if ( this.responseData.Ticket[0].Type && "Service Request" == this.responseData.Ticket[0].Type ) {
				console.log(this.responseData.Ticket[0]);
				this.navCtrl.push( RaiseRequestPage, {
		    		responseUpdateData: this.responseData.Ticket[0]
		  		});
			}else {
				this.navCtrl.push( RegisterComplaintPage, {
		    		responseUpdateData: this.responseData.Ticket[0]
		  		});
			}
		}else {
			let alert = this.alertCtrl.create({
				title: 'Error!',
				subTitle: 'No Data Found!',
				buttons: ['OK']
				});
				alert.present();
			}
		}, (err) => {
			console.log(err);
		});
	}

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
