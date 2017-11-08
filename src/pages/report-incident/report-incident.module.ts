import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportIncidentPage } from './report-incident';

@NgModule({
  declarations: [
    ReportIncidentPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportIncidentPage),
  ],
})
export class ReportIncidentPageModule {}
