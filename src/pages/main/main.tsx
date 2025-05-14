import Header from '../../components/header/header';
import PlacesList from '../../components/places-list/places-list';
import Sorting from '../../components/sorting/sorting';
import Tabs from '../../components/tabs/tabs';
import Map from '../../components/map/map';
import { Offer, State } from '../../types/offer';
import { Nullable } from 'vitest';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import MainEmpty from '../../components/main-empty/main-empty';
import cn from 'classnames';

type MainProps = {
  offers: Offer[];
};

function Main({ offers }: MainProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);

  const currentCity = useSelector((state: State) => state.city);

  const filteredOffers = offers.filter(
    (offer) => offer.city.name === currentCity.name
  );

  const hasOffers = filteredOffers.length > 0;

  const onCardHover = (offer?: Offer) => {
    setActiveOffer(offer || null);
  };

  const mainClass = cn('page__main', 'page__main--index', {
    'page__main--index-empty': !hasOffers,
  });

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={mainClass}>
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />
        <div className="cities">
          {hasOffers ? (
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
                  key={currentCity.name}
                />
              </div>
            </div>
          ) : (
            <MainEmpty currentCity={currentCity.name} />
          )}
        </div>
      </main>
    </div>
  );
}

export default Main;
