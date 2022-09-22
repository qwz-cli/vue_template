<template>
  <el-dialog :model-value="props.show" :title="props.title" width="30%" center onCancel :before-close="onCancel">
    <template v-if="props.type === 'hint'">
      <span>{{ hint }}</span>
    </template>
    <template v-else-if="props.type === 'form'">
      <MyForm
        :Data="props.form!.data || {}"
        :Columns="props.form!.columns || []"
        :isButton="props.isButton"
        :rules="props.form?.rules || {}"
        @onSuccess="onSuccess"
        @onCancel="onCancel"
        
      />
    </template>

    <template #footer v-if="props.isButton">
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSuccess">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import MyForm from "@/components/myComponents/Form/Form.vue";
interface Props {
  title: string; // 提示
  type: "hint" | "form"; // 弹窗类型
  show: boolean; // 显示弹窗
  hint?: string; // 提示内容
  isButton?: boolean; // 显示按钮
  // 表单内容
  form?: {
    columns: columnsType[];
    data: any;
    rules?: Rules;
  };
}

interface Emit {
  (event: "onSuccess", n: boolean): void;
  (event: "onCancel"): void;
}

// 获取自定义事件
let emit = defineEmits<Emit>();
const props = withDefaults(defineProps<Props>(), {
  isButton: true,
});

const onSuccess = (isOk: boolean = true) => {
  emit("onSuccess", isOk);
};

const onCancel = () => {
  emit("onCancel");
};
</script>

<style scoped></style>
