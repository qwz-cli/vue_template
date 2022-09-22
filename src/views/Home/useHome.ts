import { mainStore } from "@/store/main";
import { testAPI } from "@/utils/axios";
import { notNull_judge, ip_judge } from "@/utils/formUtil";
import columns from "./columns";
import { tips_util, determine_util } from "@/utils/util";
import { reactive } from "vue";

export default function useHome() {
  const store = mainStore();

  const add = () => {
    store.num++;
  };

  const send = async () => {
    let res = await testAPI();
    console.log(res);
  };

  const initRecord = {
    name: "",
  };
  const rules: Rules = {
    name: [{ validator: notNull_judge, trigger: 'blur' }],
  };

  const myAlert: AlertPropsType = reactive({
    title: "添加",
    type: "form",
    show: false,
    isButton: false,
    form: {
      data: initRecord,
      columns: columns(),
      rules,
    },
  });

  const onSuccess = (isOk: boolean) => {
    console.log("确定", isOk);
    if (!isOk) return;
    tips_util("添加成功");
    myAlert.show = false;
  };

  const onCancel = () => {
    tips_util("关闭弹窗", "info");
    myAlert.show = false;
  };
  
  const onOpen = () => {
    myAlert.show = true;
    myAlert.form!.data = JSON.parse(JSON.stringify(initRecord));
  };

  return {
    store,
    add,
    send,
    myAlert,
    onSuccess,
    onCancel,
    onOpen,
  };
}
