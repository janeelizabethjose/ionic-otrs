import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TicketPage } from '../pages/ticket/ticket';
import { ReportIncidentPage } from '../pages/report-incident/report-incident';
import { RaiseRequestPage } from '../pages/raise-request/raise-request';
import { RegisterComplaintPage } from '../pages/register-complaint/register-complaint';
import { KnowledgeBasePage } from '../pages/knowledge-base/knowledge-base';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TicketPage,
		ReportIncidentPage,
    RaiseRequestPage,
		RegisterComplaintPage,
    KnowledgeBasePage
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TicketPage,
		ReportIncidentPage,
    RaiseRequestPage,
		RegisterComplaintPage,
    KnowledgeBasePage
  ],
  providers: [
    StatusBar,
    SplashScreen, AuthServiceProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
