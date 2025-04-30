import { Offer } from "../types/offer"

export const offerTemplate: Offer = {
    id: '',
    city: {
      name: '',
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0
      }
    },
    title: '',
    type: '',
    price: 0,
    previewImage: '',
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0
    },
    isFavorite: false,
    isPremium: false,
    rating: 0
  }

