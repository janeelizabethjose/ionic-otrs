import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

let apiUrl = 'http://14.1.197.36/ionic-restservice/api/index.php/';
let apiUrlOtrs = 'http://18.195.41.230:8080/otrs/nph-genericinterface.pl/Webservice/GenericTicketConnectorRest/Ticket';
let apiUrlUpdateOtrs = 'http://18.195.41.230:8080/otrs/nph-genericinterface.pl/Webservice/GenericTicketConnectorRestUpdated/Ticket';
let apiUrlKbOtrs = 'http://18.195.41.230:8080/otrs/nph-genericinterface.pl/Webservice/GenericFAQConnectorRest/';
//let apiUrl = 'http://localhost/PHP-Slim-Restful/api/';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
}

getDataOTRS(credentials) {
    return new Promise((resolve, reject) => {
    //let headers = new Headers();
      this.http.get(apiUrlOtrs+credentials)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
}

postDataOTRS(credentials) {
    return new Promise((resolve, reject) => {
      //let headers = new Headers();
    console.log(JSON.stringify(credentials));
      this.http.post(apiUrlOtrs, JSON.stringify(credentials))
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
}

postDataUpdateOTRS(id, credentials) {
    return new Promise((resolve, reject) => {
      this.http.post(apiUrlUpdateOtrs+'/'+id, JSON.stringify(credentials))
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
}

getDataKbOTRS(credentials) {
    return new Promise((resolve, reject) => {
      this.http.get( apiUrlKbOtrs+credentials )
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
}

/*postTest(a,b,c){

let headers = new Headers(
{
  'Content-Type' : 'application/json'
});
let options = new RequestOptions({ headers: headers });

let data = JSON.stringify({
  UserLogin: 'otrsuser',
  Password: 'Password@1',
  State:'new'
});

return new Promise((resolve, reject) => {
  this.http.post(apiUrlWS, data)
  .toPromise()
  .then((response) =>
  {
    console.log('success');
    console.log('API Response : ', response.json());
    resolve(response.json());
  })
  .catch((error) =>
  {
    console.log('fail');
    console.error('API Error : ', error.status);
    console.error('API Error : ', JSON.stringify(error));
    reject(error.json());
  });
});

}*/

}
