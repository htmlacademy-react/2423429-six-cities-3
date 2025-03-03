import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppRoute, AuthorizationStatus } from '../const';
import PrivateRoute from '../components/private-route/private-route';

import { offers } from '../mocks/offers';
import { Offer } from '../types/offer';

//Импортируем главный экран
import Main from '../pages/main/main';

// Динамически импортируем остальные экраны
const NotFoundScreenPreview = lazy(() => import ('../pages/page-not-found/page-not-found')) ;
const AuthScreenPreview = lazy(() => import ('../pages/auth-screen/auth-screen')) ;
const FavoritesEmptyPreview = lazy(() => import ('../pages/favorites/favorites-empty')) ;
const FavoritesPreview = lazy(() => import ('../pages/favorites/favorites')) ;
const OfferScreenPreview = lazy(() => import ('../pages/offer/offer')) ;

type AppScreenProps = {
  placesCount: number;
  offers: Offer[];
}

function App({placesCount, offers}: AppScreenProps): JSX.Element {
  const listingOffer = offers;
  console.log(listingOffer);
  
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading....</div>}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<Main placesCount={placesCount} />}
          />
          <Route
            path={AppRoute.Login}
            element={<AuthScreenPreview />}
          />
          <Route
            path={AppRoute.Favorites}
            element = {
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritesPreview />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.FavoritesEmpty}
            element = {<FavoritesEmptyPreview />}
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferScreenPreview />}
          />
          <Route
            path="*"
            element={<NotFoundScreenPreview />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
