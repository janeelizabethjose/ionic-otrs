import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-report-incident',
  templateUrl: 'report-incident.html',
})
export class ReportIncidentPage {

  articles	 = [];
  responseData : any;
  userDetails: any;
  incidentDataOtrs: any = {};
  visibility = false;
  shownArticle = null;
  incidentData = { "title": "", "service": "", "description": "", "ticketID": "", "ticketNumber":"", "articleID": "", "articleDescription": "" };

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public alertCtrl: AlertController) {
  
	const data = JSON.parse(localStorage.getItem('userData'));
	if(data){
		this.userDetails = data.userData;
	}
	if( navParams.get("responseUpdateData") ) {
		//this.incidentData = navParams.get("responseUpdateData");
		this.visibility = true;
		this.incidentData.title = navParams.get("responseUpdateData").Title;
		this.incidentData.service = navParams.get("responseUpdateData").ServiceID;
		this.incidentData.ticketID = navParams.get("responseUpdateData").TicketID;
		this.incidentData.ticketNumber = navParams.get("responseUpdateData").TicketNumber;
		if( navParams.get("responseUpdateData").Article ) {
			console.log(navParams.get("responseUpdateData").Article);
			for (let i = 0; i < navParams.get("responseUpdateData").Article.length; i++){
				this.articles.push({articleID: navParams.get("responseUpdateData").Article[i].ArticleID, articleDescription: navParams.get("responseUpdateData").Article[i].Body });
        	}
		}
    }
  }

	ionViewDidLoad() {
	console.log('ionViewDidLoad ReportIncidentPage');
	}

	toggleArticle() {
		if (this.isArticleShown()) {
		    this.shownArticle = null;
		} else {
	    	this.shownArticle = this.articles;
		}
	};

	isArticleShown() {
		return this.shownArticle === this.articles;
	};

	reportIncident() {
  	if( this.incidentData.title && this.incidentData.service && this.incidentData.description ) {

  		//this.incidentDataOtrs.UserLogin = "otrsuser";
  		//this.incidentDataOtrs.Password = "Password@1";
  		this.incidentDataOtrs.CustomerUserLogin = this.userDetails.username;
  		this.incidentDataOtrs.Password = this.userDetails.password;
  		this.incidentDataOtrs.Ticket = {};
		this.incidentDataOtrs.Article = {};
  		this.incidentDataOtrs.Ticket.Title = this.incidentData.title;
  		this.incidentDataOtrs.Ticket.Type = "Incident";
  		this.incidentDataOtrs.Ticket.Queue = "Raw";
  		this.incidentDataOtrs.Ticket.State = "open";
  		this.incidentDataOtrs.Ticket.Priority = "3 normal";
  		this.incidentDataOtrs.Ticket.ServiceID = this.incidentData.service;
  		this.incidentDataOtrs.Ticket.CustomerUser = this.userDetails.username;
  		this.incidentDataOtrs.Article.Subject = this.incidentData.title;
  		this.incidentDataOtrs.Article.Body = this.incidentData.description;
  		this.incidentDataOtrs.Article.ContentType = "text/plain; charset=utf8";

		  this.authService.postDataOTRS(this.incidentDataOtrs).then((result) => {
	      this.responseData = result;
	      if( this.responseData.TicketID && this.responseData.TicketNumber ) { 	
	      	this.incidentData.title = '';
	      	this.incidentData.service = '';
	      	this.incidentData.description = '';
	        let alert = this.alertCtrl.create({
	        title: 'Success!',
	        subTitle: "Incident Reported Successfully!",
	        buttons: ['OK']
	        });
	        alert.present();
	      }else {
	        let alert = this.alertCtrl.create({
	        title: 'Error!',
	        subTitle: "Sorry, something went wrong. Please try again!",
	        buttons: ['OK']
	        });
	        alert.present();
	      }
	    }, (err) => {
	      console.log(err);
	    });

	  	}else {
	  		let alert = this.alertCtrl.create({
	    	title: 'Error!',
	    	subTitle: 'Please enter the required details!',
	    	buttons: ['OK']
	    	});
	    	alert.present();
	  	}
  	}

  	updateReportIncident() {
  	if( this.incidentData.title && this.incidentData.service ) {

  		this.incidentDataOtrs.CustomerUserLogin = this.userDetails.username;
  		this.incidentDataOtrs.Password = this.userDetails.password;
  		//this.incidentDataOtrs.TicketID = this.incidentData.ticketID;
  		//this.incidentDataOtrs.TicketNumber = this.incidentData.ticketNumber;
  		this.incidentDataOtrs.Ticket = {};
  		this.incidentDataOtrs.Ticket.Title = this.incidentData.title;
  		this.incidentDataOtrs.Ticket.Type = "Incident";
  		this.incidentDataOtrs.Ticket.Queue = "Raw";
  		this.incidentDataOtrs.Ticket.State = "open";
  		//this.incidentDataOtrs.Ticket.State = "new";
  		this.incidentDataOtrs.Ticket.Priority = "3 normal";
  		this.incidentDataOtrs.Ticket.ServiceID = this.incidentData.service;
  		this.incidentDataOtrs.Ticket.CustomerUser = this.userDetails.username;
  		if ( this.incidentData.description ) {
  			this.incidentDataOtrs.Article = {};
	  		this.incidentDataOtrs.Article.Subject = this.incidentData.title;
	  		this.incidentDataOtrs.Article.Body = this.incidentData.description;
	  		this.incidentDataOtrs.Article.ContentType = "text/plain; charset=utf8";
		}
		this.authService.postDataUpdateOTRS( this.incidentData.ticketID, this.incidentDataOtrs).then((result) => {
	      this.responseData = result;
	      if( this.responseData.TicketID && this.responseData.TicketNumber ) { 	
	      	/*this.incidentData.title = '';
	      	this.incidentData.service = '';
	      	this.incidentData.description = '';*/
	        let alert = this.alertCtrl.create({
	        title: 'Success!',
	        subTitle: "Incident Report Updated Successfully!!",
	        buttons: ['OK']
	        });
	        alert.present();

        	this.navCtrl.push(HomePage);
	      }else {
	        let alert = this.alertCtrl.create({
	        title: 'Error!',
	        subTitle: "Sorry, something went wrong. Please try again!",
	        buttons: ['OK']
	        });
	        alert.present();
	      }
	    }, (err) => {
	      console.log(err);
	    });

  	}else {
  		let alert = this.alertCtrl.create({
    	title: 'Error!',
    	subTitle: 'Please enter the required details!',
    	buttons: ['OK']
    	});
    	alert.present();
  	}
  }

}
