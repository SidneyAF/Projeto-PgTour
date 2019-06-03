import { Component } from '@angular/core';
import { NavController,LoadingController, AlertController  } from 'ionic-angular';
import { CadastrarPontoPage } from '../cadastrar-ponto/cadastrar-ponto';
import { DeletarPage } from '../deletar/deletar';
import { EditarPage } from '../editar/editar';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html'
})
export class AdministradorPage {
  private url: string="https://pgtour-sidneyaf.c9users.io/";
  posts: any;

  constructor(public navCtrl: NavController,public http: Http, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.http.get(this.url+'/getPontoTuristico').map(res => res.json())
      .subscribe(data => {
        this.posts = data;
       }, error => {
        console.log(error);
      });
  }

  goToCadastrarPonto(params){
    if (!params) params = {};
    this.navCtrl.push(CadastrarPontoPage);
  }
  
  deletar(codigo){
    let dados={
      id:codigo
    }

    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

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
              loading.present();
              this.http.get(this.url+'/getPontoTuristico').map(res => res.json())
              .subscribe(data => {
                this.posts = data;
                loading.dismiss();
              }, error => {
                console.log(error);
                loading.dismiss();
              });
            }, error => {
              console.log(error);
              loading.dismiss();
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

  editarPonto(codigo){
    this.navCtrl.push(EditarPage,{
      id:codigo
    });
  }

}
