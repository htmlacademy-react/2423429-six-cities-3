import { FC } from 'react';
import { TReview } from '../../types/offer';
import ReviewItem from '../../components/review-item/review-item';

interface ReviewsListProps {
  reviews: TReview[];
}

const ReviewsList: FC<ReviewsListProps> = ({ reviews }) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
      Reviews · <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  </section>
);

export default ReviewsList;
