import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { propietariosPrueba } from '../util/datos-prueba';
import { Propietario } from '../models/propietario';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  // TODO: Implementar la URL del servidor (backend)

  constructor() { }

  public obtener(id:number): Observable<Propietario> {
    const resultado = propietariosPrueba.filter( prop => prop.id == id );
    return of( resultado[0] );
  }

  public lista(): Observable<Propietario[]> {
    return of( propietariosPrueba );
  }

}
