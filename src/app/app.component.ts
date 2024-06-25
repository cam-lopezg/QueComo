import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/home', icon: 'mail' },
    { title: 'Opciones', url: '/folder/opciones', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
  ];
  public labels = ['Comer fuera', 'Comer en casa'];

  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';


  categories: any[] = [];
  constructor(private dataService: DataService) {}

  ngOnInit() {
    console.log("ngOnInit")
    this.dataService.getCategories().subscribe(response => {
      this.categories = response.categories;
    });
    console.log("end NGONINIT")
  }

}
