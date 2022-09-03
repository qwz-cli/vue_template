import $axios from "./config";
export const testAPI = ():RES<TestPromise>=> $axios.get('/test')