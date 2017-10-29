import { LoginPage } from './../login/login';
import { AuthProvider } from './../../providers/auth/auth';
import { DataProvider } from './../../providers/data/data';
import { AboutPage } from './../about/about';
import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from 'ionic-angular';
import { MONTHS } from '../../shared/variables.utils';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userName: string
  cardList: any[] = []
  totalPeriod: number
  actualMonth: string = MONTHS[new Date().getMonth()]

  constructor(public navCtrl: NavController, private dataProvider: DataProvider,
    private authProvider: AuthProvider, private loadCtrl: LoadingController, private toast: ToastController,
    private alertCtrl: AlertController) { }

  ionViewDidLoad() {
    const loading = this.loadCtrl.create({
      content: 'Carregando...',
      spinner: 'bubbles'
    })

    loading.present()
    this.authProvider.getUserLogged().then(user => {
      this.userName = user.completeName;
      loading.dismiss()
    })

    this.dataProvider.getHomeData().subscribe(result => {
      this.cardList = result.data.cardList
      this.totalPeriod = result.data.totalPeriod
    })
  }


  showNotifications() {
    this.alertCtrl.create({
      message: 'Você não possui nenhuma notificação',
      buttons: ['Ok']
    }).present()
  }

  sendNotification() {

    this.alertCtrl.create({
      title: 'Confirmação',
      subTitle: 'Você realizou uma compra e deseja notificar Marcia?',
      message: 'O que comprou?',
      inputs: [{
        name: 'description',
        placeholder: 'Ex: Bicicleta de 250R$ em 5x na Amazonas bike'
      }],
      buttons: [
        {
          text: 'Sim',
          handler: (data) => {
            if (!data.description) {
              console.log(data);
              this.toast.create({
                message: 'Informe por favor o que foi comprado e o valor e o local da compra..',
                duration: 5000
              }).present();
            } else {
              this.saveNotify(data.description)
            }
          }
        }, {
          text: 'Não',
          role: 'cancel'
        }
      ]
    }).present()
  }
  goToAbout() {
    this.navCtrl.push(AboutPage)
  }

  logOut() {
    this.authProvider.logOut();
    this.navCtrl.setRoot(LoginPage)
  }

  private saveNotify(description) {
    const loading = this.loadCtrl.create({
      content: 'Aguarde...',
      spinner: 'bubbles'
    })

    loading.present()
    this.dataProvider.sendNotify(description).subscribe(result => {
      loading.dismiss()
      this.toast.create({
        message: result.messages.toString(),
        duration: 3000
      }).present()


    }, fail => {
      loading.dismiss()
      this.toast.create({
        message: fail.error,
        duration: 5000
      }).present()

    })
  }
}
