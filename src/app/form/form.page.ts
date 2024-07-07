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
  nombre: string = "";
  usuario: string = "";
  password: string = "";
  password2: string = "";
  email: string = "";
  passwordValid: boolean = false;
  passwordErrors: { [key: string]: boolean } = {
    minLength: false,
    hasUpperCase: false,
    hasSymbol: false
  
  };

  constructor(private alertController: AlertController, private router: Router) {}

  ngOnInit() {

  }

  validatePassword() {
    this.passwordErrors['minLength'] = this.password.length < 6;
    this.passwordErrors['hasUpperCase'] = !/[A-Z]/.test(this.password);
    this.passwordErrors['hasSymbol'] = !/[\W_]/.test(this.password);

    this.passwordValid = !this.passwordErrors['minLength'] && !this.passwordErrors['hasUpperCase'] && !this.passwordErrors['hasSymbol'];
  }

  form() {
    if (this.passwordValid && this.password === this.password2 && this.nombre.trim() && this.usuario.trim() && this.email.trim()) {
      let navigationExtras: NavigationExtras = {
        state: {
          usuarioCorrecto: this.usuario,
          contrasenaCorrecta: this.password
        }
      };
      this.router.navigate(['/login'], navigationExtras);
    } else {
      this.presentAlert();
    }
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  guardarDatos() {
    localStorage.setItem('token', this.usuario);
    console.log('usuario guardado')
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
