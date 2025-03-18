import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppRoute, AuthorizationStatus } from '../const';

import PrivateRoute from '../components/private-route/private-route';
import Loader from '../components/loader/loader';

import { Offer } from '../types/offer';

//Импортируем главный экран
import Main from '../pages/main/main';

// Динамически импортируем остальные экраны
const NotFoundPreview = lazy(
  () => import('../pages/page-not-found/page-not-found')
);
const AuthPreview = lazy(() => import('../pages/auth/auth'));

const FavoritesPreview = lazy(() => import('../pages/favorites/favorites'));
const OfferPreview = lazy(() => import('../pages/offer/offer'));

type AppProps = {
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
};

function App({ offers, authorizationStatus }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={AppRoute.Root} element={<Main offers={offers} />} />
          <Route path={AppRoute.Login} element={<AuthPreview />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesPreview offers={offers} />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Offer} element={<OfferPreview />} />
          <Route path="*" element={<NotFoundPreview />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
