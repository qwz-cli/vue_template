import $axios, { get ,post} from "./config";

// export const testAPI = ():RES<TestPromise>=> $axios.get('/test')
export const testAPI = (data:PostLoginReq)=>post("/test",data);
