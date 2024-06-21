import { Mascota } from '../models/mascota';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private readonly servidor = `${env.urlServidor}/v1/mascotas`;

  constructor( private http:HttpClient ) { }

  public obtener(id:number): Observable<Mascota> {
    // ej. http://localhost:8000/api/v1/mascotas/1
    return this.http.get<Mascota>(`${this.servidor}/${id}`);
  }

  public lista(propietario:number): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.servidor}/catalogo/${propietario}`);
  }

  public insertar(m:Mascota): Observable<Mascota> {
    console.log(`Insertando registro de ${m.nombre}`);
    console.log(JSON.stringify(m) );
    return this.http.post<Mascota>(this.servidor, m);
  }

  public editar(m:Mascota): Observable<Mascota> {
    console.log(`Editando registro de ${m.nombre}`);
    return this.http.put<Mascota>(`${this.servidor}/${m.id}`, m);
  }

  public eliminar(m:Mascota): Observable<Mascota> {
    console.log(`Eliminando registro de ${m.nombre}`);
    return this.http.delete<Mascota>(`${this.servidor}/${m.id}`);
  }

}
