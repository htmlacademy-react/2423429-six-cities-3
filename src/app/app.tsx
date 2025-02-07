import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { AppRoute } from '../const';

import Main from '../pages/main/main';
import NotFoundScreen from '../pages/notFoundScreen/pageNotFound';
import AuthScreen from '../pages/login/authScreen';
import FavoritesEmpty from '../pages/favorites/favorites-empty';
import Favorites from '../pages/favorites/favorites';
import OfferScreen from '../pages/offer/offer';

type AppScreenProps = {
  placesCount: number;
}

function App({placesCount}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Main placesCount={placesCount} />}
        />
        <Route
          path={AppRoute.Login}
          element={<AuthScreen />}
        />
        <Route
          path={AppRoute.Favorites}
          element = {<Favorites />}
        />
        <Route
          path={AppRoute.FavoritesEmpty}
          element = {<FavoritesEmpty />}
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen />}
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
