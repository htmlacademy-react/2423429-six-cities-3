import { FC, Fragment } from 'react';
import { TReview } from '../../types/review';
import ReviewItem from '../../components/review-item/review-item';

interface ReviewsListProps {
  reviews: TReview[];
}

const ReviewsList: FC<ReviewsListProps> = ({ reviews }) => (
  <Fragment>
    <h2 className="reviews__title">
      Reviews · <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  </Fragment>
);

export default ReviewsList;
