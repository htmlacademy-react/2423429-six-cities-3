import { Offer } from '../../types/offer';
import PlacesCard from '../places-card/places-card';

type PlacesListProps = {
  offers: Offer[];
  onCardHover?: (offer?: Offer) => void;
};

function PlacesList({ offers, onCardHover }: PlacesListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list">
      {offers.map((offer) => (
        <PlacesCard
          key={offer.id}
          placeOffer={offer}
          onCardHover={onCardHover}
        />
      ))}
    </div>
  );
}

export default PlacesList;
