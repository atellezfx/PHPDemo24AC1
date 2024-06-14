import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ACCESS_TOKEN, AuthService } from '../services/auth.service';
import { environment as env } from '../../environment/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authSvc = inject(AuthService);
  const esMiServidor = req.url.startsWith( env.urlServidor );
  const token = localStorage.getItem( ACCESS_TOKEN );
  if( authSvc.loggedIn() && esMiServidor ) {
    req = req.clone({
      setHeaders: {'Authorization': `Bearer ${token}`}
    });
  }
  return next(req);
};
