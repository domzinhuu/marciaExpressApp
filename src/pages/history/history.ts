import { DataProvider } from '../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  history:any = []
  actualYear:number
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private dataProvider:DataProvider,private loadCtrl:LoadingController) {
  }


  ionViewDidLoad() {
    const load = this.loadCtrl.create({
      content:"Carregando...",
      spinner:'bubbles'
    })

    load.present()
    this.actualYear = new Date().getFullYear()
    this.dataProvider.getHistory().subscribe(result=>{
      this.history = result
      load.dismiss()
    })
  }

}
