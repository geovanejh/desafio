import { Route, Routes } from 'react-router-dom';
import { routes } from './config/routes';
import { Toaster } from 'react-hot-toast';

export const Router = () => {
  return (
    <div className="container">
      <Toaster />
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
};
