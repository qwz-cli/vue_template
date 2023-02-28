import type { Tour } from "@/type/tour";
// interface Tour {
//   name: string;
//   options: Options_tour;
//   steps: Steps_tour[];
// }

export const homeTour: Tour = {
  options: {
    labels: {
      // 指引项的按钮文案
      buttonSkip: "跳过指引",
      buttonPrevious: "上一步",
      buttonNext: "下一步",
      buttonStop: "结束",
    },
    useKeyboardNavigation: true,
    highlight: true,
    enableScrolling: true,
  },
  steps: [
    {
      target: "#debounce_util",
      content: "<dvi style='color:#fff'>函数防抖</dvi>",
      header: {
        title: "防抖",
      },
      params: {
        placement: "bottom",
      },
    },
    {
      target: "#debounce",
      content: "自定义指令防抖",
      header: {
        title: "防抖",
      },
      params: {
        placement: "bottom",
      },
    },
    {
      target: "#throttle_util",
      content: "函数节流",
      header: {
        title: "节流",
      },
      params: {
        placement: "bottom",
      },
    },
    {
      target: "#throttle",
      content: "指令节流",
      header: {
        title: "节流",
      },
      params: {
        placement: "bottom",
      },
    },
    {
      target: "#onTabLanguage",
      content: "语言中英切换",
      header: {
        title: "国际化",
      },
      params: {
        placement: "bottom",
      },
    },
    {
      target: "#onOpen",
      content: "点击打开弹窗",
      header: {
        title: "弹窗",
      },
      params: {
        placement: "bottom",
      },
    },
    {
      target: "#onGuide",
      content: "点击开始新手引导",
      params: {
        placement: "bottom",
      },
    },
    {
      target: "#drag",
      content: "鼠标按钮蓝色区块，可以对div进行拖动",
      params: {
        placement: "top",
      },
    },
  ],
};
