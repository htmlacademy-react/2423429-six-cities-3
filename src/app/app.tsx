import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppRoute, AuthorizationStatus } from '../const/const';

import PrivateRoute from '../components/private-route/private-route';
import Loader from '../components/loader/loader';

import { Offer, TReview } from '../types/offer';

import Main from '../pages/main/main';
import { useAppSelector } from '../store';

const NotFoundPreview = lazy(
  () => import('../pages/page-not-found/page-not-found')
);
const AuthPreview = lazy(() => import('../pages/auth/auth'));

const FavoritesPreview = lazy(() => import('../pages/favorites/favorites'));
const OfferPreview = lazy(() => import('../pages/offer/offer'));
const FullPageError = lazy(
  () => import('../pages/full-page-error/full-page-error')
);

type AppProps = {
  offers: Offer[];
  reviews: TReview[];
  nearOffers: Offer[];
  offerTemplate: Offer;
};

export default function App({
  offers,
  reviews,
  nearOffers,
  offerTemplate,
}: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );
  const isOffersDataLoading = useAppSelector(
    (state) => state.isOffersDataLoading
  );

  const isOffersError = useAppSelector((state) => state.isOffersError);

  if (
    authorizationStatus === AuthorizationStatus.Unknown ||
    isOffersDataLoading
  ) {
    return <Loader />;
  }

  // if (isOffersError) {
  //   return <FullPageError />;
  // }
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={AppRoute.Root} element={<Main />} />
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
                nearOffers={nearOffers}
                offer={offerTemplate}
              />
            }
          />
          <Route path="*" element={<NotFoundPreview />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
