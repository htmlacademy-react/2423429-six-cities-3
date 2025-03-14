import { FC, Fragment, ReactEventHandler, useState, ChangeEvent } from 'react';

type TChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

const ratings = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
];

export const ReviewForm: FC = () => {
  const [review, setReview] = useState({ rating: 0, review: '' });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {ratings.map((rating) => (
          <Fragment key={rating.value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={rating.value}
              id={`${rating.value}-stars`}
              type="radio"
              onChange={handleChange}
            />
            <label
              htmlFor={`${rating.value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={rating.title}
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
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={review.review.length < 50 && review.rating === 0}
        >
          Submit
        </button>
      </div>
    </form>
  );
};
