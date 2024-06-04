import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  isAlertOpen = false;
  Nombre: string = "";
  Usuario: string = "";
  Password: string = "";
  Confirmarpassword: string = "";
  Email: string = "";

  constructor(private alertController: AlertController, private router:Router) {}

  ngOnInit() {
  }
  form(){
    if (this.Nombre.trim()=='camila' && this.Usuario.trim()=='camila1' && this.Password.trim()=='camila' && this.Confirmarpassword.trim()=='camila' && this.Email.trim()=='ping.camila@gmail.com' ){
      let NavigationExtras: NavigationExtras;{

      }
      this.router.navigate(['/login']);
    }
    else{
      this.presentAlert();
    }
  }
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Aviso Importante',
      message: 'Por favor, confirma que tus datos sean correctos.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            this.setOpen(false);
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Aceptar');
            this.setOpen(false);
          }
        }
      ],
    });

    this.setOpen(true);
    await alert.present();
  
  }
}


