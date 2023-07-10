import axios from 'axios';
import queryString from 'query-string';
import { MarketingPlanInterface, MarketingPlanGetQueryInterface } from 'interfaces/marketing-plan';
import { GetQueryInterface } from '../../interfaces';

export const getMarketingPlans = async (query?: MarketingPlanGetQueryInterface) => {
  const response = await axios.get(`/api/marketing-plans${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMarketingPlan = async (marketingPlan: MarketingPlanInterface) => {
  const response = await axios.post('/api/marketing-plans', marketingPlan);
  return response.data;
};

export const updateMarketingPlanById = async (id: string, marketingPlan: MarketingPlanInterface) => {
  const response = await axios.put(`/api/marketing-plans/${id}`, marketingPlan);
  return response.data;
};

export const getMarketingPlanById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/marketing-plans/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMarketingPlanById = async (id: string) => {
  const response = await axios.delete(`/api/marketing-plans/${id}`);
  return response.data;
};
