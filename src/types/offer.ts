
type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type HostType = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type City = {
  name: string;
  location: Location;
};

export type BaseOffer = {
  id: string;
  city: City;
  title: string;
  type: string;
  price: number;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type Offer = BaseOffer & {
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: HostType;
  images: string[];
  description: string;
};

export type ShortOffer = BaseOffer; // Для списка предложений

export type Offers = Offer[];

export type SortType =
  | 'Popular'
  | 'PriceLowToHigh'
  | 'PriceHighToLow'
  | 'TopRatedFirst';
