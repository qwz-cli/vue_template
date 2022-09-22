/**
 * TODO: 表单检验规则
 */

// 非空检验
export const notNull_judge = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("不能为空"));
  } else {
    callback();
  }
};
// 检验ip
export const ip_judge = (rule: any, value: any, callback: any) => {
  let reg =
    /((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))/;

  if (!reg.test(value)) {
    callback(new Error("请输入正确的ip地址"));
  } else {
    callback();
  }
};
