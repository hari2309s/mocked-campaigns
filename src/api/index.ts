import { API_BASE_URL } from '../constants';

export const getOverviewApi = async () => {
  return await fetch(`${API_BASE_URL}/overview`)
    .then(data => data.json())
    .catch(error => Promise.reject(error));
};

export const getCampaignsApi = async () => {
  return await fetch(`${API_BASE_URL}/campaigns`)
    .then(data => data.json())
    .catch(error => Promise.reject(error));
};
