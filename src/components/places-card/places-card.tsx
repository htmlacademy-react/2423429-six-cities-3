import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { AppRoute } from '../../const';

type PlacesCardProps = {
  placeOffer: Offer;
  onCardHover: (offer?: Offer) => void;
};

function PlacesCard({ placeOffer, onCardHover }: PlacesCardProps): JSX.Element {
  return (
    <Link to={`${AppRoute.Offer}:${placeOffer.id}`}>
      <article
        className="cities__card place-card"
        onMouseEnter={() => onCardHover(placeOffer)}
        onMouseLeave={() => onCardHover()}
      >
        {placeOffer.isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img
              className="place-card__image"
              src={placeOffer.previewImage}
              width="260"
              height="200"
              alt="Place image"
            />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">
                &euro;{placeOffer.price}
              </b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button
              className="place-card__bookmark-button button"
              type="button"
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>

              <span className="visually-hidden">
                {placeOffer.isFavorite ? 'In' : 'To'} bookmarks
              </span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: `${placeOffer.rating * 20}%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">{placeOffer.title}</a>
          </h2>
          <p className="place-card__type">{placeOffer.type}</p>
        </div>
      </article>
    </Link>
  );
}

export default PlacesCard;
