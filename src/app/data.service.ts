import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    console.log("getcatogiries service");
    return this.http.get<any>(this.apiUrl);
  }
}