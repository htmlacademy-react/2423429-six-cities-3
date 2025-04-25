import { TReview } from '../../types/offer';
import ReviewItem from '../review-item/review-item';

type TReviewsListProps = {
  reviews: TReview[];
};

export default function ReviewsList({
  reviews,
}: TReviewsListProps): JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
}
