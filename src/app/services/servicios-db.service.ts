import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosDBService {
  public database!: SQLiteObject
  // VARIABLE PARA LA CREACION DE TABLAS EN LA BD SQLITE
  tablaLugares: string = "CREATE TABLE IF NOT EXISTS lugares(id_lugar INTEGER PRIMARY KEY autoincrement, tipo VARCHAR(40) NOT NULL, ubicacion VARCHAR (250) NOT NULL, ciudad VARCHAR (20), telefono NUMERIC (9) NOT NULL, correo VARCHAR (150);";
  // VARIABLE PARA LA SENTENCIA DE REGISTRO POR DEFECTO EN LA TABLA
  registroLugares: string = "INSERT or IGNORE INTO lugares(id_lugar,tipo,ubicacion, telefono, correo) VALUES (1, 'Bar', 'C.Diaz Besoain 179','Santa Cruz', '966003540', 'NULL' )";
  // OBSERVABLE PARA MANIPULAR TODOS LOS REGISTROS DE LA TABLA LUGARES
  listaLugares = new BehaviorSubject ([]);
  // OBSERVABLE PARA MANIPULAR SI LA BD ESTA LISTA O NO PARA SU MANIPULACION 
  private isDBReady : BehaviorSubject<Boolean> = new BehaviorSubject(false);
  
  constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController, private alertController: AlertController) { }
  async presentToast (msj:string){
      const toast = await this.toastController.create({
          message: msj,
          duration: 3000,
          icon: 'globe' 
      });
      await toast.present();
  }

  async presentALert(msj:string) {
    const alert = await this.alertController.create({
        header: 'alert',
        message: msj,
        buttons: ['OK'],
    });
    
    await alert.present();

  }

  crearBD (){

    this.platform.ready().then(() => {
      this.sqlite.create ({
        name: 'bdlugares.db',
        location: 'default'




      })
    }
  }
}
