// 传参
export interface Tour {
//   name: string;
  options?: Options_tour;
  steps: Steps_tour[];
}

//! 总配置
export interface Options_tour {
  useKeyboardNavigation?: boolean; // 是否通过键盘的←, → 和 ESC 控制指引
  highlight?: boolean; // 是否高亮显示激活的的target项
  enableScrolling?: boolean; // 指引到当前项时是否滚动轴滚动到改项位置
  labels?: Options_labels_tour; // 指引项的按钮文案
}

//! 指引项的按钮文案
export interface Options_labels_tour {
  buttonSkip: string; // 跳过文案
  buttonPrevious: string; // 上一步文案
  buttonNext: string; // 下一步文案
  buttonStop: string; // 结束文案
}

//! 每一项配置
export interface Steps_tour {
  target: string; // 当前项的id或class或data-v-step属性
  content: string; // 当前项指引内容 支持html元素
  params: Steps_params_tour; // 选中的时的配置
  header?: { // 头部信息
    title: string;
  };
  // 在进行下一步时处理UI渲染或异步操作，例如打开弹窗，调用api等。当执行reject时，指引不会执行下一步
  before?: (v: "next" | "previous") => void;
}

//! 选中的时的配置
export interface Steps_params_tour {
  placement: "bottom" | "top" | "right" | "left"; // 指引在target的位置，支持上、下、左、右
  highlight?: boolean; // 当前项激活时是否高亮显示
  enableScrolling?: boolean; // 指引到当前项时是否滚动轴滚动到改项位置
}
