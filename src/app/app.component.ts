import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';
//import { AboutPage } from '../pages/about/about';
//import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TicketPage } from '../pages/ticket/ticket';
import { ReportIncidentPage } from '../pages/report-incident/report-incident';
import { RaiseRequestPage } from '../pages/raise-request/raise-request';
import { RegisterComplaintPage } from '../pages/register-complaint/register-complaint';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	rootPage:any = WelcomePage;
	//rootPage:any = HomePage;
	@ViewChild(Nav) nav:Nav;

	pages: Array<{title: string, component: any}>;

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
		this.initializeApp();

		this.pages = [
		  { title: 'Dashboard', component: HomePage },
	      { title: 'Create Ticket', component: TicketPage },
	      { title: 'Report Incident', component: ReportIncidentPage },
	      { title: 'Raise Request', component: RaiseRequestPage },
	      { title: 'Register Complaint', component: RegisterComplaintPage },
	      { title: 'Logout', component: WelcomePage }
	    ];

	}

	initializeApp() {
	    this.platform.ready().then(() => {
	      this.statusBar.styleDefault();
	      this.splashScreen.hide();
	    });
	  }

	openPage(page) {
		//this.nav.setRoot( TabsPage, {nav : page.component} );
		this.nav.setRoot( page.component );
	}
	
	/*goLogout(){
		localStorage.clear();
		setTimeout(() => this.backToWelcome(), 1000);
	}
	
	backToWelcome(){
		this.nav.setRoot(WelcomePage);
	}*/
}
