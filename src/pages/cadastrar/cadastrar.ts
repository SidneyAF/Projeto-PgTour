import { Component } from '@angular/core';
import { NavController, LoadingController  } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-cadastrar',
  templateUrl: 'cadastrar.html'
})
export class CadastrarPage {
  nome:string;
  senha:string;
  private url: string="https://pgtour-sidneyaf.c9users.io/";
  credentialsForm: FormGroup;
  posts: any;

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController, private formBuilder: FormBuilder) {
    this.credentialsForm = this.formBuilder.group({//Valida o formulário
      usuario: ['',Validators.required],// Parâmetros de validação do campo usuario
      senha: ['',Validators.required]// Parâmetros de validação do campo senha
    });
  }
  
  
  cadastrar(){
    let dados = {
      nome:this.nome,
      senha:this.senha
    };
    let loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    
    console.log(dados);

    this.http.post(this.url+'/cadastrarAdm', dados).map(res => res.json())
      .subscribe(data => {
        loading.present();// Executa/exibe o loading
        setTimeout(() => {
            loading.dismiss();
          }, 5000);// Caso não tenha resposta fecha após 5000 milissegundos
        if(data){
          alert("Cadastrado com sucesso !");
          loading.dismiss();
          this.navCtrl.push(LoginPage);
        }
        console.log(data);
       }, error => {
        console.log(error);
        loading.dismiss();
      });
    }
  
}
