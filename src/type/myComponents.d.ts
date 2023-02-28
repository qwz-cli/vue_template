// !弹窗组件约束
interface AlertPropsType {
  title: string; // 提示
  type: "hint" | "form" | "slot"; // 弹窗类型
  show: boolean; // 显示弹窗
  hint?: string; // 提示内容
  isButton?: boolean; // 显示按钮
  width?: string; // 宽度
  form?: {
    data: any; // 数据
    columns: columnsType[]; // 表单内容
    rules?: Rules;
    width?: string;
    inline?: boolean; //行内表单
  };
}

// !列：每一项
interface columnsType {
  label: string; // 名称
  name: string; // key名
  // 表单配置
  formItem?: FormItemType;
  // 表格配置
  tableItem?: {
    width?: number; // 宽
    type?: "button" | "txt"; // 类型
    buttons?: ButtonType[]; // 按钮
    // txt?:string;
    fn?: (v: any) => string; // 显示特定文字
  };
}

type FormItem_Type =
  | "text"
  | "select"
  | "switch"
  | "textarea"
  | "number"
  | "password"
  | "color"
  | "verify";

// !表单项配置
interface FormItemType {
  type?: FormItem_Type; // 类型
  width?: string; // 宽度
  placeholder?: string; // 提示
  options?: OptionType[]; // 下拉框选项
  multiple?: boolean; // 下拉框多选
  disabled?: boolean; // 禁用
  "show-password"?: boolean; // 密码框眼睛
  verifyApi?: () => string; // 验证码获取图片接口
  button?: ButtonType; // 按钮配置
  clearable?: boolean; // 右侧清空 X
  autosize?: { minRows: number; maxRows: number } | boolean; // 文本域的显示调试
}

// !按钮配置
interface ButtonType {
  name: string; // 名称
  event: (v: any) => void; // 事件
  type?: "primary" | "success" | "warning" | "danger" | "info"; // 按钮颜色
  size?: "large" | "default" | "small"; // 大小
  round?: boolean; // 圆角
  circle?: boolean; // 圆形
  link?: boolean; // 链接
  text?: boolean; // 文字
}

// !下拉框选项
interface OptionType {
  label: string;
  value: string | number;
}

// ? 表单检验
interface Rules {
  [key: string]: Rules_Item[];
}

//
interface Rules_Item {
  trigger: "blur" | "change";
  validator?: (rule: any, value: any, callback: any) => void; // 自定义验证
  required?: boolean; // 能否为空
  message?: string; // 提示信息
}
