import { Routes } from '@angular/router';
import { AgregarComponent } from './components/agregar/agregar.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { EditarComponent } from './components/editar/editar.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './util/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/catalogo', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'catalogo', component: CatalogoComponent, canActivate: [authGuard] },
  { path: 'nuevo', component: AgregarComponent, canActivate: [authGuard] },
  { path: 'editar/:id', component: EditarComponent, canActivate: [authGuard] },
  { path: 'eliminar/:id', component: EliminarComponent, canActivate: [authGuard] }
];
