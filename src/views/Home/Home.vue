<template>
  <div>{{ $t("home") }}</div>
  <div>{{ store.num }}</div>

  <w-button
    type="primary"
    name="防抖 num++"
    @click="debounce_util(add)"
    id="debounce_util"
  ></w-button>
  <el-button type="success" @click="throttle_util(send)" id="throttle_util"
    >发送请求(5秒节流)</el-button
  >
  <el-button type="success" @click="onOpen" id="onOpen">弹窗</el-button>
  <el-button type="primary" @click="onTabLanguage" id="onTabLanguage"
    >切换中/英</el-button
  >
  <el-button @click="onGuide" id="onGuide">新手引导</el-button>

  <el-button type="primary" v-debounce="[add]" id="debounce"
    >指令防抖 num++</el-button
  >
  <el-button type="success" v-throttle="[send, 'click', 5000]" id="throttle"
    >发送请求(5秒指令节流)</el-button
  >

  <br />
  <br />
  <Error />
  <!-- 弹窗 -->
  <!-- :title="title"
    :type="type"
    :show="show"
    :is-button="isButton"
    :form="form" -->
  <MyAlert :config="myAlert" @onSuccess="onSuccess" @onCancel="onCancel" />
  <br />

  <Table :data="tableData" :column="columns"></Table>
  <Tour :config="homeTour" name="homeTour" />
  <div class="some-panel" id="drag">
    <div
      v-drag
      drag-min-top="50"
      style="height: 20px; background-color: blue"
    ></div>
  </div>
</template>

<script setup lang="ts">
import useHome from "./useHome";
import { toRefs } from "vue";
import MyAlert from "@/components/myComponents/Alert/Alert.vue";
import { debounce_util, throttle_util } from "@/utils/util";
import Table from "@/components/myComponents/Table.vue";
import Error from "@/components/Error.vue";
import Tour from "@/components/Tour.vue";
import { homeTour } from "./tour";

const tableData = [
  {
    index: 1,
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    politics_status: 0,
  },
  {
    index: 2,
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    politics_status: 1,
  },
  {
    index: 3,
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    politics_status: 2,
  },
  {
    index: 4,
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    politics_status: 3,
  },
];

const {
  store,
  add,
  send,
  myAlert,
  onSuccess,
  onCancel,
  onOpen,
  onTabLanguage,
  columns,
  onGuide,
} = useHome();
// const { title, show, type, isButton, form } = toRefs(myAlert);
</script>

<style scoped lang="less">
.some-panel {
  width: 200px;
  height: 140px;
  position: absolute;
  background-color: coral;
  z-index: 99;
}
.some-panel[dragged] {
  height: 200px;
}
</style>
