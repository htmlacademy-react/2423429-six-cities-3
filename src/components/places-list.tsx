import { useState } from 'react';
import { Offer } from '../types/offer';
import PlacesCard from './places-card';
import { Nullable } from 'vitest';

type PlacesListProps = {
  offers: Offer[];
};

function PlacesList({ offers }: PlacesListProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);
  const handleHover = (offer?: Offer) => {
    setActiveOffer(offer || null);
  };
  return (
    <div className="cities__places-list places__list">
      {offers.map((offer) => (
        <PlacesCard
          key={offer.id}
          placeOffer={offer}
          handleHover={handleHover}
        />
      ))}
    </div>
  );
}

export default PlacesList;
