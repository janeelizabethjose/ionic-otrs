import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the KnowledgeBasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-knowledge-base',
  templateUrl: 'knowledge-base.html',
})
export class KnowledgeBasePage {

  responseData: any;
  responseDataKB: any;
  knowledgeBaseData: any = [];
  constructor( public navCtrl: NavController, public navParams: NavParams, public authService : AuthServiceProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

/*  ionViewDidLoad() {
    console.log('ionViewDidLoad KnowledgeBasePage');
  }*/

  ionViewWillEnter(){
  	this.authService.getDataKbOTRS('FAQSearch?OrderBy=FAQID&OrderByDirection=Up').then((result) => {	
	this.responseData = result;
	if( this.responseData && this.responseData.ID) {
		this.showLoader();
		this.knowledgeBaseData = [];
		this.authService.getDataKbOTRS( 'FAQ/'+this.responseData.ID.join()+'?GetAttachmentContents=0' ).then((resultKB) => {
			this.responseDataKB = resultKB;
			if( this.responseDataKB.FAQItem ) {
				this.knowledgeBaseData = this.responseDataKB.FAQItem;
			}else {
			}
			}, (err) => {
				console.log(err);
		});
        /*}*/
        /*for (let i = 0; i < this.responseData.ID.length; i++){
			this.authService.getDataKbOTRS( 'FAQ/'+this.responseData.ID[i]+'?GetAttachmentContents=0' ).then((resultKB) => {
				this.responseDataKB = resultKB;
				if( this.responseDataKB.FAQItem ) {
					 this.knowledgeBaseData.push({ID: this.responseDataKB.FAQItem[0].ID, CategoryName: this.responseDataKB.FAQItem[0].CategoryName, Title: this.responseDataKB.FAQItem[0].Title, Created: this.responseDataKB.FAQItem[0].Created });
				}else {
				}
				}, (err) => {
					console.log(err);
			});
        }*/

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

showLoader() {
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 3000);
}

}
