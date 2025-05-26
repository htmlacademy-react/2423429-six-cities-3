import { Fragment, useState, FormEvent, ChangeEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../store';
import { getPostError, getPosting } from '../../store/comments/selectors';
import { postComment } from '../../store/comments/comments-slice';

const RATINGS = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
] as const;

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
    formData.comment.trim().length >= 50 &&
    formData.comment.trim().length <= 300;

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const target = evt.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    if (!isValid || isPosting) {
      return;
    }

    try {
      await dispatch(
        postComment({
          offerId,
          comment: formData.comment.trim(),
          rating: formData.rating,
        })
      ).unwrap();

      setFormData({ rating: 0, comment: '' });
    } catch (err) {
      // Ошибка уже обрабатывается через postError
    }
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
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
