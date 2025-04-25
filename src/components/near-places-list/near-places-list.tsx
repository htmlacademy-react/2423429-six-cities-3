import PlacesList from '../places-list/places-list';
import PlaceCard from '../places-card/places-card';
import { Offer } from '../../types/offer';

type NearPlacesListProps = {
  offers: Offer[];
};

export default function NearPlacesList({
  offers,
}: NearPlacesListProps): JSX.Element {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <PlacesList className="near-places__list places__list">
        {offers.map((off) => (
          <PlaceCard
            key={off.id}
            offer={off}
            wrapperClass="near-places__card"
          />
        ))}
      </PlacesList>
    </section>
  );
}
