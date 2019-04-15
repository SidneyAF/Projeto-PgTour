import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, LoadingCmp } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministradorPage } from '../administrador/administrador';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-cadastrar-ponto',
  templateUrl: 'cadastrar-ponto.html'
})
export class CadastrarPontoPage {
  
  private url: string="https://pgtour-sidneyaf.c9users.io/";
  pontoTuristicoForm: FormGroup;
  posts: any;

  imagem:string;
  nomePonto:string;
  descPonto:string;
  latitudePonto:string;
  longitudePonto:string;
  hrAberturaPonto:string;
  hrEncerramentoPonto:string;

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController, private formBuilder: FormBuilder) {
    
    this.pontoTuristicoForm = this.formBuilder.group({//Valida o formulário
      nomePonto: ['',Validators.required],// Parâmetros de validação 
      descPonto: ['',Validators.required],
      latitudePonto: ['',Validators.required],
      longitudePonto: ['',Validators.required],
      hrAberturaPonto: ['',Validators.required],
      hrEncerramentoPonto: ['',Validators.required]
    });
  }

  addPontoTuristico(){
    let dados= {
      nome:this.nomePonto,
      latitude:this.latitudePonto,
      longitude:this.longitudePonto,
      descricao:this.descPonto,
      hrAbertura:this.hrAberturaPonto,
      hrEncerramento:this.hrEncerramentoPonto,
      imagem:"teste"
    }
    
    this.http.post(this.url+'/cadastrarPontoTuristico', dados).map(res => res.json())
      .subscribe(data => {
        if(data){
          alert("Cadastrado com sucesso !");
          this.navCtrl.push(AdministradorPage);
        }
        console.log(data);
       }, error => {
        console.log(error);
      });
    }

  
  
}
