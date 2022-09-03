import axios from "axios";
import CONFIG from '@/utils/config'
const {BASE_URL} = CONFIG

axios.defaults.withCredentials = true;


// 封装 axios 默认配置
const $axios = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

// 设置请求拦截器
$axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 设置响应拦截器
$axios.interceptors.response.use(
  (res) => {
    // 响应拦截的状态码
    let arr = [200];

    if (!arr.includes(res.data.code)) {
      console.log("响应码不是200，被拦截了！！！", res);
      return false;
    }

    return res.data;
  },
  (error) => {
    console.log("报错了，我被拦截了！！！", error.response.data);
    return false
  }
);

export default $axios;