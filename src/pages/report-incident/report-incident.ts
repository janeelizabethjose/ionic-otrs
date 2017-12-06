import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-report-incident',
  templateUrl: 'report-incident.html',
})
export class ReportIncidentPage {

  responseData : any;
  incidentData = {"title": "","service": "", "description": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportIncidentPage');
  }

  reportIncident() {
  	console.log(this.incidentData.title);
  	console.log(this.incidentData.service);
  	console.log(this.incidentData.description);
  }

}
