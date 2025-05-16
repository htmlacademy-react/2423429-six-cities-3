import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SortType } from '../../types/offer';
import { setSortType } from '../../store/action';
import { SORT_TYPES } from '../../const/const';
import { State, useAppSelector } from '../../store';

function Sorting(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const currentSortType = useAppSelector((state: State) => state.sortType);
  const dispatch = useDispatch();

  const handleSortClick = (type: SortType) => {
    dispatch(setSortType(type));
    setIsOpen(false);
  };

  const toggleSortList = () => {
    setIsOpen(!isOpen);
  };

  const getSortTypeText = (type: string) => {
    switch (type) {
      case 'PriceLowToHigh':
        return 'Price: low to high';
      case 'PriceHighToLow':
        return 'Price: high to low';
      case 'TopRatedFirst':
        return 'Top rated first';
      default:
        return 'Popular';
    }
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleSortList}
      >
        {getSortTypeText(currentSortType)}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpen ? 'places__options--opened' : ''
        }`}
      >
        {SORT_TYPES.map((type) => (
          <li
            key={type}
            className={`places__option ${
              currentSortType === type ? 'places__option--active' : ''
            }`}
            tabIndex={0}
            onClick={() => handleSortClick(type)}
          >
            {getSortTypeText(type)}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
