// src/app/app.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';

import { AppRoute } from '../const';
import Loader from '../components/loader/loader';
import PrivateRoute from '../components/private-route/private-route';

import Main from '../pages/main/main';

const AuthPage = lazy(() => import('../pages/auth/auth'));
const FavoritesPage = lazy(() => import('../pages/favorites/favorites'));
const OfferPage = lazy(() => import('../pages/offer/offer'));
const NotFoundPage = lazy(
  () => import('../pages/page-not-found/page-not-found')
);

import { RootState } from '../store';

function App(): JSX.Element {
  // Название переменной должно совпадать с тем, что передаёте в PrivateRoute
  const authorizationStatus = useSelector(
    (state: RootState) => state.user.authorizationStatus
  );

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={AppRoute.Root} element={<Main />} />

          <Route path={AppRoute.Login} element={<AuthPage />} />

          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesPage />
              </PrivateRoute>
            }
          />

          <Route path={AppRoute.Offer} element={<OfferPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
