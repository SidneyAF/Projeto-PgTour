import { Component } from '@angular/core';
import { NavController, LoadingController  } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { InformaEsPage } from '../informa-es/informa-es';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-pontos-tur-sticos',
  templateUrl: 'pontos-tur-sticos.html'
})
export class PontosTurSticosPage {
  private url: string="https://pgtour-sidneyaf.c9users.io/";
  posts: any;
  buscaPonto: string;

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController) {
    this.http.get(this.url+'/getPontoTuristico').map(res => res.json())
      .subscribe(data => {
        this.posts = data;
       }, error => {
        console.log(error);
      });
  }

  addVisita(id){
    let dados={
      id:id
    }

    this.http.post(this.url+'/addVisita',dados).map(res => res.json())
      .subscribe(data => {
        this.navCtrl.push(InformaEsPage,{
          id:id
        });
       }, error => {
        console.log(error);
      });
  }

  buscarPonto(){
    
    let aux = '%'+this.buscaPonto+'%';
    let dados={
      nomePonto:aux
    }
    console.log(dados);
    this.http.post(this.url+'/buscaPontoTuristico',dados).map(res => res.json())
      .subscribe(data => {
        this.posts = data;
        console.log(data);
       }, error => {
        console.log(error);
      });
  }

  getRank(){
    this.http.get(this.url+'/getRank').map(res => res.json())
      .subscribe(data => {
        this.posts = data;
        console.log(data);
       }, error => {
        console.log(error);
      });
  }
  }

  


