import { Component, OnInit } from '@angular/core';
import { Mascota } from '../../models/mascota';
import { MascotaComponent } from '../mascota/mascota.component';
import { Propietario } from '../../models/propietario';
import { MascotaService } from '../../services/mascota.service';
import { PropietarioService } from '../../services/propietario.service';
import { OperatorFunction, Observable, debounceTime, distinctUntilChanged, filter, map } from 'rxjs';
import { NgbTypeaheadModule, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [MascotaComponent, NgbTypeaheadModule, FormsModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {

  mascotas:Mascota[] = [];
  propietarios: Propietario[] = [];
  modelo!: Propietario;

  formatter = (prop: Propietario) => `${prop.nombre} ${prop.apellidos} <${prop.email}>`;

  constructor( private mascotaSvc:MascotaService, private propSvc:PropietarioService ) { }

  public ngOnInit(): void {
    const jsondoc = sessionStorage.getItem('propietario');
    this.propSvc.lista().subscribe( props => this.propietarios = props );
    if( jsondoc ) {
      this.modelo = JSON.parse( jsondoc );
      this.recargarTarjetas( this.modelo );
    }
  }

  public actualizaMascotas( event:NgbTypeaheadSelectItemEvent ):void {
    sessionStorage.setItem('propietario', JSON.stringify(event.item));
    this.recargarTarjetas( event.item );
  }

  private recargarTarjetas( prop:Propietario ):void {
    this.mascotaSvc.lista( prop.id ).subscribe(
      arreglo => {
        this.mascotas.length = 0;
        this.mascotas.push(...arreglo);
      }
    );
  }

  search: OperatorFunction<string, readonly Propietario[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			filter((term) => term.length >= 2),
			map((term) => this.propietarios.filter((prop) => new RegExp(term, 'mi').test(prop.email)).slice(0, 10)),
		);

  public eliminar( mascota:Mascota|null ): void {
    if( mascota ) {
      const indice = this.mascotas.indexOf(mascota);
      this.mascotaSvc.eliminar(mascota).subscribe(
        datos => this.mascotas.splice(indice, 1)
      );
    }
  }


}
