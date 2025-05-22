import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AppRoute, AuthorizationStatus } from '../const/const';

import PrivateRoute from '../components/private-route/private-route';
import Loader from '../components/loader/loader';

import { Offer, TReview } from '../types/offer';

import Main from '../pages/main/main';
import FullPageError from '../pages/full-page-error/full-page-error';
import { useAppSelector } from '../store';
import { getAuthorizationStatus } from '../store/user-process/selectors';
import {
  getHasError,
  getOffersLoadingStatus,
} from '../store/offers-process/selectors';

const NotFoundPreview = lazy(
  () => import('../pages/page-not-found/page-not-found')
);
const AuthPreview = lazy(() => import('../pages/login/login'));

const FavoritesPreview = lazy(() => import('../pages/favorites/favorites'));
const OfferPreview = lazy(() => import('../pages/offer/offer'));

type AppProps = {
  offers: Offer[];
  reviews: TReview[];
  nearOffers: Offer[];
  offerTemplate: Offer;
};

export default function App({ offers, offerTemplate }: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getOffersLoadingStatus);
  const isOffersError = useAppSelector(getHasError);

  if (
    authorizationStatus === AuthorizationStatus.Unknown ||
    isOffersDataLoading
  ) {
    return <Loader />;
  }

  if (isOffersError) {
    return <FullPageError />;
  }
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
            element={<OfferPreview isAuth={false} offer={offerTemplate} />}
          />
          <Route path="*" element={<NotFoundPreview />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
