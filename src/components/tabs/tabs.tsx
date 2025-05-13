import { useDispatch, useSelector } from 'react-redux';
import { changeCity } from '../../store/action'; // Убедитесь в правильности пути
import { CITIES } from '../../const/cities';
import { State } from '../../types/offer';

function Tabs(): JSX.Element {
  const currentCity = useSelector((state: State) => state.city);
  const dispatch = useDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li key={city.name} className="locations__item">
              <a
                className={`locations__item-link tabs__item ${
                  city.name === currentCity.name ? 'tabs__item--active' : ''
                }`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(changeCity(city.name));
                }}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
