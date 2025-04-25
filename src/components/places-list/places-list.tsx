import { Offer } from '../../types/offer';
import PlacesCard from '../places-card/places-card';

type PlacesListProps = {
  offers: Offer[];
  onCardHover?: (offer?: Offer) => void;
  className?: string;
};

function PlacesList({
  offers,
  onCardHover,
  className = 'cities__places-list places__list',
}: PlacesListProps): JSX.Element {
  return (
    <div className={className}>
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
