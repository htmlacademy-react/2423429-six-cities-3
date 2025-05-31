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

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatReviewDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });
};
