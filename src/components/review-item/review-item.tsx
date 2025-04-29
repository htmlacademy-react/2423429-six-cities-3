import { TReview } from '../../types/offer';
import calculateRating from '../../utils';

type TReviewItemProps = {
  review: TReview;
};

export default function ReviewItem({ review }: TReviewItemProps): JSX.Element {
  const date = new Date(review.date);

  return (
    <li className="reviews__item" key={review.id}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt={`Avatar of ${review.user.name}`}
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
        {review.user.isPro && <span className="reviews__user-status">Pro</span>}
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span
              style={{
                width: `${calculateRating({ rating: review.rating })}%`,
              }}
            />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time
          className="reviews__time"
          dateTime={date.toISOString().slice(0, 10)}
        >
          {date.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </time>
      </div>
    </li>
  );
}
