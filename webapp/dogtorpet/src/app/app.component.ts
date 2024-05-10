import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgregarComponent } from './components/agregar/agregar.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { EditarComponent } from './components/editar/editar.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { LoginComponent } from './components/login/login.component';
import { MascotaComponent } from './components/mascota/mascota.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AgregarComponent, CatalogoComponent, EditarComponent, EliminarComponent, LoginComponent, MascotaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dogtorpet';
}
