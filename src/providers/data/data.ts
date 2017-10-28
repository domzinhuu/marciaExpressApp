import { Notify } from '../../models/notify.model';
import { AuthProvider } from './../auth/auth';
import { Result } from './../../models/result.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { marcia_express_api } from '../../shared/variables.utils';

@Injectable()
export class DataProvider {

  url_api: string = `${marcia_express_api}/registers`

  constructor(public http: HttpClient, private authProvider: AuthProvider) {
  }


  getHomeData(): Observable<Result> {
    return Observable.fromPromise(this.authProvider.getUserLogged()).mergeMap(user => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${user.token}`)
      return this.http.get<Result>(`${this.url_api}/user/${user.id}`, { headers })
    })

  }

  sendNotify(): Observable<Result> {
    return Observable.fromPromise(this.authProvider.getUserLogged()).mergeMap(user => {
      const notify = new Notify(user.id, `${user.completeName} realizou uma nova compra.`)
      const headers = new HttpHeaders().set('Authorization', `Bearer ${user.token}`)
      
      return this.http.post<Result>(`${this.url_api}/save/notify`, notify, { headers })
    })
  }
}
