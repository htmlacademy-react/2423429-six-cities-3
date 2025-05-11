import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { fetchOffers, setCity } from '../../store/offersSlice';

import CityList from '../../components/city-list/city-list';
import PlacesList from '../../components/places-list/places-list';
import MapView from '../../components/map/map';
import Loader from '../../components/loader/loader';
import { CITIES } from '../../const';

const Main: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const city = useSelector((state: RootState) => state.offers.city);
  const items = useSelector((state: RootState) => state.offers.items);
  const isLoading = useSelector((state: RootState) => state.offers.isLoading);
  const error = useSelector((state: RootState) => state.offers.error);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const offersByCity = items.filter((offer) => offer.city === city);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="page page--main page--gray">
      <CityList
        cities={CITIES}
        selectedCity={city}
        onSelect={(newCity) => dispatch(setCity(newCity))}
      />
      <main className="page__main page__main--index">
        <PlacesList offers={offersByCity} />
        <MapView offers={offersByCity} className={''} />
      </main>
    </div>
  );
};

export default Main;
