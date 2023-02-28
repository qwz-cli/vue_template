<template>
  <div>
    <el-color-picker
      :model-value="props.modelValue"
      :show-alpha="config['showAlpha']"
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts">
// import useComponent from "./useComponent";
import useComponent from '@/hooks/useComponent'

import { onMounted, Ref } from "vue";
interface Props {
  modelValue?: string | string[];
  showAlpha?: boolean;
  config?: {};
}
interface IEmit {
  (event: "update:modelValue", n: string): void;
}

let props = defineProps<Props>();
let emit = defineEmits<IEmit>();

const config: Ref<Props> = useComponent(props);

const onChange = (val: string) => {
  // config.value.modelValue = val
  emit("update:modelValue", val);
};
</script>

<style scoped lang="less"></style>
