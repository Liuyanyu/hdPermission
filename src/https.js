import axios from "axios";
import qs from "qs";

// 实例对象
let BASE_URL = process.env.BASE_URL;
let instance = axios.create({
  baseURL: BASE_URL,
  timeout: 6000
})
instance.defaults.withCredentials = true;
//POST传参序列化(添加请求拦截器)
instance.interceptors.request.use(
  config => {
    //在发送请求之前做某件事
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    console.log(error)
    return Promise.reject(error);
  }
);

//返回状态判断(添加响应拦截器)
instance.interceptors.response.use(
  response => {
    const status = Number(response.status) || 200;
    const message = response.data.msg;
    if (status !== 200 || response.data.code === 1) {
      return Promise.reject(new Error(message));
    }

    return response;
  },
  error => {
    return Promise.reject(new Error(error));
  }
);
export default instance;