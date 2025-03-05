import { Offer } from '../types/offer';
import PlacesCard from './places-card';

type PlacesListProps = {
  offers: Offer[];
};

function PlacesList({ offers }: PlacesListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list">
      {offers.map((offer) => (
        <PlacesCard key={offer.id} placeOffer={offer} />
      ))}
    </div>
  );
}

export default PlacesList;
