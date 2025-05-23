import { Offer } from '../../types/offer';
import PlacesList from '../places-list/places-list';

type NearPlacesListProps = {
  offers: Offer[];
  className?: string;
};

export default function NearPlacesList({
  offers,
  className = 'near-places__list places__list',
}: NearPlacesListProps): JSX.Element {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">
          Other places in the neighbourhood
        </h2>
        <PlacesList offers={offers} className={className} />
      </section>
    </div>
  );
}
