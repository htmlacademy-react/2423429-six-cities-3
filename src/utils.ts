import { RATING } from "./const";


 function CalculateRating (placeOffer: { rating: number; }) {
    return (placeOffer.rating / RATING * 100)
}

export default CalculateRating;
