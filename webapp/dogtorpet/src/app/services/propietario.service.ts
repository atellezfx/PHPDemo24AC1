import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Propietario } from '../models/propietario';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  private readonly servidor = `${env.urlServidor}/v1/propietarios`;

  constructor( private http:HttpClient ) { }

  public obtener(id:number): Observable<Propietario> {
    // ej. http://localhost:8000/api/v1/propietarios/1
    return this.http.get<Propietario>(`${this.servidor}/${id}`);
  }

  public lista(): Observable<Propietario[]> {
    return this.http.get<Propietario[]>(this.servidor);
  }

}
