import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Propietario } from '../../models/propietario';
import { Mascota } from '../../models/mascota';
import { MascotaService } from '../../services/mascota.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ RouterModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {

  public formulario:FormGroup;
  public mascota!:Mascota;
  private prop:Propietario;

  constructor(
    private builder:FormBuilder,
    private router:Router,
    private mascotaSvc:MascotaService,
    private rutaActual:ActivatedRoute ) {
      this.prop = JSON.parse(String( sessionStorage.getItem('propietario') ));
      this.formulario = this.builder.group({
        id:['', Validators.required],
        nombre:['', Validators.required],
        propietario:[this.prop.id, Validators.required],
        nombrePropietario:[`${this.prop.nombre} ${this.prop.apellidos}`, Validators.required],
        fechaNac:['', Validators.required],
        raza:['', Validators.required],
        color:['', Validators.required],
        genero:['', Validators.required],
        tipo:['', Validators.required],
        fotoUrl:['']
      });
  }

  ngOnInit(): void {
    this.mascota = window.history.state.mascota;
    if( !this.mascota ) {
      const mascotaId = this.rutaActual.snapshot.params['id'];
      this.mascotaSvc.obtener( mascotaId ).subscribe( res => this.mascota = res );
    }
    this.cargarDatos();
  }

  private cargarDatos():void {
    this.formulario.setValue({
      id: this.mascota.id,
      nombre: this.mascota.nombre,
      propietario: this.prop.id,
      nombrePropietario: `${this.prop.nombre} ${this.prop.apellidos}`,
      fechaNac: formatDate( this.mascota.fechaNac, 'yyyy-MM-dd', 'en-US', '+0000' ),
      raza: this.mascota.raza,
      color: this.mascota.color,
      genero: this.mascota.genero,
      tipo: this.mascota.tipo,
      fotoUrl: this.mascota.fotoUrl
    });
  }

  public enviarDatos():void {
    console.log( this.formulario.errors );
    if( this.formulario.valid ) {
      const mascota:Mascota = JSON.parse( JSON.stringify( this.formulario.value ) );
      this.mascotaSvc.editar( mascota ).subscribe( m => this.router.navigateByUrl('/catalogo') );
    }
  }

}
