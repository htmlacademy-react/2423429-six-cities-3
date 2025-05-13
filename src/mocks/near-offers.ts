import { Offer } from '../types/offer';

export const nearOffers: Offer[] = [
  {
    id: '3c8121de-0066-4aed-92ab-afd7e09aeb51',
    title: 'Tile House',
    type: 'room',
    price: 201,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/17.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.2,
  },
  {
    id: '6935e24d-a29d-418b-9615-b5c29fc342d6',
    title: 'The Joshua Tree House',
    type: 'house',
    price: 907,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/2.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.858610000000006,
      longitude: 2.330499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.6,
  },
  {
    id: 'd246b9f5-adf2-41a1-8bfd-9b5139932a15',
    title: 'The Joshua Tree House',
    type: 'house',
    price: 741,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/7.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.335499,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.3,
  },
];
