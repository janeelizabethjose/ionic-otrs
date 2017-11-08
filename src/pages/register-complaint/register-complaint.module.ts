import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterComplaintPage } from './register-complaint';

@NgModule({
  declarations: [
    RegisterComplaintPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterComplaintPage),
  ],
})
export class RegisterComplaintPageModule {}
