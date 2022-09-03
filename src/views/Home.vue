<template>
  <div>首页</div>
  <div>{{ store.num }}</div>

  <el-button type="primary" @click="add">num++</el-button>
  <el-button type="success" @click="send">发送请求</el-button>
</template>

<script setup lang="ts">
import useHome from "@/hooks/useHome";
const { store, add, send } = useHome();
</script>
