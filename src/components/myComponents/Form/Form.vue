<template>
  <el-form
    :model="props.Data"
    :label-width="props?.width"
    ref="myForm"
    :validate-on-rule-change="false"
    :rules="props.rules"
    :inline="props.inline"
  >
    <!-- style="--color: red;" -->
    <div class="center" :class="props.inline ? 'inline' : ''">
      <!-- 循环 -->
      <!-- <template v-for="(item, index) in props.Columns" > -->
      <div class="item" v-for="(item, index) in props.Columns" :key="index">
        <el-form-item
          :label="item.label"
          :prop="item.name"
          v-if="item.formItem"
        >
          <!-- 动态组件 -->
          <component
            :is="createComponent(item.formItem.type!)"
            v-model="props.Data[item.name]"
            :config="item.formItem"
          />
        </el-form-item>
        <w-button
          @click="item.formItem?.button?.event(item.formItem)"
          v-if="item.formItem?.button"
          :config="item.formItem.button"
        />
      </div>
      <!-- </template> -->
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import type { FormInstance } from "element-plus";
import { reactive, ref, onMounted } from "vue";
import {
  WSelect,
  WInput,
  WNumber,
  WSwitch,
  WButton,
  WColor,
  WVerify
} from "@/components/myComponents/mode/";
// import Verify from "@/components/verifition/Verify.vue";

interface Props {
  Data: any;
  Columns: columnsType[];
  isButton?: boolean; // 显示按钮
  rules?: Rules;
  width?: string;
  inline?: boolean;
}

interface Emit {
  (event: "onSuccess", n: boolean): void;
  (event: "onCancel"): void;
}

let emit = defineEmits<Emit>();
let props = withDefaults(defineProps<Props>(), {});
const myForm = ref<FormInstance>();

// const verifySussess = () => {};

const onSubmit = (formEl: FormInstance | undefined) => {
  return new Promise<Boolean>((resolve, reject) => {
    if (!myForm.value) {
      reject(false);
      return;
    }
    myForm.value?.validate(async (valid) => {
      if (valid) {
        // console.log("验证成功");
        resolve(true);
      } else {
        // console.log("验证失败！！！！");
        resolve(false);
      }
    });
  });
};

const onCancel = () => {
  emit("onCancel");
};
// type KeyStringAny<T> = {
//   [key: string]: T;
// };

// 创建组件
const createComponent = (type: FormItem_Type) => {
  let comObj: KeyStringAny<any> = {
    // text: WInput,
    select: WSelect,
    switch: WSwitch,
    number: WNumber,
    verify: WVerify,
    color: WColor,
  };

  if (comObj?.[type]) {
    return comObj[type];
  } else {
    return WInput;
  }
};
// const $reset=()=>{
//   // myForm.value.resetFields();
//   myForm.value?.removeField()
//   // console.log(object);
// }

defineExpose({
  onSubmit,
  // $reset
});
</script>

<style lang="less" scoped>
// .box {
//   display: flex;
// }

// .btn {
//   margin-top: 20px;
//   button {
//     margin-left: 40px;
//   }
// }

.center {
  display: flex;
  // align-items: center;
  flex-direction: column;

  .item {
    display: flex;
  }
}

.inline {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

// :deep(label) {
//   // color: red !important;
//   // color: var(--color);
//   overflow: hidden; //设置了这个属性，text-overflow属性才会生效
//   text-overflow: ellipsis; //超出范围的文本内容用省略号显示。
//   white-space: nowrap; //禁止换行
// }
</style>
