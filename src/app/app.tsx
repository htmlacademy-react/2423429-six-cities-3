import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppRoute, AuthorizationStatus } from '../const';

import PrivateRoute from '../components/private-route/private-route';
import Loader from '../components/loader/loader';

import { Offer, TReview } from '../types/offer';

import Main from '../pages/main/main';

const NotFoundPreview = lazy(
  () => import('../pages/page-not-found/page-not-found')
);
const AuthPreview = lazy(() => import('../pages/auth/auth'));

const FavoritesPreview = lazy(() => import('../pages/favorites/favorites'));
const OfferPreview = lazy(() => import('../pages/offer/offer'));

type AppProps = {
  offers: Offer[];
  reviews: TReview[];
  authorizationStatus: AuthorizationStatus;
};

function App({ offers, reviews, authorizationStatus }: AppProps): JSX.Element {
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
          <Route
            path={AppRoute.Offer}
            element={
              <OfferPreview
                reviews={reviews}
                isAuth={false}
                offer={{
                  id: '',
                  city: {
                    name: '',
                    location: {
                      latitude: 0,
                      longitude: 0,
                      zoom: 0,
                    },
                  },
                  title: '',
                  type: '',
                  price: 0,
                  previewImage: '',
                  location: {
                    latitude: 0,
                    longitude: 0,
                    zoom: 0,
                  },
                  isFavorite: false,
                  isPremium: false,
                  rating: 0,
                }}
                nearOffers={[]}
              />
            }
          />
          <Route path="*" element={<NotFoundPreview />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
