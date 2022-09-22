<template>
  <el-form
    :model="props.Data"
    label-width="120px"
    ref="myForm"
    :rules="props.rules"
  >
    <!-- 循环 -->
    <el-form-item
      v-for="(item, index) in props.Columns"
      :key="index"
      :label="item.label"
      :prop="item.name"
    >
      <!-- 判断类型 -->
      <template v-if="item.formItem.type === 'text'">
        <el-input v-model="props.Data[item.name]" />
      </template>
    </el-form-item>

    <el-form-item v-if="!props.isButton">
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onSubmit(myForm)">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import type { FormInstance } from "element-plus";
import { reactive, ref } from "vue";

interface Props {
  Data: any;
  Columns: columnsType[];
  isButton?: boolean; // 显示按钮
  rules?: Rules;
}

interface Emit {
  (event: "onSuccess", n: boolean): void;
  (event: "onCancel"): void;
}

// 获取自定义事件
let emit = defineEmits<Emit>();

let props = withDefaults(defineProps<Props>(), {});

const myForm = ref<FormInstance>();
// 设置默认值
const rules = props.rules ? props.rules : {};


const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      console.log("验证成功");
      emit('onSuccess',true)
    } else {
      console.log("验证失败！！！！");
      emit('onSuccess',false)
    }
  });
};

const onCancel = ()=>{
  emit('onCancel')
}
</script>
