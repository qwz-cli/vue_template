<template>
  <!-- v-model="show" -->
  <el-dialog
    :model-value="props.config.show"
    :title="props.config.title"
    :width="props.config.width"
    center
    onCancel
    :before-close="onCancel"
  >
    <!-- 信息 -->
    <template v-if="props.config.type === 'hint'">
      <span>{{ props.config.hint }}</span>
    </template>

    <!-- 表单 -->
    <template v-else-if="props.config.type === 'form'">
      <MyForm
        :Data="props.config.form?.data || {}"
        :Columns="props.config.form?.columns || []"
        :isButton="props.config.isButton"
        :rules="props.config.form?.rules || {}"
        :width="props.config.form?.width"
        :inline="props.config.form?.inline"
        @onSuccess="onSuccess"
        @onCancel="onCancel"
        ref="formRef"
      />
    </template>

    <!-- 插槽 -->
    <template v-else-if="props.config.type === 'slot'">
      <slot></slot>
    </template>

    <!-- <template #footer v-if="props.config.isButton"> -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSuccess">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import MyForm from "@/components/myComponents/Form/Form.vue";
interface Props {
  config: AlertPropsType;
}
interface Emit {
  (event: "onSuccess", n: boolean): void;
  (event: "onCancel"): void;
}

let emit = defineEmits<Emit>();
const props = defineProps<Props>();
const formRef = ref();

const onSuccess = async () => {
  const isOk = await formRef.value.onSubmit();
  emit("onSuccess", isOk);
};

const onCancel = () => {
  emit("onCancel");
};

// const $reset=()=>{
//   formRef.value.$rese();
//   // console.log(object);
// };

// onMounted(() => {
//   console.log(68, formRef.value);
// });

// const open = () => {
//   show.value = true;
// };
// const close = () => {
//   show.value = false;
// };

// defineExpose({
//   $reset
// });
</script>

<style scoped></style>
