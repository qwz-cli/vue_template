<template>
  <!-- <div class="btn"> -->
  <el-button :type="config.type" :size="config.size">{{
    config.name
  }}</el-button>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { ref, onMounted, watch, Ref } from "vue";
// import useComponent from "./useComponent";
import useComponent from '@/hooks/useComponent'

interface Props {
  name?: string; // 名称
  type?: "primary" | "success" | "warning" | "danger" | "info"; // 按钮颜色
  size?: "large" | "default" | "small"; // 大小
  round?: boolean; // 圆角
  circle?: boolean; // 圆形
  link?: boolean; // 链接
  text?: boolean; // 文字
  config?: {};
}

// 获取props，并设置默认值
let props = defineProps<Props>();
// const config = ref<Props>(props);
const config: Ref<Props> = useComponent(props);

onMounted(() => {
  // console.log(29, config.value, props);
});
</script>

<style scoped lang="less">
// .btn {
//   display: inline;
// }
</style>
