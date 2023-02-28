<template>
  <!-- <div> -->
  <el-input-number
    :style="{ width: config.width }"
    :model-value="props.modelValue"
    :disabled="config.disabled"
    @change="onChange"
  />
  <!-- </div> -->
</template>

<script setup lang="ts">
import { ref, Ref,watch,onMounted } from "vue";
// import useComponent from "./useComponent";
import useComponent from '@/hooks/useComponent'

interface Props {
  modelValue?: number;
  width?: string;
  disabled?: boolean;
  config?:{}
}

interface IEmit {
  (event: "update:modelValue", n: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<IEmit>();
const config: Ref<Props> = useComponent(props);

  // watch(props,()=>{
  //   console.log('变了',props);
  // })

  onMounted(()=>{
    console.log(34,props,config.value);
  })
const onChange = (val: number) => {
  emit("update:modelValue", val);
};
</script>

<style scoped></style>
