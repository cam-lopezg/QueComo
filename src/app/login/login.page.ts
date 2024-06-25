import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isAlertOpen = false;
  alertButtons = ['Salir'];
  Usuario:string = "";
  Password:string ="";

  constructor(private alertController: AlertController, private router:Router) {}



  ngOnInit() {
  }

  register(){
    this.router.navigate(['/form'])
  }



  login(){
    console.log(this.Usuario.trim())
    console.log(this.Password.trim())
    console.log(this.Usuario.trim()=='camila' && this.Password.trim()== '1234')
    if (this.Usuario.trim()=='camila' && this.Password.trim()== '1234' ){
      let NavigationExtras: NavigationExtras;{
        
      }
      this.router.navigate(['/folder/home']);
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



  // login(){
  //   if (this.Usuario.trim()=='miguel' && this.Password.trim()=='1234'){
  //     alert('correcto')
  //   }
  //   else{
  //     alert('incorrecto')
  //   }
  //   }


