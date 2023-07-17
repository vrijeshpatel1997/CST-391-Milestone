import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data: any): Observable<any> {

    return this.http.post('  http://localhost:3000/Products', data);
  }

  getProduct(): Observable<any> {

    return this.http.get('http://localhost:3000/Products');
  }
  deleteProduct(id: number):Observable<any>{
    return this.http.delete(`http://localhost:3000/Products/${id}`);

  }
  editProduct(id:number, data: any): Observable<any> {

    return this.http.put(`http://localhost:3000/Products/${id}`, data);
  }


}
