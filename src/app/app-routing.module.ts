import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasosComponent } from './vistas/pasos/pasos.component';
import { InstruccionesComponent } from './vistas/instrucciones/instrucciones.component';


const routes: Routes = [
  { path: '', redirectTo: 'instrucciones', pathMatch: 'full' },
  { path: 'instrucciones', component: InstruccionesComponent },
  { path: 'pasos', component: PasosComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
