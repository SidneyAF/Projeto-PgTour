import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-informa-es',
  templateUrl: 'informa-es.html'
})
export class InformaEsPage {
  private url: string="https://pgtour-sidneyaf.c9users.io/";
  posts: any;

  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams) {
    let id = navParams.get('id');
    let dados ={
      id:id
    };

    this.http.post(this.url+'/getDadosPontoTuristico',dados).map(res => res.json())
      .subscribe(data => {
        this.posts = data;
        console.log(data);
      }, error => {
        console.log(error);
      });
      
  }
  
}
