import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-raise-request',
  templateUrl: 'raise-request.html',
})
export class RaiseRequestPage {
  articles  = [];
  responseData : any;
  userDetails: any;
  requestDataOtrs: any = {};
  requestData = { "title": "","requestType": "","description": "", "ticketID": "", "ticketNumber":"", "articleID": "", "articleDescription": ""};
  visibility = false;
  shownArticle = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public alertCtrl: AlertController) {

	const data = JSON.parse(localStorage.getItem('userData'));
	if(data){
		this.userDetails = data.userData;
	}

  if( navParams.get("responseUpdateData") ) {
      this.visibility = true;
      this.requestData.title = navParams.get("responseUpdateData").Title;
      this.requestData.ticketID = navParams.get("responseUpdateData").TicketID;
      this.requestData.ticketNumber = navParams.get("responseUpdateData").TicketNumber;
      if( navParams.get("responseUpdateData").Article ) {
        console.log(navParams.get("responseUpdateData").Article);
        for (let i = 0; i < navParams.get("responseUpdateData").Article.length; i++){
          this.articles.push({articleID: navParams.get("responseUpdateData").Article[i].ArticleID, articleDescription: navParams.get("responseUpdateData").Article[i].Body });
        }
      }

      if( navParams.get("responseUpdateData").DynamicField ) {
        console.log(navParams.get("responseUpdateData").DynamicField);
        for (let i = 0; i < navParams.get("responseUpdateData").DynamicField.length; i++){
          if( 'RequestType' == navParams.get("responseUpdateData").DynamicField[i].Name ) {
            this.requestData.requestType =  navParams.get("responseUpdateData").DynamicField[i].Value;
          }
        }
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RaiseRequestPage');
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

  raiseRequest() {
  	if( this.requestData.title && this.requestData.requestType && this.requestData.description ) {

  		//this.requestDataOtrs.UserLogin = "otrsuser";
  		//this.requestDataOtrs.Password = "Password@1";

  		this.requestDataOtrs.CustomerUserLogin = this.userDetails.username;
  		this.requestDataOtrs.Password = this.userDetails.password;
  		this.requestDataOtrs.Ticket = {};
  		this.requestDataOtrs.Article = {};
  		this.requestDataOtrs.DynamicField = {};
  		this.requestDataOtrs.Ticket.Title = this.requestData.title;
  		this.requestDataOtrs.Ticket.Type = "Service Request";
  		this.requestDataOtrs.Ticket.Queue = "Raw";
  		this.requestDataOtrs.Ticket.State = "open";
  		//this.requestDataOtrs.Ticket.State = "new";
  		this.requestDataOtrs.Ticket.Priority = "3 normal";
  		this.requestDataOtrs.Ticket.CustomerUser = this.userDetails.username;
  		this.requestDataOtrs.Article.Subject = this.requestData.title;
  		this.requestDataOtrs.Article.Body = this.requestData.description;
  		this.requestDataOtrs.Article.ContentType = "text/plain; charset=utf8";
  		this.requestDataOtrs.DynamicField.Name = "RequestType";
  		this.requestDataOtrs.DynamicField.Value = this.requestData.requestType;

		  this.authService.postDataOTRS(this.requestDataOtrs).then((result) => {
	      this.responseData = result;
	      if( this.responseData.TicketID && this.responseData.TicketNumber ) {  
          let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: "Request Submitted Successfully!",
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

  updateRaiseRequest() {
    if( this.requestData.title && this.requestData.requestType ) {

    this.requestDataOtrs.CustomerUserLogin = this.userDetails.username;
    this.requestDataOtrs.Password = this.userDetails.password;
    this.requestDataOtrs.Ticket = {};
    this.requestDataOtrs.DynamicField = {};
    this.requestDataOtrs.Ticket.Title = this.requestData.title;
    this.requestDataOtrs.Ticket.Type = "Service Request";
    this.requestDataOtrs.Ticket.Queue = "Raw";
    this.requestDataOtrs.Ticket.State = "open";
    this.requestDataOtrs.Ticket.Priority = "3 normal";
    this.requestDataOtrs.Ticket.CustomerUser = this.userDetails.username;
    if ( this.requestData.description ) {
      this.requestDataOtrs.Article = {};
      this.requestDataOtrs.Article.Subject = this.requestData.title;
      this.requestDataOtrs.Article.Body = this.requestData.description;
      this.requestDataOtrs.Article.ContentType = "text/plain; charset=utf8";
    }
    this.requestDataOtrs.DynamicField.Name = "RequestType";
    this.requestDataOtrs.DynamicField.Value =  this.requestData.requestType;

    this.authService.postDataUpdateOTRS( this.requestData.ticketID, this.requestDataOtrs ).then((result) => {
      this.responseData = result;
      if( this.responseData.TicketID && this.responseData.TicketNumber ) {  
        let alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: "Request Updated Successfully!",
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
