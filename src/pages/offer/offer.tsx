import { Navigate, useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import NearPlacesList from '../../components/near-places-list/near-places-list';
import Reviews from '../../components/reviews/reviews';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  getNearbyError,
  getNearbyLoadingStatus,
  getNearOffers,
} from '../../store/nearby-offers/selectors.ts.ts';
import { useEffect } from 'react';
import { fetchNearbyOffers } from '../../store/nearby-offers/nearby-offers-slice.ts';
import {
  getComments,
  getCommentsError,
  getCommentsLoading,
} from '../../store/comments/selectors.ts';
import { fetchComments } from '../../store/comments/comments-slice.ts';
import Loader from '../../components/loader/loader.tsx';
import { fetchOffer } from '../../store/offer/offer-slice.ts';
import {
  getOffer,
  getOfferError,
  getOfferErrorStatus,
  getOfferLoadingStatus,
} from '../../store/offer/selectors.ts';

import FullPageError from '../full-page-error/full-page-error.tsx';
import { calculateRating } from '../../utils.ts';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import cn from 'classnames';
import { toggleFavorite } from '../../store/favorites/favorite-slice.ts';
import {
  getChangingFavoriteStatus,
  getFavorites,
} from '../../store/favorites/selectors.ts';
import { clearErrorAction, setError } from '../../store/app/app-slice.ts';
import { getAuthorizationStatus } from '../../store/user/selectors.ts';

type OfferScreenProps = {
  isAuth: boolean;
};

export default function OfferScreen({ isAuth }: OfferScreenProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const offer = useAppSelector(getOffer);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const offerLoadingStatus = useAppSelector(getOfferLoadingStatus);
  const offerError = useAppSelector(getOfferError);
  const offerErrorStatus = useAppSelector(getOfferErrorStatus);

  const nearOffers = useAppSelector(getNearOffers);
  const nearbyLoadingStatus = useAppSelector(getNearbyLoadingStatus);
  const nearbyError = useAppSelector(getNearbyError);

  const comments = useAppSelector(getComments);
  const commentsLoading = useAppSelector(getCommentsLoading);
  const commentsError = useAppSelector(getCommentsError);

  const isChangingStatus = useAppSelector(getChangingFavoriteStatus);
  const favoriteOffers = useAppSelector(getFavorites);
  const isFavorite = favoriteOffers.some((off) => off.id === id);

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchComments(id));
    }
  }, [dispatch, id]);

  const handleBookmarkClick = () => {
    if (offer) {
      if (authorizationStatus !== AuthorizationStatus.Auth) {
        dispatch(setError('You need to log in to add to favorites'));
        dispatch(clearErrorAction());
        return;
      }
      const status = isFavorite ? 0 : 1;
      dispatch(
        toggleFavorite({
          offerId: offer.id,
          status: status,
        })
      );
    }
  };

  if (offerLoadingStatus || nearbyLoadingStatus || commentsLoading) {
    return <Loader />;
  }

  if (offerErrorStatus === 404) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  if (offerError || nearbyError || commentsError || !offer) {
    return <FullPageError />;
  }

  const ratingWidth = `${Math.round(calculateRating(offer))}%`;
  const { host, images, goods } = offer;

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.slice(0, 6).map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img
                    className="offer__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>

                <button
                  className={cn(
                    'offer__bookmark-button button',
                    isFavorite && 'offer__bookmark-button--active'
                  )}
                  type="button"
                  onClick={handleBookmarkClick}
                  disabled={isChangingStatus}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingWidth }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper ${
                      host.isPro ? 'offer__avatar-wrapper--pro' : ''
                    } user__avatar-wrapper`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <Reviews isAuth={isAuth} reviews={comments} offerId={offer.id} />
            </div>
          </div>
          <section className="offer__map map">
            <Map
              className="offer__map"
              offers={[offer, ...nearOffers]}
              activeOfferId={offer.id}
            />
          </section>
        </section>

        <NearPlacesList
          offers={nearOffers}
          className="near-places__list places__list"
        />
      </main>
    </div>
  );
}
