import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup
  submited: boolean

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder, private authProvider: AuthProvider,
    private toast: ToastController, private loadCtrl: LoadingController, private alertCtrl: AlertController) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: [true]
    })
  }

  ionViewDidLoad() {
    this.authProvider.getLoginCredentials().then(result => {
      if (result) {
        this.loginForm.patchValue({
          username: result.username,
          password: result.password
        })
      }
    })
  }

  login() {
    const loading = this.loadCtrl.create({
      content: "Carregando...",
      spinner: 'bubbles'
    })
    this.submited = true
    if (this.loginForm.invalid) {

      this.toast.create({
        message: 'Prencha o usuario e a senha para poder acessar!',
        duration: 3000
      }).present()

      return
    }

    loading.present()
    this.authProvider.authenticate(this.loginForm.value).subscribe(result => {
      loading.dismiss()
      this.navCtrl.setRoot(HomePage)

    }, fail => {
      loading.dismiss()
      try {
        const err = JSON.parse(fail.error)

        this.toast.create({
          message: err.messages,
          duration: 5000
        }).present()

      } catch (error) {
        this.toast.create({
          message: 'Dados de login incorretos, tente novamente',
          duration: 3000
        }).present()
      }
    })
  }

  requestAccess() {
    this.alertCtrl.create({
      title: 'Solicitação',
      inputs: [{
        name: 'nome',
        placeholder: "Nome Completo"
      }, {
        name: 'celular',
        placeholder: 'Numero do whatsapp'
      }],
      buttons: [{
        text: 'Solicitar',
        handler: data => {
          if (data.nome && data.celular) {
            this.authProvider.requestAccess(data).subscribe(result => {
              this.toast.create({
                message: 'Sua solicitação foi enviada, em breve você receberá no seu whatsapp o acesso!',
                duration: 5000
              }).present()

            })

          } else {
            this.toast.create({
              message: 'É necessario informar todos os campos para concluir a solicitação.',
              duration: 5000
            }).present()
          }
        }
      }, {
        text: 'Cancelar',
        role: 'cancel'
      }]
    }).present()
  }
}
