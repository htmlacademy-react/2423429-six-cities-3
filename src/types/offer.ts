type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type Offer = {
  id: string;
  city: {
    name: string;
    location: Location;
  };
  title: string;
  type: string;
  price: number;
  previewImage: string;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type TReview = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
};
