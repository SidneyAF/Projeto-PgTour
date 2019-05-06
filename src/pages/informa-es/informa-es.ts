import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ModalController } from 'ionic-angular';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location';

@Component({
  selector: 'page-informa-es',
  templateUrl: 'informa-es.html'
})
export class InformaEsPage {
  private url: string="https://pgtour-sidneyaf.c9users.io/";
  posts: any;
  location: Location;

  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams, private modalCtrl: ModalController) {
    let id = navParams.get('id');
    let dados ={
      id:id
    };

    this.http.post(this.url+'/getDadosPontoTuristico',dados).map(res => res.json())
      .subscribe(data => {

        this.posts = data;

        const lat = parseFloat(data[0].nm_latitude);
        const lng = parseFloat(data[0].nm_longitude);

        this.location = {lat, lng}
        console.log(data);

      }, error => {
        console.log(error);
      });
      
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location});
    modal.present();
  }
  
}
