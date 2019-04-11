import axios from 'axios';
import { message } from 'antd'

const baseURL = 'http://localhost:3000'

const instance = axios.create({
  baseURL: baseURL,
  timeout: 3000
});

instance.interceptors.request.use(config => {
  // token 携带和刷新
  return config;
});

instance.interceptors.response.use(response => {
  const { status, data } = response
  if (status >= 200 && status < 500) {
      return Promise.resolve(data)
  } else {
    message.destroy()
    message.error(data && data.message || '服务器错误')
    return Promise.reject(response)
  }
});

export default instance;