interface Response<T> {
    errCode: number;
    message: string;
    data: T;
  }
  
  // 对统一的响应约束进行别名管理
  type RES<T> = Promise<Response<T>>;

  interface TestPromise {
    msg:string
  }