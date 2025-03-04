import Header from '../../components/header';
import Places from '../../components/places';
import Tabs from '../../components/tabs';
import { Offer } from '../../types/offer';

type MainProps = {
  placesCount: number;
  offers: Offer[]
}

function Main({placesCount, offers}: MainProps): JSX.Element {
  

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs />
        <div className="cities">
          <div className="cities__places-container container">
            <Places placesCount={placesCount} offers={offers} />
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
