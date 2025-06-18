import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { MostrarArchivoComponent } from './mostrar-archivo/mostrar-archivo.component';

export const routes: Routes = [
  { path: '', component: PaginaInicialComponent },
  { path: 'mostrar-archivo', component: MostrarArchivoComponent }
];
