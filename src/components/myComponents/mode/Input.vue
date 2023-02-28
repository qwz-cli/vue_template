<template>
  <div :style="{ width: config.width }">
    <el-input
      :model-value="props.modelValue"
      :placeholder="config.placeholder"
      :type="config.type"
      :show-password="config['show-password']"
      :disabled="config.disabled"
      @input="onInput"
      :autosize="config.autosize"
      ref="inputRef"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
// import useComponent from "./useComponent";
import useComponent from '@/hooks/useComponent'

interface Props {
  modelValue?: string;
  placeholder?: string;
  width?: string;
  disabled?: boolean;
  type?: "text" | "textarea";
  "show-password"?: boolean; // 密码框眼睛
  autosize?: { minRows: number; maxRows: number } | boolean; // 文本域的显示调试
  config?: {};
}

interface IEmit {
  (event: "update:modelValue", n: string): void;
}

// 获取props，并设置默认值
let props = defineProps<Props>();
let emit = defineEmits<IEmit>();
const inputRef = ref();

// const config = ref<Props>(props);
const config: Ref<Props> = useComponent(props);

const onInput = (val: string) => {
  emit("update:modelValue", val);
};

onMounted(() => {
  //   config.value = { ...config.value, ...props };
  //   delete config.value.config;
  //   if (!props.config) return;
  //   config.value = { ...config.value, ...props.config };
  //   // console.log(44, config.value);
  // inputRef
  // console.log(52,inputRef.value,inputRef.value.ref,[inputRef.value.ref],inputRef.value.ref.id);
});
</script>

<style scoped></style>
