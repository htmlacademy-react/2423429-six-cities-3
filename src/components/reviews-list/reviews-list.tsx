import { FC, Fragment } from 'react';
import { TReview } from '../../types/review';
import ReviewItem from '../../components/review-item/review-item';
import { MAX_REVIEWS_COUNT } from './const';

interface ReviewsListProps {
  reviews: TReview[];
}

const ReviewsList: FC<ReviewsListProps> = ({ reviews }) => {
  const displayedReviews = reviews.slice(0, MAX_REVIEWS_COUNT);

  return (
    <Fragment>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {displayedReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>
    </Fragment>
  );
};

export default ReviewsList;
