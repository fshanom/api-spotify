/* eslint-disable no-console */
import axios from "axios";
import axiosRetry, { isRetryableError } from "axios-retry";
import { Agent } from "https";

const defaultTimeout = 300000;
const defaultRetries = 3;
const timeout = Number(process.env.AXIOS_TIMEOUT) || defaultTimeout;
const retries = Number(process.env.AXIOS_RETRIES) || defaultRetries;
const msToSecs = 1000;
const secsMultiplier = 2;

const retryDelay = (retryNumber = 0) => {
  console.log(`Axios retry attempt: ${retryNumber}`);
  const seconds = secsMultiplier ** retryNumber * msToSecs;
  const randomMs = msToSecs * Math.random();
  return seconds + randomMs;
};

axiosRetry(axios, {
  retries,
  retryDelay,
  // retry on Network Error & 5xx responses
  retryCondition: isRetryableError,
});

export default async function httpRequest({ method, url, headers, body }) {
  try {
    const config = {
      method,
      url,
      timeout,
      headers,
      data: body,
      httpsAgent: new Agent({
        rejectUnauthorized: false,
        keepAlive: true,
        timeout,
      }),
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    };
    return await axios(config);
  } catch (error) {
    throw new Error(`Axios request error ${error} after ${retries} retries`);
  }
};
