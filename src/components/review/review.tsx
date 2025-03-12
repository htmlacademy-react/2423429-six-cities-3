import { ReviewForm } from '../review-form/review-form';
import { ReviewsList } from '../review-list/review-list';
type TReviewsProps = {
  isAuth: boolean;
};

export function Reviews({ isAuth }: TReviewsProps): JSX.Element {
  return (
    <>
      <ReviewsList />
      {isAuth && <ReviewForm />}
    </>
  );
}
