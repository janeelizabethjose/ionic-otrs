import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
//import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  /*if(localStorage.getItem('userData')){
     this.navCtrl.setRoot(WelcomePage);
   }*/
   
  }

  ionViewDidLoad() {
    if( localStorage.getItem("userData") ){
        console.log('here');
        localStorage.clear();
        //this.navCtrl.setRoot(StartPage);
        }
    console.log('ionViewDidLoad WelcomePage');
  }

  login() {
	this.navCtrl.push(LoginPage);
  }

  signup() {
	this.navCtrl.push(SignupPage);
  }
}
