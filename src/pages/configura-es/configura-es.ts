import { LocalNotifications } from '@ionic-native/local-notifications';
import { Component, TestabilityRegistry } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-configura-es',
  templateUrl: 'configura-es.html'
})
export class ConfiguraEsPage {
  distancia: number;
  permission: string;
  constructor(public navCtrl: NavController, private localNotifi: LocalNotifications, private platform: Platform) {
    this.permission = localStorage.getItem('permission') ? localStorage.getItem('permission') : "false";
    this.distancia = localStorage.getItem('distancia') ? parseInt(localStorage.getItem('distancia')) : 5;
  }
  
  onSaveConfig() {
    /*this.platform.ready().then(() => {
      this.localNotifi.schedule({
        title:'Notificação',
        text: 'Olá',
        sound: null,
        icon: '', 
        lockscreen: true,
      })
    });*/
    localStorage.setItem('permission', this.permission.toString());
    localStorage.setItem('distance', this.distancia.toString());
    alert('As configurações foram salvas com sucesso!');
    
  }

  range(){
    console.log(this.distancia);
  }

}
