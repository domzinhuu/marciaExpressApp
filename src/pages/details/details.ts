import _ from 'lodash'
import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { MONTHS } from '../../shared/variables.utils';
import { AuthProvider } from '../../providers/auth/auth';
import { RegisterView } from '../../models/register.model'
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  cardName: string
  cardId: string
  total:number = 0
  parcelas: any[] = []

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider,
    private authProvider: AuthProvider, public loadCtlr: LoadingController) {
  }

  ionViewDidLoad() {
    let loading = this.loadCtlr.create(
      {
        content: 'Aguarde....',
        spinner:'bubbles'
      }
    )

    loading.present()
    this.cardName = this.navParams.get('cardName')
    this.cardId = this.navParams.get('cardId')

    let month = MONTHS[new Date().getMonth()]
    let year = new Date().getFullYear()

    this.authProvider.getUserLogged().then(user => {
      this.dataProvider.getDetails(month, year, user.id, this.cardId).subscribe(result => {
        this.parcelas = _.map(result, register => new RegisterView(register, month, year))
        this.total = _.sumBy(this.parcelas,'value')
        loading.dismiss()
      })
    })
  }

}
