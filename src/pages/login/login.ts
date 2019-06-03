import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, LoadingCmp } from 'ionic-angular';
import { CadastrarPage } from '../cadastrar/cadastrar';
import { AdministradorPage } from '../administrador/administrador';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  usuario: string;
  senha: string;
  private url: string="https://pgtour-sidneyaf.c9users.io/";
  posts: any;
  loginForm: FormGroup;

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({//Valida o formulário
      usuario: ['',Validators.required],// Parâmetros de validação 
      senha: ['',Validators.required]
    });
  }

  goTocadastrar(params){
    if (!params) params = {};
    this.navCtrl.push(CadastrarPage);
  }
  //---------------- Funçao de login -----------------------------------
  logar(){
    let dados = {
      user:this.usuario,
      pass:this.senha
    };
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });

    this.http.post(this.url+'/login', dados).map(res => res.json())
      .subscribe(data => {
        loading.present();// Executa/exibe o loading
        setTimeout(() => {
            loading.dismiss();
          }, 5000);// Caso não tenha resposta fecha após 5000 milissegundos

        if((data.Permissao)){
          loading.dismiss();// Fecha o loading
          this.navCtrl.push(AdministradorPage);// Redireciona para a Home do ADM
        }else{
          loading.dismiss();// Fecha o loading
          alert(data.erro);
        }
       }, error => {
        loading.dismiss();// Fecha o loading
        alert("Falha na conexão");
      });
    }
  //---------------- Fim funçao de login -----------------------------------
  
}
