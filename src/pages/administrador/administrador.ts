import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,public http: Http, public loadingCtrl: LoadingController) {
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
  }goToDeletar(params){
    if (!params) params = {};
    this.navCtrl.push(DeletarPage);
  }

  editarPonto(codigo){
    this.navCtrl.push(EditarPage,{
      id:codigo
    });
  }
}
