import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TicketPage } from '../pages/ticket/ticket';
import { ReportIncidentPage } from '../pages/report-incident/report-incident';
import { RaiseRequestPage } from '../pages/raise-request/raise-request';
import { RegisterComplaintPage } from '../pages/register-complaint/register-complaint';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	rootPage:any = WelcomePage;
	@ViewChild(Nav) nav:Nav;

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
		platform.ready().then(() => {
		statusBar.styleDefault();
		splashScreen.hide();
		});
	}

	goAbout(Page) {
		this.nav.push(AboutPage);
		//this.nav.setRoot(AboutPage);
	}
	
	goContact(Page) {
		this.nav.push(ContactPage);
	}
	
	goTicket(Page) {
		this.nav.push(TicketPage);
	}
	
	goReportIncident(Page) {
		this.nav.push(ReportIncidentPage);
	}
	
	goRaiseRequest(Page) {
		this.nav.push(RaiseRequestPage);
	}
	
	goRegisterComplaint(Page) {
		this.nav.push(RegisterComplaintPage);
	}
}
