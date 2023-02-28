import axios from "axios";
import CONFIG from "@/utils/config";
const { BASE_URL } = CONFIG;

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
    return false;
  }
);

export default $axios;

// 常用函数
/**
 *
 * @param {string} url 请求地址
 * @param {object} data 请求体数据
 * @param {object} params 地址栏数据
 * @returns promise
 */
export function post(url: string, data = {}, params = {}) {
  return $axios({
    method: "post",
    url,
    data,
    params,
  });
}

/**
 * @param {string} url 请求地址
 * @param {object} params 地址栏数据
 */
export function get(url: string, params = {}) {
  return $axios({
    method: "get",
    url,
    params,
  });
}

/**
 * @param {string} url 请求地址
 * @param {object} data 请求体数据
 * @param {object} params 地址栏数据
 */
export function put(url: string, data = {}, params = {}) {
  return $axios({
    method: "put",
    url,
    params,
    data,
  });
}

/**
 * @param {string} url 请求地址
 * @param {object} params 地址栏数据
 */
export function _delete(url: string, params = {}) {
  return $axios({
    method: "delete",
    url,
    params,
  });
}
