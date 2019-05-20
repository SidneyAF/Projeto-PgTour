import { LocalNotifications } from '@ionic-native/local-notifications';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-configura-es',
  templateUrl: 'configura-es.html'
})
export class ConfiguraEsPage {
  constructor(public navCtrl: NavController, private localNotifi: LocalNotifications, private platform: Platform) {
  }
  
  onSaveConfig() {
    this.platform.ready().then(() => {
      this.localNotifi.schedule({
        title:'Notificação',
        text: '',
        sound: null,
        icon: '', 
        lockscreen: true,
      })
    });
  }
}
