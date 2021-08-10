import axios from 'axios';
import { parseErrorResponse } from './error';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    return Promise.reject(parseErrorResponse(error.response));
  }
);

export default axiosInstance;
