import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PontosTurSticosPage } from '../pontos-tur-sticos/pontos-tur-sticos';
import { ConfiguraEsPage } from '../configura-es/configura-es';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = PontosTurSticosPage;
  tab2Root: any = LoginPage;
  tab3Root: any = ConfiguraEsPage;
  constructor(public navCtrl: NavController) {
  }
  goToPontosTurSticos(params){
    if (!params) params = {};
    this.navCtrl.push(PontosTurSticosPage);
  }goToConfiguraEs(params){
    if (!params) params = {};
    this.navCtrl.push(ConfiguraEsPage);
  }
}
