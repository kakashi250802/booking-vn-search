import queryString from 'query-string';
import _ from 'lodash';
import { toast } from 'react-toastify';

export const HOST = process.env.REACT_APP_API_URL

const _responseConfig = async (response) => {
  try {
    const responseData = await response.json();
    const {status} = responseData;
    if (status !== 404 || status !== 400  || status !== 429 || status !== 500) return {...responseData,status:200};
    const errorObj = responseData.errors ? responseData.errors[0] : {};
    const message = errorObj.error ?? 'Server error';
    toast.error(message,3000);
    throw Error(message);
  } catch (error) {
    throw Error(error?.message || 'Server error');
  }
};


const getService = async (params, body) => {
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

    const requestInit = { method: 'GET', headers };
    if (body) requestInit.body = JSON.stringify(body);
    let stringifyParams = `?`;
    if (params && !_.isEmpty(params)) {
      stringifyParams += queryString.stringify(params, { arrayFormat: 'bracket' });
    }

    const response = await fetch(`${HOST}${stringifyParams} site:bookingcare.vn`, requestInit);
    return await _responseConfig(response);
  } catch (error) {
    toast.e(error.message,3000);
    return {error: true};
  }
};

const configServices = {
  getService,
};

export default configServices;
