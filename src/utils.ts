import { RATING } from './const/const';

function calculateRating(placeOffer: { rating: number }): number {
  return (placeOffer.rating / RATING) * 100;
}

export default calculateRating;
