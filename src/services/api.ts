// src/services/api.ts
import axios, { AxiosResponse } from 'axios';
import { Offer, TReview } from '../types/offer';

const API_BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchOffersApi = (): Promise<AxiosResponse<Offer[]>> =>
  apiClient.get<Offer[]>('/offers');

export const fetchOfferApi = (id: number): Promise<AxiosResponse<Offer>> =>
  apiClient.get<Offer>(`/offers/${id}`);

export const fetchReviewsApi = (
  id: number
): Promise<AxiosResponse<TReview[]>> =>
  apiClient.get<TReview[]>(`/offers/${id}/reviews`);

export const fetchNearOffersApi = (
  id: number
): Promise<AxiosResponse<Offer[]>> =>
  apiClient.get<Offer[]>(`/offers/${id}/nearby`);
