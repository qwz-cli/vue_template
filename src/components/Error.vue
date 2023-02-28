<template>
    <div>
      <el-button type="primary" @click="getPerformance()">获取当前性能</el-button>
      <el-button type="primary" @click="getIp()">获取ip地址</el-button>
      <el-button type="primary" @click="getPlugins()">获取插件数据</el-button>
      <el-button type="primary" @click="getComponentName()"
        >获取组件名称</el-button
      >
      <el-button type="danger" @click="withError()">同步报错</el-button>
      <el-button type="danger" @click="InternalError()">InternalError</el-button>
      <el-button type="danger" @click="asyncError()">异步报错</el-button>
      <el-button type="danger" @click="promiseError()">Promise报错</el-button>
    </div>
  </template>
  
  <script setup lang="ts">
  import useVuePrototype from "@/hooks/useVuePrototype";
  import { onMounted, ref } from "vue";
  // import useGetTime from "./useGetTime";
  // const {time}= useGetCompinentTime()
  // console.log(15,time);
  const { componentName, $this } = useVuePrototype();
  const getPlugins = () => {
    console.log("插件数据是：", $this.$monitor);
  };
  const getComponentName = () => {
    console.log("当前组件名称是：", componentName);
  };
  $this.$monitor.getComponentTime(componentName);
  
  const getIp = () => {
    console.log(returnCitySN["cip"] + "," + returnCitySN["cname"]);
  };
  
  const getPerformance = () => {
    const  t = performance.timing
      const  m = performance.memory;
  
    console.table({
      DNS查询耗时: (t.domainLookupEnd - t.domainLookupStart).toFixed(0),
      TCP链接耗时: (t.connectEnd - t.connectStart).toFixed(0),
      request请求耗时: (t.responseEnd - t.responseStart).toFixed(0),
      解析dom树耗时: (t.domComplete - t.domInteractive).toFixed(0),
      白屏时间: (t.responseStart - t.navigationStart).toFixed(0),
      domready时间: (t.domContentLoadedEventEnd - t.navigationStart).toFixed(0),
      onload时间: (t.loadEventEnd - t.navigationStart).toFixed(0),
      js内存使用占比: m
        ? ((m.usedJSHeapSize / m.totalJSHeapSize) * 100).toFixed(2) + "%"
        : undefined,
    });
  };
  
  const withError = () => {
    return eval("(" + obj + ")");
  };
  
  const InternalError = () => {
    function foo() {
      foo();
    }
    foo();
  };
  
  const asyncError = () => {
    setTimeout(() => {
      return a;
    }, 1000);
  };
  
  const promiseError = () => {
    Promise.reject("Promise报错了");
  };
  
  const qwzFlag = false;
  const qwzFlag2 = ref(false);
  
  $this.$monitor.blankScreen();
  
  // console.log(23,time.value);
  // onMounted(()=>{
  //   console.log('我也挂载了');
  // })
  </script>
  
  <script lang="ts">
  // import myMixin from '@/plugins/method/useGetCompinentTime'
  export default {
    name: "onError",
    // mixins:[myMixin]
  };
  </script>
  