import { TReview } from '../types/offer';
import avatar from '../../markup/img/avatar.svg';

export const reviews: TReview[] = [
  {
    "id": "b67ddfd5-b953-4a30-8c8d-bd083cd6b62a",
    "date": "2019-05-08T14:13:56.569Z",
    "user": {
      "name": "Oliver Conner1",
      "avatarUrl": avatar,
      "isPro": false
    },
    "comment": "A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.",
    "rating": 4
  },
  {
    "id": "b67ddfd5-b953-4a30-8c8d-bd083cu6b62a",
    "date": "2019-05-08T14:13:56.569Z",
    "user": {
      "name": "Oliver Conner2",
      "avatarUrl": avatar,
      "isPro": true
    },
    "comment": "A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.",
    "rating": 3
  },
  {
    "id": "b67ddfd5-b953-4a30-8c8d-bd084cd6b62a",
    "date": "2019-05-08T14:13:56.569Z",
    "user": {
      "name": "Oliver Conner3",
      "avatarUrl": avatar,
      "isPro": true
    },
    "comment": "A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.",
    "rating": 2
  }
];
