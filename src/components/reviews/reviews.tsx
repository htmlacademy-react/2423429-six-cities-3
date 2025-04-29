import { FC } from 'react';
import ReviewsList from '../../components/reviews-list/reviews-list';
import ReviewForm from '../../components/review-form/review-form';
import { TReview } from '../../types/offer';

type ReviewsProps = {
  isAuth: boolean;
  reviews: TReview[];
};

const Reviews: FC<ReviewsProps> = ({ isAuth, reviews }) => {
  const handleReviewSubmit = (data: { rating: number; comment: string }) => {
    console.log('New review:', data);
  };

  return (
    <>
      <ReviewsList reviews={reviews} />
      {isAuth && <ReviewForm onSubmit={handleReviewSubmit} />}
    </>
  );
};

export default Reviews;
