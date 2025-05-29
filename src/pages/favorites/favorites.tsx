import { useEffect } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import PlacesCard from '../../components/places-card/places-card';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchFavorites } from '../../store/favorites/favorite-slice';
import {
  getFavorites,
  getFavoritesLoadingStatus,
} from '../../store/favorites/selectors';
import { Offer } from '../../types/offer';
import Loader from '../../components/loader/loader';
import { FavoritesEmpty } from '../favorites-empty/favorites-empty';

function Favorites(): JSX.Element {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getFavorites);
  const isLoading = useAppSelector(getFavoritesLoadingStatus);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (!favorites.length) {
    return <FavoritesEmpty />;
  }

  const groupedOffers = favorites.reduce(
    (acc: Record<string, Offer[]>, offer) => {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
      return acc;
    },
    {}
  );

  const cities = Object.keys(groupedOffers);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.map((city) => (
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {groupedOffers[city].map((offer) => (
                      <PlacesCard
                        key={offer.id}
                        placeOffer={offer}
                        variant="favorites"
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Favorites;
