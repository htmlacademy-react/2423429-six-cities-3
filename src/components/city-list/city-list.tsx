import React from 'react';
import cn from 'classnames';
import { CityName } from '../../types/offer';

export type CityListProps = {
  cities: CityName[];

  selectedCity: string;

  onSelect: (city: string) => void;
};

const CityList: React.FC<CityListProps> = ({
  cities,
  selectedCity,
  onSelect,
}) => (
  <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => (
          <li className="locations__item" key={city}>
            <button
              type="button"
              className={cn('locations__item-link tabs__item', {
                'tabs__item--active': city === selectedCity,
              })}
              onClick={() => onSelect(city)}
            >
              <span>{city}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export default CityList;
