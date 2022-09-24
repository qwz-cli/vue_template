// import { mainStore } from "@/store/main";
import { mainStore } from "@/store";
import { testAPI } from "@/utils/axios";
import { notNull_judge, ip_judge } from "@/utils/formUtil";
import columns from "./columns";
import { tips_util, determine_util,getSearchParams_util,uuid_util } from "@/utils/util";
import { reactive,onMounted } from "vue";
import { useI18n } from "vue-i18n";

export default function useHome() {
  const store = mainStore();
  const { locale } = useI18n();

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
    name: [{ validator: notNull_judge, trigger: "blur" }],
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

  const onSuccess = async (isOk: boolean) => {
    // console.log("确定", isOk);
    if (!isOk) return;
    await determine_util("是否确定提交？");
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

  onMounted(()=>{
    console.log('get请求参数',getSearchParams_util());
    console.log('uuid',uuid_util());

  })

  // 切换语言
  const onTabLanguage = () => {
    let language = localStorage.getItem("lang") || "zh";
    const lang = language === "zh" ? "en" : "zh";
    locale.value = lang;
    localStorage.setItem("lang", lang);
  };

  return {
    store,
    add,
    send,
    myAlert,
    onSuccess,
    onCancel,
    onOpen,
    onTabLanguage,
  };
}
