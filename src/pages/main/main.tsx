import Header from '../../components/header/header';
import PlacesList from '../../components/places-list/places-list';
import Sorting from '../../components/sorting/sorting';
import Tabs from '../../components/tabs/tabs';
import Map from '../../components/map/map';
import { Offer, State } from '../../types/offer';
import { Nullable } from 'vitest';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

type MainProps = {
  offers: Offer[];
};

function Main({ offers }: MainProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);

  const currentCity = useSelector((state: State) => state.city);
  const dispatch = useDispatch();

  const filteredOffers = offers.filter(
    (offer) => offer.city.name === currentCity.name
  );

  const onCardHover = (offer?: Offer) => {
    setActiveOffer(offer || null);
  };

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {filteredOffers.length} places to stay in {currentCity.name}
              </b>
              <Sorting />
              <PlacesList offers={filteredOffers} onCardHover={onCardHover} />
            </section>
            <div className="cities__right-section">
              <Map
                offers={filteredOffers}
                city={currentCity}
                className="cities__map"
                activeOfferId={activeOffer?.id}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
