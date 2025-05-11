// src/components/places-card/PlacesCard.tsx
import { generatePath, Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { AppRoute } from '../../const';
import calculateRating from '../../utils';
import cn from 'classnames';

export type PlacesCardProps = {
  placeOffer: Offer;
  variant?: 'cities' | 'favorites';
  onCardHover?: (offer?: Offer) => void;
  onBookmarkToggle?: (offerId: number, isFavorite: boolean) => void;
};

const cardClasses = {
  cities: 'cities__card place-card',
  favorites: 'favorites__card place-card',
};

const imageWrapperClasses = {
  cities: 'cities__image-wrapper place-card__image-wrapper',
  favorites: 'favorites__image-wrapper place-card__image-wrapper',
};

const imageSizes = {
  cities: { width: 260, height: 200 },
  favorites: { width: 150, height: 110 },
};

function PlacesCard({
  placeOffer,
  onCardHover,
  onBookmarkToggle,
  variant = 'cities',
}: PlacesCardProps): JSX.Element {
  const containerClass = cardClasses[variant];
  const imageWrapperClass = imageWrapperClasses[variant];
  const { width, height } = imageSizes[variant];
  const { id, isFavorite } = placeOffer;

  return (
    <article
      className={containerClass}
      onMouseEnter={() => onCardHover?.(placeOffer)}
      onMouseLeave={() => onCardHover?.()}
    >
      {placeOffer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClass}>
        <Link to={generatePath(AppRoute.Offer, { id })}>
          <img
            className="place-card__image"
            src={placeOffer.previewImage}
            width={width}
            height={height}
            alt={placeOffer.title}
          />
        </Link>
      </div>

      <div
        className={cn(
          'place-card__info',
          variant === 'favorites' && 'favorites__card-info'
        )}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{placeOffer.price}</b>
            <span className="place-card__price-text">/ night</span>
          </div>
          <button
            className={cn(
              'place-card__bookmark-button button',
              isFavorite && 'place-card__bookmark-button--active'
            )}
            type="button"
            onClick={() => onBookmarkToggle?.(id, isFavorite)}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${calculateRating(placeOffer)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.Offer, { id })}>
            {placeOffer.title}
          </Link>
        </h2>
        <p className="place-card__type">{placeOffer.type}</p>
      </div>
    </article>
  );
}

export default PlacesCard;
