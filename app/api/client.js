import { create } from 'apisauce';
import cache from '../utility/cache';
import authStorage from '../utility/storage';

const apiClient = create({
    baseURL: "https://newsapi.org/v2",
    params: {
      'apiKey': 'bdf429a6e72f426992bd29b3498bc39e',
    },
});

apiClient.addAsyncRequestTransform( async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["x-auth-token"] = authToken;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default apiClient;