import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppRoute, AuthorizationStatus } from '../const';
import PrivateRoute from '../components/private-route/private-route';
//Импортируем главный экран
import Main from '../pages/main/main';

// Динамически импортируем остальные экраны
const NotFoundScreenPreview = lazy(() => import ('../pages/notFoundScreen/pageNotFound')) ;
const AuthScreenPreview = lazy(() => import ('../pages/login/authScreen')) ;
const FavoritesEmptyPreview = lazy(() => import ('../pages/favorites/favorites-empty')) ;
const FavoritesPreview = lazy(() => import ('../pages/favorites/favorites')) ;
const OfferScreenPreview = lazy(() => import ('../pages/offer/offer')) ;


type AppScreenProps = {
  placesCount: number;
}

function App({placesCount}: AppScreenProps): JSX.Element {
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
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <AuthScreenPreview />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element = {<FavoritesPreview />}
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
