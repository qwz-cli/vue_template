<template>
  <!-- <div :style="{ width: config.width }"> -->
    <el-select
      @change="onChange"
      :multiple="config.multiple"
      :model-value="props.modelValue"
      :placeholder="config.placeholder ||'请选择'"
      :clearable="config.clearable"
      :disabled="config.disabled"
      :style="{ width: config.width }"
    >
      <el-option
        v-for="item in config.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { ref, onMounted,Ref } from "vue";
// import useComponent from './useComponent'
import useComponent from '@/hooks/useComponent'


interface Props {
  modelValue?: string | string[];
  options?: OptionType[];
  placeholder?: string;
  width?: string;
  multiple?: boolean; // 多选
  clearable?: boolean; // 右侧删除
  disabled?:boolean; // 禁用
  config?: {};
}

interface IEmit {
  (event: "update:modelValue", n: string): void;
  (event: "onChange", n: string): void;
}

let props = defineProps<Props>();
let emit = defineEmits<IEmit>();
const config:Ref<Props> = useComponent(props)

// const config = ref<Props>(props);

const onChange = (val: string) => {
  emit("update:modelValue", val);
  emit("onChange", val);
};

// onMounted(() => {
//   config.value = { ...config.value, ...props };
//   delete config.value.config;
//   if (!props.config) return;
//   config.value = { ...config.value, ...props.config };
// });
</script>

<style scoped></style>
