import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, LoadingCmp } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministradorPage } from '../administrador/administrador';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-cadastrar-ponto',
  templateUrl: 'cadastrar-ponto.html'
})
export class CadastrarPontoPage {
  
  private url: string="https://pgtour-sidneyaf.c9users.io/";
  base64Image: string;
  pontoTuristicoForm: FormGroup;
  posts: any;

  imagem:string;
  nomePonto:string;
  descPonto:string;
  latitudePonto:string;
  longitudePonto:string;
  hrAberturaPonto:string;
  hrEncerramentoPonto:string;

  constructor(public navCtrl: NavController, 
    public http: Http, public loadingCtrl: LoadingController, 
    private formBuilder: FormBuilder, private camera: Camera, public http2: HttpClient) {
    
    this.base64Image="https://image.flaticon.com/icons/png/512/23/23765.png";
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
      imagem:this.base64Image
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

    addImagem(){
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }
      
      this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
       
       this.base64Image = 'data:image/jpeg;base64,' + imageData;
       console.log(JSON.stringify(this.base64Image));
      }, (err) => {
       // Handle error
      });

      }
    }

  

