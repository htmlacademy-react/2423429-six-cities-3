import { Fragment, useState, ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../store';
import { getPostError, getPosting } from '../../store/comments/selectors';
import { postComment } from '../../store/comments/comments-slice';
import { MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH, RATINGS } from './const';

interface ReviewFormProps {
  offerId: string;
}

export default function ReviewForm({ offerId }: ReviewFormProps) {
  const dispatch = useAppDispatch();
  const isPosting = useAppSelector(getPosting);
  const postError = useAppSelector(getPostError);

  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
  });

  const isValid =
    formData.rating > 0 &&
    formData.comment.trim().length >= MIN_COMMENT_LENGTH &&
    formData.comment.trim().length <= MAX_COMMENT_LENGTH;

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = evt.target;
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    if (!isValid || isPosting) {
      return;
    }

    dispatch(
      postComment({
        offerId,
        comment: formData.comment.trim(),
        rating: formData.rating,
      })
    )
      .unwrap()
      .then(() => {
        setFormData({ rating: 0, comment: '' });
      })
      .catch(() => {});
  };

  return (
    <form
      className="reviews__form form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map(({ value, title }) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={formData.rating === value}
              onChange={handleChange}
              disabled={isPosting}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay…"
        value={formData.comment}
        onChange={handleChange}
        maxLength={300}
        disabled={isPosting}
      />

      <div className="reviews__button-wrapper">
        {postError && <div className="reviews__error-message">{postError}</div>}
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || isPosting}
        >
          {isPosting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
