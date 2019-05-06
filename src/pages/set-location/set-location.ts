import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Location } from '../../models/location';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the SetLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {
  location: Location;
  origin: any;
  locationIsSet = false;

  constructor(private navParams: NavParams, private navCtrl: NavController, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.location = this.navParams.get('location');

    const loading = this.loadingCtrl.create({
      content:'Encontrando localização..'
    })
    loading.present();   
    navigator
    .geolocation
    .getCurrentPosition((position)=>{
      this.origin = {lat: position.coords.latitude, lng: position.coords.longitude};

      this.locationIsSet = true
      loading.dismiss()
    },(error)=>{
      loading.dismiss()
      const toast = this.toastCtrl.create({
        message: 'Não foi possível encontrar sua localização!',
        duration: 2500
      })
      toast.present();
    })
  }
  
  closeModal() {
    this.navCtrl.pop();
  }

}
