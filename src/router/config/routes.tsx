import { JSX } from 'react/jsx-runtime';
import { Home } from '../../pages/Home';
import { FornecedoresForm } from '../../pages/FornecedoresForm';

export interface AppRoute {
  path: string;
  element: JSX.Element;
}

export const routes: AppRoute[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/fornecedores/form',
    element: <FornecedoresForm />,
  },
  {
    path: '/fornecedores/form/:id',
    element: <FornecedoresForm />,
  },
];
