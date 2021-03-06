/**
 * DNX Axios Request Wrapper
 * ---------------------
 *
 * @author  Sheharyar Naseer (@sheharyarn) & Adam (@deniapps)
 * @license MIT
 *
 */

import axios from "axios";

const getToken = () => {
  const deniUser =
    typeof localStorage !== "undefined"
      ? localStorage.getItem(process.env.NEXT_PUBLIC_USER_LC_KEY)
      : "";

  if (deniUser && deniUser !== "undefined") {
    const deniUserObj = JSON.parse(deniUser);
    return deniUserObj.accessToken ? deniUserObj.accessToken : "";
  }
  return "";
};

/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
});

/**
 * Request Wrapper with default success/error actions
 */
const request = function (options) {
  const token = getToken();
  if (options.headers) {
    options.headers.Authorization = token;
  } else {
    options.headers = {
      "content-type": "application/json",
      Authorization: token,
    };
  }
  const onSuccess = function (response) {
    console.debug("Request Successful!", response);
    return response.data;
  };

  const onError = function (error) {
    console.error("Request Failed:", error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error("Error Message:", error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default request;
