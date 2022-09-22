<template>
  <div>首页</div>
  <div>{{ store.num }}</div>

  <el-button type="primary" @click="add">num++</el-button>
  <el-button type="success" @click="send">发送请求</el-button>
  <el-button type="success" @click="onOpen">打开弹窗</el-button>

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
import MyAlert from '../../components/myComponents/Alert/Alert.vue'
const { store, add, send,myAlert ,onSuccess,onCancel,onOpen} = useHome();
const { title, show, type, isButton, form } = toRefs(myAlert);

</script>
