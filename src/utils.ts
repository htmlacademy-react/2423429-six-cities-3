import { RATING } from "./const";


 function RatingCalculation (placeOffer: { rating: number; }) {
    return (placeOffer.rating / RATING * 100)
}

export default RatingCalculation;
