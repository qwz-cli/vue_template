/**
 * TODO: 表单检验规则
 */

// !非空检验
export const notNull_judge = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("不能为空"));
  } else {
    callback();
  }
};

// !检验ip
export const ip_judge = (rule: any, value: any, callback: any) => {
  let reg =
    /((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))/;

  if (!reg.test(value)) {
    callback(new Error("请输入正确的ip地址"));
  } else {
    callback();
  }
};

// !检验邮箱
export const email_judge = (rule: any, value: any, callback: any) => {
  let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

  if (!reg.test(value)) {
    callback(new Error("请输入正确的邮箱地址"));
  } else {
    callback();
  }
};

// !检验身份证号码
export const idCard_judge = (rule: any, value: any, callback: any) => {
  let reg =
    /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  value = value.toUpperCase();
  if (!reg.test(value)) {
    callback(new Error("请输入正确的身份证号码"));
  } else {
    callback();
  }
};

// !检验手机号码
export const phone_judge = (rule: any, value: any, callback: any) => {
  let reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
  value = value.toUpperCase();
  if (!reg.test(value)) {
    callback(new Error("请输入正确的手机号码"));
  } else {
    callback();
  }
};

// !检验密码 1级
export const password_1_judge = (rule: any, value: any, callback: any) => {
  let reg = /^[a-zA-Z]\w{5,17}$/;
  value = value.toUpperCase();
  if (!reg.test(value)) {
    callback(
      new Error("密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线")
    );
  } else {
    callback();
  }
};

// !检验密码 2级
export const password_2_judge = (rule: any, value: any, callback: any) => {
  let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}$/;
  value = value.toUpperCase();
  if (!reg.test(value)) {
    callback(
      new Error(
        "密码必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间"
      )
    );
  } else {
    callback();
  }
};

// !检验密码 3级
export const password_3_judge = (rule: any, value: any, callback: any) => {
  let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
  value = value.toUpperCase();
  if (!reg.test(value)) {
    callback(
      new Error(
        "密码必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-10之间"
      )
    );
  } else {
    callback();
  }
};
