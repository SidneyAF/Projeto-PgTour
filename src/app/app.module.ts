import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ConfiguraEsPage } from '../pages/configura-es/configura-es';
import { LoginPage } from '../pages/login/login';
import { PontosTurSticosPage } from '../pages/pontos-tur-sticos/pontos-tur-sticos';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { AdministradorPage } from '../pages/administrador/administrador';
import { CadastrarPontoPage } from '../pages/cadastrar-ponto/cadastrar-ponto';
import { EditarPage } from '../pages/editar/editar';
import { DeletarPage } from '../pages/deletar/deletar';
import { CadastrarPage } from '../pages/cadastrar/cadastrar';
import { EditarUsuarioPage } from '../pages/editar-usuario/editar-usuario';
import { InformaEsPage } from '../pages/informa-es/informa-es';
import { HttpModule } from '@angular/http';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ConfiguraEsPage,
    LoginPage,
    PontosTurSticosPage,
    TabsControllerPage,
    AdministradorPage,
    CadastrarPontoPage,
    EditarPage,
    DeletarPage,
    CadastrarPage,
    EditarUsuarioPage,
    InformaEsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ConfiguraEsPage,
    LoginPage,
    PontosTurSticosPage,
    TabsControllerPage,
    AdministradorPage,
    CadastrarPontoPage,
    EditarPage,
    DeletarPage,
    CadastrarPage,
    EditarUsuarioPage,
    InformaEsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}