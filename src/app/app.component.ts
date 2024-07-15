import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiciosDBService } from './services/servicios-db.service'; // Asegúrate de importar y usar el servicio

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Home', url: '/folder/home', icon: 'mail' },
    { title: 'Opciones', url: '/folder/opciones', icon: 'paper-plane' },
    { title: 'Usuario', url: '/usuario', icon: 'heart' },
    { title: 'Log out', url: '/login', icon: 'arrow'},
  ];
  public labels = ['Comer fuera', 'Comer en casa'];

  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';

  usuario: string = '';
  email: string = '';
  categories: any[] = [];
  
  constructor(
    private dataService: DataService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private dbService: ServiciosDBService // Asegúrate de importar y usar el servicio
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    console.log("ngOnInit")
    this.dataService.getCategories().subscribe(response => {
      this.categories = response.categories;
    });

    this.usuario = localStorage.getItem('nombreUsuario') || 'Usuario';
    this.email = localStorage.getItem('emailUsuario') || 'usuario@ejemplo.com';
    console.log("end NGONINIT")
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async logout() {
    await this.dbService.deleteUser();
    // Limpia cualquier información del usuario almacenada en localStorage
    localStorage.clear();
    sessionStorage.clear();
    // Navega a la página de inicio de sesión
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
