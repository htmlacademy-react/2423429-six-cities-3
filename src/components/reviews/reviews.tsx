import { FC } from 'react';
import ReviewsList from '../../components/reviews-list/reviews-list';
import ReviewForm from '../../components/review-form/review-form';
import { TReview } from '../../types/review';

type ReviewsProps = {
  isAuth: boolean;
  reviews: TReview[];
  offerId: string;
};

const Reviews: FC<ReviewsProps> = ({ isAuth, reviews, offerId }) => (
  <section className="offer__reviews reviews">
    <ReviewsList reviews={reviews} />
    {isAuth && <ReviewForm offerId={offerId} />}
  </section>
);

export default Reviews;
