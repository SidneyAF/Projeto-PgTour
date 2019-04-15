import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { AdministradorPage } from '../administrador/administrador';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-deletar',
  templateUrl: 'deletar.html'
})
export class DeletarPage {
  private url: string="https://pgtour-sidneyaf.c9users.io/";
  posts: any;

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.http.get(this.url+'/getPontoTuristico').map(res => res.json())
      .subscribe(data => {
        this.posts = data;
       }, error => {
        console.log(error);
      });
  }
  
  deletarPonto(codigo){
      let dados={
        id:codigo
      }

      let alert = this.alertCtrl.create({
        title: 'Apagar',
        message: 'Deseja remover ponto turístico?',
        buttons: [
          {
            text: 'Confirmar',
            handler: () => {
              this.http.post(this.url+'/deletaPontoTuristico',dados).map(res => res.json())
              .subscribe(data => {
                console.log(data);
                this.navCtrl.push(AdministradorPage);
              }, error => {
                console.log(error);
              });
            }
          },
          {
            text: 'Cancelar',
            handler: () => {
              console.log('Cancelado');
            }
          }
        ]
      });
      alert.present();
    
    console.log(codigo);
  }

}
