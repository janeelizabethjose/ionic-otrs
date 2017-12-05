import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

  responseData : any;
  userData = {"username": "","password": ""};

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, public alertCtrl: AlertController) {
  }

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	login() {
		if( this.userData.username && this.userData.password ) {
		this.authService.postData(this.userData,'login').then((result) => {
			console.log(result);
			this.responseData = result;
			if( this.responseData.userData ) {
				localStorage.setItem('userData', JSON.stringify(this.responseData));
				this.navCtrl.push(TabsPage);
			}else {
				let alert = this.alertCtrl.create({
				title: 'Error!',
				subTitle: 'Invalid UserName or Password!',
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
	subTitle: 'Enter UserName and Password!',
	buttons: ['OK']
	});
	alert.present();
  }
  }
}
