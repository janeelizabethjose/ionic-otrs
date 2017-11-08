import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateTicketPage } from './update-ticket';

@NgModule({
  declarations: [
    UpdateTicketPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateTicketPage),
  ],
})
export class UpdateTicketPageModule {}
