// !组件传值
interface ComponentPropsType<T, F> {
  formItem: T; // 配置
  value: F; // 值
}

// 简写
type COMPONENT<T, F> = ComponentPropsType<T, F>;

// !下拉框
interface WSelectProps {
  placeholder?: string; // 提示
  "allow-create"?: boolean; // 允许创建
  filterable?: boolean; // 是否可筛选
  "default-first-option"?: boolean; // 是否在输入框按下回车时，选择第一个匹配项
  "reserve-keyword"?: boolean; // 是否在选中一个选项后保留当前的搜索关键词
  disabled?: boolean; // 禁用
  option: OptionType[]; // 下拉项
  [key: string]: any;
}

// !按钮
interface WButtonProps {
  name: string; // 名称
  type?: "primary" | "success" | "warning" | "danger" | "info"; // 按钮颜色
  size?: "large" | "default" | "small"; // 大小
  round?: boolean; // 圆角
  circle?: boolean; // 圆形
  link?: boolean; // 链接
  text?: boolean; // 文字
}
