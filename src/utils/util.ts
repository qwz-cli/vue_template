import { ElMessageBox, ElMessage } from "element-plus";

/**
 * TODO: 封装的方法
 */

// ? 创建表单检验的约束
interface CreateRules {
  required?: string[]; // 只读
  validator?: KeyStringAny<Rules_Item>; // 自定义
}

// ? 提示框的约束
type TipsType = "success" | "warning" | "info" | "error";

// !提示框
export const tips_util = (message: string, type: TipsType = "success") => {
  ElMessage({
    message,
    type,
  });
};

/**
 * !确定框
 * @param content 内容
 * @param title 标题
 * @returns 返回布尔值
 */
export const determine_util = (
  content: string,
  title: string = "提示"
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(content, title, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      // 点击了确定
      .then(() => {
        resolve(true);
      })
      // 点击了取消
      .catch(() => {
        resolve(false);
      });
  });
};

/**
 * ! 创建表单检验规则
 * @param info  配置
 */

export const createRules_util = (info: CreateRules): Rules => {
  const { required, validator } = info;
  const rulesObj: Rules = {};

  required?.forEach((item) => {
    const arr: string[] = item.split("_");
    const trigger = arr?.[1] === "c" ? "change" : "blur";
    rulesObj[arr[0]] = [
      {
        trigger,
        required: true,
        message: "不能为空",
      },
    ];
  });

  if (validator) {
    for (let key in validator) {
      // rulesObj.confirmPass.push(validator[key]);
      if (rulesObj?.[key]) {
        rulesObj[key].push(validator[key]);
      } else {
        rulesObj[key] = [validator[key]];
      }
    }
  }

  // console.log(83, rulesObj);
  return rulesObj;
};

// !检验数据类型
export const typeOf_util = function (data: any) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
};

// ! 防抖
export const debounce_util = (() => {
  let timer: any = null;
  return (callback: () => void, wait = 800) => {
    timer && clearTimeout(timer);
    timer = setTimeout(callback, wait);
  };
})();

// ! 节流
export const throttle_util = (() => {
  let last = 0;
  return (callback: () => void, wait = 5000) => {
    let now = +new Date();
    if (now - last > wait) {
      callback();
      last = now;
    }
  };
})();

// ! 解释url get请求参数
export const getSearchParams_util = () => {
  const searchPar:any = new URLSearchParams(window.location.search);
  const paramsObj: any = {};
  for (const [key, value] of searchPar.entries()) {
    paramsObj[key] = value;
  }
  return paramsObj;
};

// ! 数组对象 根据字段去重
export const uniqueArrayObject_util = (arr = [], key = "id") => {
  if (arr.length === 0) return;
  let list = [];
  const map = {};
  arr.forEach((item) => {
    if (!map[item[key]]) {
      map[item[key]] = item;
    }
  });
  list = Object.values(map);

  return list;
};

// ! 滚动到页面顶部
export const scrollToTop_util = () => {
  const height = document.documentElement.scrollTop || document.body.scrollTop;
  if (height > 0) {
    window.requestAnimationFrame(scrollToTop_util);
    window.scrollTo(0, height - height / 8);
  }
};

// ! 滚动到元素位置
export const smoothScroll_util = (element: string) => {
  document.querySelector(element)!.scrollIntoView({
    behavior: "smooth",
  });
};

// ! uuid
export const uuid_util = () => {
  const temp_url = URL.createObjectURL(new Blob());
  const uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url); //释放这个url
  return uuid.substring(uuid.lastIndexOf("/") + 1);
};

/**
 * ! 金额格式化
 * @param number：要格式化的数字
 * @param decimals：保留几位小数
 * @param dec_point：小数点符号
 * @param thousands_sep：千分位符号
 * @returns 格式化后的数据
 * *例子：moneyFormat_util(10000000, 3, '.', '-') // 10-000-000.000
 */
export const moneyFormat_util = (
  number: number | string,
  decimals: number,
  dec_point: string,
  thousands_sep: string
) => {
  number = (number + "").replace(/[^0-9+-Ee.]/g, "");
  const n = !isFinite(+number) ? 0 : +number;
  const prec = !isFinite(+decimals) ? 2 : Math.abs(decimals);
  const sep = typeof thousands_sep === "undefined" ? "," : thousands_sep;
  const dec = typeof dec_point === "undefined" ? "." : dec_point;
  let s: any = "";
  const toFixedFix = function (n: any, prec: any) {
    const k = Math.pow(10, prec);
    return "" + Math.ceil(n * k) / k;
  };
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  const re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
};

// ! 模糊搜索
/**
 *
 * @param list 原数组
 * @param keyWord 查询的关键词
 * @param attribute 数组需要检索的字段
 * @returns 搜索后结果
 * ?例子：fuzzyQuery_util(arr, '树', 'name') // [{id: 1, name: '树哥'}]
 */
export const fuzzyQuery_util = (
  list: [],
  keyWord: string,
  attribute: string
) => {
  const reg = new RegExp(keyWord);
  const arr: any[] = [];
  for (let i = 0; i < list.length; i++) {
    if (reg.test(list[i][attribute])) {
      arr.push(list[i]);
    }
  }
  return arr;
};

/*
! 时间格式化
1、< 60s, 显示为“刚刚”
2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”
5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”
*/
export const timeFormat_util = (time: number | string) => {
  let date = new Date(time),
    curDate = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 10,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    curYear = curDate.getFullYear(),
    curHour = curDate.getHours(),
    timeStr;

  if (year < curYear) {
    timeStr = year + "年" + month + "月" + day + "日 " + hour + ":" + minute;
  } else {
    let pastTime = +curDate - +date;
    let pastH = pastTime / 3600000;

    if (pastH > curHour) {
      timeStr = month + "月" + day + "日 " + hour + ":" + minute;
    } else if (pastH >= 1) {
      timeStr = "今天 " + hour + ":" + minute + "分";
    } else {
      var pastM = curDate.getMinutes() - minute;
      if (pastM > 1) {
        timeStr = pastM + "分钟前";
      } else {
        timeStr = "刚刚";
      }
    }
  }
  return timeStr;
};

//! uint8array转Base64
export const uint8arrayToBase64_util = (u8Arr: any) => {
  let CHUNK_SIZE = 0x8000; //arbitrary number
  let index = 0;
  let length = u8Arr.length;
  let result = "";
  let slice;
  while (index < length) {
    slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
    result += String.fromCharCode.apply(null, slice);
    index += CHUNK_SIZE;
  }
  return btoa(result);
};
