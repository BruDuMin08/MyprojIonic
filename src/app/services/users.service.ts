import { Injectable } from '@angular/core';

 // Requisições assíncronas
import { Observable } from 'rxjs';

// Cliente HTTP do Angular
import { HttpClient } from '@angular/common/http';


// Modelagem dos dados
import { ResponseUsers } from '../models/users.model';


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
}
