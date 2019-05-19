import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera/index';
import { AdministradorPage } from '../administrador/administrador';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'page-editar',
  templateUrl: 'editar.html'
})
export class EditarPage {
  private url: string="https://pgtour-sidneyaf.c9users.io/";
  posts: any;
  nome: string;
  descricao: string;
  latitude: string;
  longitude: string;
  hrAbertura: string;
  hrEncerramento: string;
  id: string;
  imagem: string;

  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams, private camera: Camera, public http2: HttpClient) {
    let id = navParams.get('id');
    let dados ={
      id:id
    };

    this.http.post(this.url+'/getDadosPontoTuristico',dados).map(res => res.json())
      .subscribe(data => {
        this.posts = data;
        this.id = data[0].cd_ponto_turistico;
        this.nome = data[0].nm_ponto_turistico;
        this.descricao = data[0].ds_ponto_turistico;
        this.latitude = data[0].nm_latitude;
        this.longitude = data[0].nm_longitude;
        this.hrAbertura = data[0].hr_abertura;
        this.hrEncerramento = data[0].hr_encerramento;
        this.imagem = data[0].im_ponto_turistico;
      }, error => {
        console.log(error);
      });
    
  }

  updatePonto(){
    let dados={
      id:this.id,
      nome:this.nome,
      latitude:this.latitude,
      longitude:this.longitude,
      hrAbertura:this.hrAbertura,
      hrEncerramento:this.hrEncerramento,
      descricao:this.descricao
    }

    console.log(dados);
    
    this.http.post(this.url+'/alteraPontoTuristico',dados).map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.navCtrl.push(AdministradorPage);
      }, error => {
        console.log(error);
      });
  }
  
  updateImage(){

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
     
     this.imagem = 'data:image/jpeg;base64,' + imageData;

     let dados={
      id:this.id,
      imagem:this.imagem
    }
    
    console.log(dados);

    this.http.post(this.url+'/updateImagem',dados).map(res => res.json())
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
      
    }, (err) => {
     // Handle error
    });

    

  }

  
}
