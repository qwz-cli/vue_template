<template>
  <div>{{ $t("home")}}</div>
  <div>{{ store.num }}</div>

  <el-button type="primary" @click="debounce_util(add)">防抖 num++</el-button>
  <el-button type="success" @click="throttle_util(send)">发送请求(5秒节流)</el-button>
  <el-button type="success" @click="onOpen">防抖弹窗</el-button>
  <el-button type="primary" @click="onTabLanguage">切换中/英</el-button>

    <!-- 弹窗 -->
    <MyAlert
    :title="title"
    :type="type"
    :show="show"
    :is-button="isButton"
    :form="form"
    @onSuccess="onSuccess"
    @onCancel="onCancel"
  />
</template>

<script setup lang="ts">
import useHome from "./useHome";
import { toRefs } from "vue";
import MyAlert from '@/components/myComponents/Alert/Alert.vue'
import {debounce_util,throttle_util} from '@/utils/util'
const { store, add, send,myAlert ,onSuccess,onCancel,onOpen,onTabLanguage} = useHome();
const { title, show, type, isButton, form } = toRefs(myAlert);

</script>
