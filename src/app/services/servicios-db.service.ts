import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosDBService {
  public database!: SQLiteObject;
  // VARIABLE PARA LA CREACION DE TABLAS EN LA BD SQLITE
  tablaLugares: string = "CREATE TABLE IF NOT EXISTS lugares(id_lugar INTEGER PRIMARY KEY AUTOINCREMENT, tipo VARCHAR(40) NOT NULL, ubicacion VARCHAR (250) NOT NULL, ciudad VARCHAR (20), telefono NUMERIC (9) NOT NULL, correo VARCHAR (150));";
  // VARIABLE PARA LA SENTENCIA DE REGISTRO POR DEFECTO EN LA TABLA
  registroLugares: string = "INSERT or IGNORE INTO lugares(id_lugar, tipo, ubicacion, ciudad, telefono, correo) VALUES (1, 'Bar', 'C.Diaz Besoain 179', 'Santa Cruz', '966003540', 'NULL');";
  // OBSERVABLE PARA MANIPULAR TODOS LOS REGISTROS DE LA TABLA LUGARES
  listaLugares = new BehaviorSubject([]);
  // OBSERVABLE PARA MANIPULAR SI LA BD ESTA LISTA O NO PARA SU MANIPULACION 
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController, private alertController: AlertController) { 
    this.crearBD();
  }

  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      icon: 'globe' 
    });
    await toast.present();
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'bdlugares.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.database.executeSql(this.tablaLugares, []).then(() => {
          this.database.executeSql(this.registroLugares, []).then(() => {
            this.isDBReady.next(true);
            this.presentToast("BD creada y lista");
          }).catch(e => this.presentAlert("Error al insertar registro por defecto en la tabla lugares: " + JSON.stringify(e)));
        }).catch(e => this.presentAlert("Error al crear la tabla lugares: " + JSON.stringify(e)));
      }).catch(e => this.presentAlert("Error al crear la BD: " + JSON.stringify(e)));
    });
  }

  // Métodos para manejar usuarios
  async addUser(username: string, password: string): Promise<void> {
    try {
      await this.database.executeSql('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
    } catch (error) {
      this.presentAlert('Error adding user: ' + JSON.stringify(error));
    }
  }

  async getUser(): Promise<any> {
    try {
      const res = await this.database.executeSql('SELECT * FROM users LIMIT 1', []);
      if (res.rows.length > 0) {
        return res.rows.item(0);
      }
      return null;
    } catch (error) {
      this.presentAlert('Error getting user: ' + JSON.stringify(error));
      return null;
    }
  }

  async deleteUser(): Promise<void> {
    try {
      await this.database.executeSql('DELETE FROM users', []);
    } catch (error) {
      this.presentAlert('Error deleting user: ' + JSON.stringify(error));
    }
  }
}
