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
  auxiliar: string;
  maisAcessados: string;
  maisProximos: string;

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController) {
    this.maisAcessados = "primary"
    this.maisProximos = "primary"
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    this.http.get(this.url+'/getPontoTuristico').map(res => res.json())
      .subscribe(data => {
        this.posts = data;
        loading.dismiss();
       }, error => {
        console.log(error);
        loading.dismiss();
        alert('Não foi possível conectar ao servidor.\nVerifique sua conexão!');
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
    this.auxiliar ="";
    this.maisProximos = "primary";
    this.maisAcessados = "primary";
    let aux = '%'+this.buscaPonto+'%';
    let dados={
      nomePonto:aux
    }

    this.http.post(this.url+'/buscaPontoTuristico',dados).map(res => res.json())
      .subscribe(data => {
          this.posts = data;
          if(data.length==0){
            console.log("Nada");
            this.auxiliar = "Sem resultados";
            }
       }, error => {
        console.log(error);
      });
  }

  getRank(){
    this.auxiliar = "";
    this.maisProximos = "primary";
    this.maisAcessados = "dark";
    this.http.get(this.url+'/getRank').map(res => res.json())
      .subscribe(data => {
        this.posts = data;
        console.log(data);
       }, error => {
        console.log(error);
      });
  }

  calculateDistance(lat1:number,lat2:number,long1:number,long2:number){
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }

  getMaisProximos(){
    this.maisAcessados = "primary";
    this.maisProximos = "dark";
    
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    loading.present();

    this.http.get(this.url+'/getPontoTuristico').map(res => res.json())
      .subscribe(data => { 
    if(localStorage.getItem('distance') !== null) {
      
      navigator
      .geolocation
      .getCurrentPosition((position)=>{
        let dataByDistance: any = [];

        for(let pontoTuristico of data) {
          let range = parseInt(localStorage.getItem('distance'));
          let distanciaPonto = this.calculateDistance(pontoTuristico['nm_latitude'], position.coords.latitude,
                                                      pontoTuristico['nm_longitude'], position.coords.longitude);
          if(distanciaPonto <= range) {
            pontoTuristico.distancia = distanciaPonto;
            dataByDistance.push(pontoTuristico);
          }
        }

        dataByDistance.sort((a, b) => parseFloat(a.distancia) - parseFloat(b.distancia));

        this.posts = dataByDistance;
        loading.dismiss();
        if(dataByDistance.length==0){
          this.auxiliar = "Sem resultados";
        }
      });

    } else {
      this.posts = data;
      loading.dismiss();
      console.log(data);
    }
  }, error => {
    console.log(error);
    loading.dismiss();
    alert('Não foi possível conectar ao servidor.\nVerifique sua conexão!');
  });
  }

  doRefresh(refresher) {
    this.maisProximos = "primary";
    this.maisAcessados = "primary";

    this.http.get(this.url+'/getPontoTuristico').map(res => res.json())
      .subscribe(data => {
        this.posts = data;
        refresher.complete();
       }, error => {
        console.log(error);
        alert('Não foi possível conectar ao servidor.\nVerifique sua conexão!');
      });

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}

