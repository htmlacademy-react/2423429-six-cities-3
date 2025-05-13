type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Offer = {
  id: string;
  city: City;
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

export interface State {
  city: City;
  offers: Offer[];
}
