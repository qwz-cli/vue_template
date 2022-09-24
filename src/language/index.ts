import { createI18n } from "vue-i18n";
import zh from "./lang/zh";
import en from "./lang/en";

const language = localStorage.getItem("lang");
const i18n = createI18n({
  legacy: false,
  locale: language || "zh", // 初始化配置语言
  messages: { zh, en },
});

export default i18n;
