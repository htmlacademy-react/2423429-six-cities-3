import { FC } from 'react';
import ReviewsList from '../../components/reviews-list/reviews-list';
import ReviewForm from '../../components/review-form/review-form';
import { TReview } from '../../types/review';

type ReviewsProps = {
  isAuth: boolean;
  reviews: TReview[];
};

const Reviews: FC<ReviewsProps> = ({ isAuth, reviews }) => {
  const handleReviewSubmit = (data: { rating: number; comment: string }) => {
    console.log('New review:', data);
  };

  return (
    <section className="offer__reviews reviews">
      <ReviewsList reviews={reviews} />
      {isAuth && <ReviewForm onSubmit={handleReviewSubmit} />}
    </section>
  );
};

export default Reviews;
