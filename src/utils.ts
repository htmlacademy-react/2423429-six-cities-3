import { RATING } from './const';

function calculateRating(placeOffer: { rating: number }): number {
  return (placeOffer.rating / RATING) * 100;
}

export default calculateRating;
