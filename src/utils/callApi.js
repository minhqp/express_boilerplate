const axios = require('axios');
const camelCaseKeys = require('camelcase-keys');
const uuid = require('uuid');

const axiosInstance = axios.create({
  responseType: 'json',
  timeout: 10 * 1000,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.id = uuid.v4();
    const originalUrl = config.baseURL
      ? `${config.baseURL}${config.url}`
      : config.url;
    console.log(
      '[callApi.req]',
      `[${config.id}]`,
      `${config.method.toUpperCase()} - ${originalUrl}`,
    );
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const blackList = [];
    const { config } = response;
    const originalUrl = config.baseURL
      ? `${config.baseURL}${config.url}`
      : config.url;
    const isShowData = !blackList.includes(
      `${response.config.method.toUpperCase()} - ${originalUrl}`,
    );
    console.log(
      '[callApi.res.success]',
      `[${response.config.id}]`,
      isShowData ? JSON.stringify(response.data) : '',
    );
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return camelCaseKeys(response.data, { deep: true });
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { config, response, message } = error;

    if (response) {
      const { data } = response;
      const isShowData = !(
        data &&
        typeof data === 'string' &&
        data.match('<!DOCTYPE html>')
      );
      console.log(
        '[callApi.res.error]',
        `[${config.id}]`,
        data && isShowData ? JSON.stringify(response.data) : '',
      );
    } else {
      console.log('[callApi.res.error]', `[${config.id}]`, message);
    }

    return Promise.reject(error);
  },
);

module.exports = axiosInstance;
