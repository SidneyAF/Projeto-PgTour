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
import { SetLocationPage } from '../pages/set-location/set-location';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

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
    InformaEsPage,
    SetLocationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCoylt5hgKvT9k3yQNXUWpNF3bK84_AFGE',
      libraries: ['geometry']
    }),
    AgmDirectionModule
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
    InformaEsPage,
    SetLocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}