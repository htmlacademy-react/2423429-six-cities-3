import ReviewsList from '../reviews/reviews';
import ReviewForm from '../review-form/review-form';
import { TReview } from '../../types/offer';

type TReviewsProps = {
  isAuth: boolean;
  reviews: TReview[];
};

export function Reviews({ isAuth, reviews }: TReviewsProps): JSX.Element {
  return (
    <>
      <ReviewsList reviews={reviews} />
      {isAuth && <ReviewForm />}
    </>
  );
}
