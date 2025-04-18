import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories`)
  }

  getAllSubcategoryOnCategory(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${id}/subcategories`)
  }
}
