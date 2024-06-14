import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ACCESS_TOKEN, AuthService, USUARIO_ACTUAL } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { Status, Token } from '../../models/token';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formulario:FormGroup;
  mensajeError:string = '';

  constructor( private builder:FormBuilder, private authSvc:AuthService, private router:Router ) {
    this.formulario = builder.group( {
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    });
  }

  public enviarDatos() {
    const credenciales = this.formulario.value;
    if( this.formulario.valid ) {
      this.authSvc.login( credenciales ).subscribe( {
        next: datos => this.procesarRespuesta( datos, credenciales ),
        error: datos => this.mensajeError = datos.message
      } );
    } else {
      this.mensajeError = 'Formulario incompleto';
    }
  }

  private procesarRespuesta(datos: Token|Status, usuario:Usuario): void {
    if( 'access_token' in datos ) {
      localStorage.setItem( USUARIO_ACTUAL, usuario.email );
      localStorage.setItem( ACCESS_TOKEN, datos.access_token );
      this.router.navigateByUrl('/catalogo');
    } else {
      localStorage.removeItem( USUARIO_ACTUAL );
      localStorage.removeItem( ACCESS_TOKEN );
      this.mensajeError = datos.message;
    }
    // this.router.navigateByUrl('/catalogo');
  }


}
