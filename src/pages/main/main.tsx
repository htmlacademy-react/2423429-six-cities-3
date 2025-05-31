import Header from '../../components/header/header';
import PlacesList from '../../components/places-list/places-list';
import Sorting from '../../components/sorting/sorting';
import Tabs from '../../components/tabs/tabs';
import Map from '../../components/map/map';
import { Offer } from '../../types/offer';
import { Nullable } from 'vitest';
import { useState } from 'react';
import MainEmpty from '../../components/main-empty/main-empty';
import cn from 'classnames';
import { useAppSelector } from '../../store';
import { capitalizeFirstLetter, getSortedOffers } from '../../utils';
import { getCity, getOffers, getSortType } from '../../store/offers/selectors';

function Main(): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);

  const currentCity = useAppSelector(getCity);
  const currentOffers = useAppSelector(getOffers);
  const currentSortType = useAppSelector(getSortType);

  const validCityName = capitalizeFirstLetter(currentCity.name);

  const filteredOffers = currentOffers.filter(
    (offer: Offer) => offer.city.name === currentCity.name
  );

  const sortedOffers = getSortedOffers(filteredOffers, currentSortType);

  const hasOffers = sortedOffers.length > 0;

  const getPlacesText = (count: number) => (count === 1 ? 'place' : 'places');

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
                  {sortedOffers.length} {getPlacesText(sortedOffers.length)} to
                  stay in {validCityName}
                </b>
                <Sorting />
                <PlacesList offers={sortedOffers} onCardHover={onCardHover} />
              </section>
              <div className="cities__right-section">
                <Map
                  offers={sortedOffers}
                  className="cities__map"
                  activeOfferId={activeOffer?.id}
                  key={validCityName}
                />
              </div>
            </div>
          ) : (
            <MainEmpty currentCity={validCityName} />
          )}
        </div>
      </main>
    </div>
  );
}

export default Main;
