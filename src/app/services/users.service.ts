import { Injectable } from '@angular/core';

 // Requisições assíncronas
import { Observable } from 'rxjs';

// Cliente HTTP do Angular
import { HttpClient } from '@angular/common/http';


// Modelagem dos dados
import { ResponseUsers, ResponseDelUser } from '../models/users.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // URL da API
  private apiUrl = 'http://localhost:8888/api';

  // Inicializa o cliente HTTP
  constructor(private http: HttpClient) { }

// Método para obter todos os usuários
  getUsers(): Observable<ResponseUsers> {
   return this.http.get<ResponseUsers>(this.apiUrl);
  }

// Método para obter um ùnico usuário
  getUser(id: string): Observable<ResponseUsers> {

   // Formata a URL para obter usuário ùnico pelo Id
   const url = `${this.apiUrl}?id=${id}`;

   return this.http.get<ResponseUsers>(url);
  }

// Método para obter um ùnico usuário
deleteUser(id: string): Observable<ResponseDelUser> {

  // Formata a URL para apagar usuário ùnico pelo Id
  const url = `${this.apiUrl}?id=${id}`;

  return this.http.delete<ResponseDelUser>(url);
 }

}
