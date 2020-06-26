import Axios from 'axios';
import {dispatch, getState} from '../redux';

const BASE_URL = 'http://alignminds.com/api';

const API = Axios.create({baseURL: BASE_URL});

API.interceptors.request.use(
  (request) => {
    const {
      authModel: {userData, isConnected},
    } = getState();
    if (userData && userData.token) {
      request.headers.Accept = 'application/json';
      request.headers.Authorization = `Bearer ${userData.token}`;
    }
    console.log('Request is:', request);

    if (!isConnected) {
      throw 'No Internet';
    }
    return request;
  },
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  (response) => {
    console.log('Response is: ', response);
    return response;
  },
  (error) => {
    const {
      languageModel: {
        commonText: {errorHeaderText, noInternetAlertContent, networkProblem},
      },
    } = getState();
    if (error === 'No Internet') {
      dispatch.alertModel.showFailureAlert({
        headerText: errorHeaderText,
        contentText: noInternetAlertContent,
        alertName: 'connectionError',
      });
    } else {
      dispatch.alertModel.showFailureAlert({
        headerText: errorHeaderText,
        contentText: networkProblem,
        alertName: 'connectionError',
      });
    }
    if (error.response) {
      if (error.response.status === 401) {
        dispatch.authModel.clearUserData();
      }
      console.log('error.response: ', error.response);
    } else {
      console.log('error.config: ', error.config);
    }
    return Promise.reject(error);
  },
);
export default API;
