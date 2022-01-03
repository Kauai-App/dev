import axios from 'axios';
import { ACCEPT, SL_BUSINESS_UNIT, CONTENT_TYPE } from './Constants';

const CHEETAH_API = axios.create({ baseURL: process.env.CHEETAH_URL });
CHEETAH_API.interceptors.request.use((req) => {
  req.headers['Accept'] = ACCEPT;
  req.headers['SL-Business-Unit'] = SL_BUSINESS_UNIT;
  req.headers['Content-Type'] = CONTENT_TYPE;
  return req;
});

const CHEETAH_ACCESS_TOKEN_API = axios.create({ baseURL: process.env.CHEETAH_URL });
CHEETAH_API.interceptors.request.use((req) => {
  req.headers['Accept'] = ACCEPT;
  return req;
});

/* GIFTING */
export const fetchMessages = (access_token: string) => CHEETAH_ACCESS_TOKEN_API.get(`/api/messages?access_token=${access_token}`)
export const fetchMessage = (access_token: string, message_id: string) => CHEETAH_ACCESS_TOKEN_API.get(`/api/messages/${message_id}?access_token=${access_token}`)