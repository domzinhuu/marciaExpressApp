import { Notify } from '../../models/notify.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Result } from './../../models/result.model';
import { Observable } from 'rxjs/Rx';
import { Credentials } from './../../models/credentials.model';
import { marcia_express_api } from './../../shared/variables.utils';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  url_api = `${marcia_express_api}/users`
  constructor(public http: HttpClient, private storage: Storage) {
  }

  authenticate(credentials: Credentials): Observable<Result> {
    credentials.type = 'Android'
    if (credentials.remember) {
      this.storage.set('user_credentials', { username: credentials.username, password: credentials.password })
    } else {
      this.storage.remove('user_credentials')
    }

    return this.http.post<Result>(`${this.url_api}/login`, credentials).do(result => {
      this.setUserLogged(result.data)
    })
  }

  isAuthenticated(): Observable<any> {
    return Observable.fromPromise(this.getUserLogged()).mergeMap(user => {
      if (user) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${user.token}`)
        return this.http.get(`${this.url_api}/validate/token`, { headers })
      } else {
        return null
      }
    })

  }

  getUserLogged(): Promise<Credentials> {
    return this.storage.get('userLogged')
  }

  getLoginCredentials(): Promise<any> {
    return this.storage.get('user_credentials')
  }

  logOut(): void {
    this.storage.remove('userLogged');
  }

  requestAccess(data): Observable<any> {
    const notify = new Notify(null, `${data.nome}, deseja acessar o aplicativo! envie a senha e o login para o numero ${data.celular} `)
    return this.http.post(`${marcia_express_api}/registers/save/notify`, notify)
  }

  private setUserLogged(data: any) {
    const credentials: Credentials = {
      id: data.id,
      completeName: data.completeName,
      token: data.accessToken,
      username: '',
      password: '',
      type: 'Android',
      remember: true
    }

    this.storage.set('userLogged', credentials)
  }

}
