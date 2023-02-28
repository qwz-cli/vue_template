<template>
  <el-table :data="data" stripe>
    <template v-for="(item, index) in column" :key="index">
      <el-table-column
        :prop="item.name"
        :label="item.label"
        :width="item?.tableItem?.width"
        align="center"
        v-if="item.tableItem"
      >
        <template #default="{ row }">
          <!-- <div>{{item}}</div> -->
          <!-- 按钮 -->
          <template v-if="item?.tableItem?.type === 'button'">
            <el-button
              v-for="(key, i) in item.tableItem.buttons"
              :key="i"
              :type="key.type"
              :size="key.size"
              @click="onClickButton(key.event, row)"
              >{{ key.name }}</el-button
            >
          </template>

          <!-- 显示指定文字 -->
          <template v-else-if="item?.tableItem?.type === 'txt'">{{
            // item.tableItem.txt
            item.tableItem?.fn?.(row)
          }}</template>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup lang="ts">
interface Props {
  data: any[]; //表格的数据
  column: columnsType[]; // 表格的循环
}
const props = defineProps<Props>();
const tableData = [
  {
    index: 1,
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    index: 2,
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    index: 3,
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    index: 4,
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

const emit = () => {
  console.log("点击编辑");
};
const del = () => {
  console.log("删除");
};

const arr = [
  {
    label: "#",
    name: "index",
    tableItem: {
      width: 50,
    },
  },
  {
    label: "名称",
    name: "name",
    tableItem: {
      width: 100,
    },
  },
  {
    label: "时间",
    name: "date",
    tableItem: {},
  },
  {
    label: "地址",
    name: "address",
  },
  {
    label: "操作",
    name: "",
    tableItem: {
      type: "button",
      buttons: [
        {
          name: "编辑",
          event: emit,
          type: "",
          size: "small",
        },
        {
          name: "删除",
          event: del,
          type: "danger",
          size: "small",
        },
      ],
    },
  },
];

const onClickButton = (fn: (info: {}) => void, info: {}) => {
  fn(info);
};
</script>

<style lang="less" scoped>
// .el-table{
//     // margin: 40px 0;
// }
</style>
