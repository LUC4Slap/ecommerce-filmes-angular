import { Routes } from '@angular/router';
import { VisualizarFilme } from './pages/visualizar-filme/visualizar-filme';
import { Home } from './pages/home/home';
import { CadastrarFilme } from './pages/cadastrar-filme/cadastrar-filme';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'visualizar-filme/:id',
    component: VisualizarFilme
  },
  {
    path: 'cadastrar-filme',
    component: CadastrarFilme
  }
];
