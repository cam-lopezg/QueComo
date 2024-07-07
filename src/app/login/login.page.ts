import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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
  usuarioRecibido: string = "";
  contrasenaRecibida: string = ""; 
  token: any ="";


  constructor(private alertController: AlertController, private router:Router, private activerouter: ActivatedRoute) {
    
    console.log('primerlog')
    this.activerouter.queryParams.subscribe(params=>{ 
      console.log('segundolog')
      console.log(this.router.getCurrentNavigation())
      if(this.router.getCurrentNavigation()?.extras?.state){
        console.log('tercerlog')
    
        this.usuarioRecibido = this.router.getCurrentNavigation()?.extras?.state?.['usuarioCorrecto'];
        this.contrasenaRecibida = this.router.getCurrentNavigation()?.extras?.state?.['contrasenaCorrecta']
      }
        

    })
  }



  ngOnInit() {
    this.token = localStorage.getItem ('token');
    console.log('tokenvalido')
    // rescatar datos, a penas se crea el componente se ejecuta este metodo
  }

  register(){
    this.router.navigate(['/form'])
  }

  guardarDatos() {
    localStorage.setItem('token', this.usuarioRecibido);
    console.log('usuario guardado')
  }

  login(){
    console.log(this.Usuario.trim())
    console.log(this.Password.trim())
    console.log(this.Usuario.trim()=='camila' && this.Password.trim()== '1234')
    if (this.usuarioRecibido.trim() && this.contrasenaRecibida.trim() ){
      let NavigationExtras: NavigationExtras;
      this.guardarDatos()
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


