import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { TabsPage } from '../tabs/tabs';
//import { LoginPage } from '../login/login';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  responseData : any;
  userData = {"username": "","password": "", "name": "","email": ""};

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
  if( this.userData.username && this.userData.password ) {
   this.authService.postData(this.userData,'signup').then((result) => {
      this.responseData = result;
      if( this.responseData.userData ) {
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        this.navCtrl.push(TabsPage);
      }else {
        let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: this.responseData.error.text,
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
    subTitle: 'Please enter atleast username and password!',
    buttons: ['OK']
    });
    alert.present();
 }
}
}
