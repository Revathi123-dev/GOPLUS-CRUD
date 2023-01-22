import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  postProduct(data:any){//post product method
    return this.http.post<any>("http://localhost:3000/createuser/",data);
  }
  getProduct()//get product method
  {
    return this.http.get<any>("http://localhost:3000/createuser/");
  }
  putProduct(data:any,id : number){//it should includes two arguments
    return this.http.put<any>("http://localhost:3000/createuser/"+id ,data);

  }
  deleteProduct(id : number){//argument as id
    return this.http.delete<any>("http://localhost:3000/createuser/"+id);//delete the specific argument
  }
}
