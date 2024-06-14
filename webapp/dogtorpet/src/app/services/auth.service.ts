import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environment/environment';
import { Status, Token } from '../models/token';

export const USUARIO_ACTUAL = 'usuario-actual';
export const ACCESS_TOKEN = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router:Router, private http:HttpClient ) { }

  public login( usr:{email:string, password:string} ): Observable<Token|Status> {
    const servidor = `${env.urlServidor}/login`;
    return this.http.post<Token|Status>(servidor, usr);
  }

  public logout():void {
    const servidor = `${env.urlServidor}/logout`;
    this.http.get<Status>(servidor).subscribe(
      status => {
        this.router.navigateByUrl('/login');
        localStorage.clear();
        console.log(status);
      }
    );
  }

  public usuarioActual(): string | null {
    return localStorage.getItem(USUARIO_ACTUAL);
  }

  public loggedIn(): boolean {
    return !!this.usuarioActual();
  }
}

