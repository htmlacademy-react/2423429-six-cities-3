import { RATING } from './const';
import { Offer, SortType } from './types/offer';

export function calculateRating(placeOffer: { rating: number }): number {
  return (placeOffer.rating / RATING) * 100;
}
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getSortedOffers = (
  offers: Offer[],
  currentSortType: SortType
): Offer[] => {
  const sortedOffers = [...offers];

  switch (currentSortType) {
    case 'PriceLowToHigh':
      return sortedOffers.sort((a, b) => a.price - b.price);
    case 'PriceHighToLow':
      return sortedOffers.sort((a, b) => b.price - a.price);
    case 'TopRatedFirst':
      return sortedOffers.sort((a, b) => b.rating - a.rating);
    case 'Popular':
    default:
      return offers;
  }
};
