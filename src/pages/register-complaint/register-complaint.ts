import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-register-complaint',
  templateUrl: 'register-complaint.html',
})
export class RegisterComplaintPage {

  articles	 = [];
  responseData : any;
  userDetails: any;
  complaintDataOtrs: any = {};
  visibility = false;
  shownArticle = null;
  complaintData = { "title": "", "department": "", "description": "", "ticketID": "", "ticketNumber":"", "articleID": "", "articleDescription": "" };

  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public alertCtrl: AlertController) {
  	const data = JSON.parse(localStorage.getItem('userData'));
	if(data){
		this.userDetails = data.userData;
	}

  	if( navParams.get("responseUpdateData") ) {
      this.visibility = true;
      this.complaintData.title = navParams.get("responseUpdateData").Title;
      this.complaintData.ticketID = navParams.get("responseUpdateData").TicketID;
      this.complaintData.ticketNumber = navParams.get("responseUpdateData").TicketNumber;
      if( navParams.get("responseUpdateData").Article ) {
        console.log(navParams.get("responseUpdateData").Article);
        for (let i = 0; i < navParams.get("responseUpdateData").Article.length; i++){
          this.articles.push({articleID: navParams.get("responseUpdateData").Article[i].ArticleID, articleDescription: navParams.get("responseUpdateData").Article[i].Body });
        }
      }

      if( navParams.get("responseUpdateData").DynamicField ) {
        console.log(navParams.get("responseUpdateData").DynamicField);
        for (let i = 0; i < navParams.get("responseUpdateData").DynamicField.length; i++){
          if( 'Department' == navParams.get("responseUpdateData").DynamicField[i].Name ) {
            this.complaintData.department =  navParams.get("responseUpdateData").DynamicField[i].Value;
          }
        }
      }
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterComplaintPage');
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

  registerComplaint() {
  	if( this.complaintData.title && this.complaintData.department && this.complaintData.description ) {

  		this.complaintDataOtrs.CustomerUserLogin = this.userDetails.username;
  		this.complaintDataOtrs.Password = this.userDetails.password;
  		this.complaintDataOtrs.Ticket = {};
  		this.complaintDataOtrs.Article = {};
  		this.complaintDataOtrs.DynamicField = {};
  		this.complaintDataOtrs.Ticket.Title = this.complaintData.title;
  		this.complaintDataOtrs.Ticket.Type = "Complaint";
  		this.complaintDataOtrs.Ticket.Queue = "Raw";
  		this.complaintDataOtrs.Ticket.State = "open";
  		this.complaintDataOtrs.Ticket.Priority = "3 normal";
  		this.complaintDataOtrs.Ticket.CustomerUser = this.userDetails.username;
  		this.complaintDataOtrs.Article.Subject = this.complaintData.title;
  		this.complaintDataOtrs.Article.Body = this.complaintData.description;
  		this.complaintDataOtrs.Article.ContentType = "text/plain; charset=utf8";
  		this.complaintDataOtrs.DynamicField.Name = "Department";
  		this.complaintDataOtrs.DynamicField.Value =  this.complaintData.department;

		  this.authService.postDataOTRS(this.complaintDataOtrs).then((result) => {
	      this.responseData = result;
        if( this.responseData.TicketID && this.responseData.TicketNumber ) {  
          let alert = this.alertCtrl.create({
          title: 'Success!',
          subTitle: "Complaint Added Successfully!",
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

  	updateComplaint() {
    if( this.complaintData.title && this.complaintData.department ) {

    this.complaintDataOtrs.CustomerUserLogin = this.userDetails.username;
    this.complaintDataOtrs.Password = this.userDetails.password;
    this.complaintDataOtrs.Ticket = {};
    this.complaintDataOtrs.DynamicField = {};
    this.complaintDataOtrs.Ticket.Title = this.complaintData.title;
    this.complaintDataOtrs.Ticket.Type = "Complaint";
    this.complaintDataOtrs.Ticket.Queue = "Raw";
    this.complaintDataOtrs.Ticket.State = "open";
    this.complaintDataOtrs.Ticket.Priority = "3 normal";
    this.complaintDataOtrs.Ticket.CustomerUser = this.userDetails.username;
    if ( this.complaintData.description ) {
      this.complaintDataOtrs.Article = {};
      this.complaintDataOtrs.Article.Subject = this.complaintData.title;
      this.complaintDataOtrs.Article.Body = this.complaintData.description;
      this.complaintDataOtrs.Article.ContentType = "text/plain; charset=utf8";
    }
    this.complaintDataOtrs.DynamicField.Name = "Department";
    this.complaintDataOtrs.DynamicField.Value =  this.complaintData.department;

    this.authService.postDataUpdateOTRS( this.complaintData.ticketID, this.complaintDataOtrs ).then((result) => {
      this.responseData = result;
      if( this.responseData.TicketID && this.responseData.TicketNumber ) {  
        let alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: "Complaint Updated Successfully!",
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
