<template>
  <div :style="{ width: props.width }">
    <el-switch
      :model-value="!!props.modelValue"
      @change="onChange"
      :disabled="config.disabled"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
// import useComponent from "./useComponent";
import useComponent from '@/hooks/useComponent'

interface Props {
  modelValue?: string | string[] | boolean;
  disabled?: boolean;
  width?: string;
  config?:{}
}

interface IEmit {
  (event: "update:modelValue", n: string): void;
  (event: "onChange", n: string): void;
}

// 获取props，并设置默认值
let props = defineProps<Props>();
const config: Ref<Props> = useComponent(props);

let emit = defineEmits<IEmit>();
const onChange = (val: string) => {
  emit("update:modelValue", val);
  emit("onChange", val);
};
</script>

<style scoped></style>
