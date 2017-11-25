import { NgModule } from '@angular/core';
import { IonicPageModule, MenuController } from 'ionic-angular';
import { WelcomePage } from './welcome';

@NgModule({
  declarations: [
    WelcomePage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomePage),
  ],
})
export class WelcomePageModule {
	constructor(public menuCtrl: MenuController) {
		this.menuCtrl.swipeEnable(false);
	}
}
