import { ElMessageBox, ElMessage } from "element-plus";

/**
 * TODO: 封装的方法
 */

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

/**
 *! 绘制画框和数据
 * @param Dom canvas DOM元素
 * @param img 图片
 * @param coordinate 坐标数据
 */
let flag = true;
export const drawingFrame_util = (
  Dom: any,
  img: any,
  coordinate: any[],
  time: number
): Promise<any> => {
  return new Promise((resolve, reject) => {
    // const ctx = Dom.getContext("2d");
    const baseImage: any = new Image();
    baseImage.src = `data:image/jpeg;base64,${img}`;

    baseImage.onload = () => {
      // 绘制图片
      const width = baseImage.width;
      const height = baseImage.height;
      // if (flag) {
      setTimeout(() => {
        // console.log('展示：',time*1000);
        resolve({ width, height, coordinate });
        //     flag = true;
      }, time*700);
      //   console.log('2、展示延迟时间：',time*2);
      // }
      // flag = false;
    };
  });
};

interface DrawingBoxType {
  Dom: any;
  coordinate: any; // 坐标
  w: number; // 宽
  h: number; // 高
}
// 绘制框
export const drawingBox_util = ({ Dom, coordinate, w, h }: DrawingBoxType) => {
  const ctx = Dom.getContext("2d");
  ctx.strokeStyle = "red";

  ctx.clearRect(0, 0, w, h);

  coordinate.forEach((item: any) => {
    const { ltX, ltY, rbX, rbY } = item.objectRectangle;

    // 文字
    ctx.fillStyle = "red";
    ctx.fillText(item.objectConfidence, ltX, ltY);

    // 框
    [1, 2, 3, 4].forEach((item, index) => {
      switch (index) {
        case 0:
          ctx.beginPath();
          ctx.moveTo(ltX, ltY);
          break;
        case 1:
          ctx.lineTo(rbX, ltY);
          break;
        case 2:
          ctx.lineTo(rbX, rbY);
          break;
        case 3:
          ctx.lineTo(ltX, rbY);
          ctx.closePath();
          break;
      }
      ctx.stroke();
    });
  });
};

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
): any => {
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
