import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppRoute, AuthorizationStatus } from '../const';
import PrivateRoute from '../components/private-route/private-route';

import { Offer } from '../types/offer';

//Импортируем главный экран
import Main from '../pages/main/main';

// Динамически импортируем остальные экраны
const NotFoundScreenPreview = lazy(
  () => import('../pages/page-not-found/page-not-found')
);
const AuthScreenPreview = lazy(
  () => import('../pages/auth-screen/auth-screen')
);

const FavoritesPreview = lazy(() => import('../pages/favorites/favorites'));
const OfferScreenPreview = lazy(() => import('../pages/offer/offer'));

type AppScreenProps = {
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
};

function App({ offers, authorizationStatus }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route path={AppRoute.Root} element={<Main offers={offers} />} />
          <Route path={AppRoute.Login} element={<AuthScreenPreview />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesPreview />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Offer} element={<OfferScreenPreview />} />
          <Route path="*" element={<NotFoundScreenPreview />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
