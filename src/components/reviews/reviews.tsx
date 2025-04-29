import { FormEvent, Fragment, useState } from 'react';
import { TReview } from '../../types/offer';
import ReviewItem from '../review-item/review-item';

type ReviewsProps = {
  reviews: TReview[];
};

export default function Reviews({ reviews }: ReviewsProps): JSX.Element {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');

  const isSubmitEnabled = rating !== null && comment.length >= 50;

  const handleRatingChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleCommentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (!isSubmitEnabled) {
      return;
    }
    // TODO: отправить {rating, comment} на сервер
    console.log({ rating, comment });
    // сбросим форму
    setRating(null);
    setComment('');
  };

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>

      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </ul>

      <form className="reviews__form form" onSubmit={handleSubmit}>
        <label className="reviews__label form__label" htmlFor="review">
          Your review
        </label>

        <div className="reviews__rating-form form__rating">
          {[5, 4, 3, 2, 1].map((star) => (
            <Fragment key={star}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={star}
                id={`${star}-stars`}
                type="radio"
                checked={rating === star}
                onChange={handleRatingChange}
              />
              <label
                htmlFor={`${star}-stars`}
                className="reviews__rating-label form__rating-label"
                title={
                  star === 5
                    ? 'perfect'
                    : star === 4
                    ? 'good'
                    : star === 3
                    ? 'not bad'
                    : star === 2
                    ? 'badly'
                    : 'terribly'
                }
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))}
        </div>

        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          value={comment}
          onChange={handleCommentChange}
        ></textarea>

        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set{' '}
            <span className="reviews__star">rating</span> and describe your stay
            with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={!isSubmitEnabled}
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
