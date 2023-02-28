import { App, DirectiveBinding } from "vue";

// ! 鉴权
const permission = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 获取用户权限 [每个人存放用户权限的位置不一致，需要根据自己的业务进行相应的修改]
    let user: { power: string } = JSON.parse(
      localStorage.getItem("userInfo") || '{"power":"0"}'
    );
    let flag = false;

    if (binding.value.includes(+user.power)) {
      flag = true;
    }

    // 用户权限不足则隐藏
    if (!flag) el.parentNode && el.parentNode.removeChild(el);
  },
};

// ! 拖拽
const drag = (el: HTMLElement) => {
  const oDiv = el; // 当前元素
  const minTop = oDiv.getAttribute("drag-min-top");
  const ifMoveSizeArea = 20;
  oDiv.onmousedown = (e) => {
    let target: any = oDiv;
    while (
      window.getComputedStyle(target).position !== "absolute" &&
      target !== document.body
    ) {
      target = target.parentElement;
    }

    document.onselectstart = () => {
      return false;
    };
    if (!target.getAttribute("init_x")) {
      target.setAttribute("init_x", target.offsetLeft);
      target.setAttribute("init_y", target.offsetTop);
    }

    const initX = parseInt(target.getAttribute("init_x"));
    const initY = parseInt(target.getAttribute("init_y"));

    // 鼠标按下，计算当前元素距离可视区的距离
    const disX = e.clientX - target.offsetLeft;
    const disY = e.clientY - target.offsetTop;
    document.onmousemove = (e) => {
      // 通过事件委托，计算移动的距离
      // 因为浏览器里并不能直接取到并且使用clientX、clientY,所以使用事件委托在内部做完赋值
      const l = e.clientX - disX;
      const t: any = e.clientY - disY;
      // 计算移动当前元素的位置，并且给该元素样式中的left和top值赋值
      target.style.left = l + "px";
      target.style.top = (t < minTop! ? minTop : t) + "px";
      if (
        Math.abs(l - initX) > ifMoveSizeArea ||
        Math.abs(t - initY) > ifMoveSizeArea
      ) {
        target.setAttribute("dragged", "");
      } else {
        target.removeAttribute("dragged");
      }
    };
    document.onmouseup = (e) => {
      document.onmousemove = null;
      document.onmouseup = null;
      document.onselectstart = null;
    };
    // return false不加的话可能导致黏连，拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
    return false;
  };
};

/***
 * ! 防抖 单位时间只触发最后一次
 *  @param {?Number|300} time - 间隔时间
 *  @param {Function} fn - 执行事件
 *  @param {?String|"click"} event - 事件类型 例："click"
 *  @param {Array} binding.value - [fn,event,time]
 *  例：<el-button v-debounce="[reset,`click`,300]">刷新</el-button>
 *  也可简写成：<el-button v-debounce="[reset]">刷新</el-button>
 */
const debounce = {
  mounted: function (el: HTMLElement, binding: DirectiveBinding) {
    let [fn, event = "click", time = 300] = binding.value;
    let timer: any;
    el.addEventListener(event, () => {
      timer && clearTimeout(timer);
      timer = setTimeout(() => fn(), time);
    });
  },
};

/***
 *  !节流 每单位时间可触发一次
 *  第一次瞬间触发，最后一次不管是否达到间隔时间依然触发
 * 【考虑到input的change事件】
 *  @param {?Number|300} time - 间隔时间
 *  @param {Function} fn - 执行事件
 *  @param {?String|"click"} event - 事件类型 例："click"
 *  @param {Array} binding.value - [fn,event,time]
 *  例：<el-button v-throttle="[reset,`click`,300]">刷新</el-button>
 *  传递参数则：<el-button v-throttle="[()=>reset(param),`click`,300]">刷新</el-button>
 */
const throttle = {
  mounted: function (el: HTMLElement, binding: DirectiveBinding) {
    let [fn, event = "click", time = 300] = binding.value;
    let timer: any, timer_end: any;
    el.addEventListener(event, () => {
      if (timer) {
        clearTimeout(timer_end);
        return (timer_end = setTimeout(() => fn(), time));
      }
      fn();
      timer = setTimeout(() => (timer = null), time);
    });
  },
};
// )

export default {
  install(app: App) {
    app.directive("permission", permission);
    app.directive("drag", drag);
    app.directive("debounce", debounce);
    app.directive("throttle", throttle);
  },
};
