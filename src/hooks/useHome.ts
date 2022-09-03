import { mainStore } from "@/store/main";
import { testAPI } from "@/utils/axios";

export default function useHome() {
  const store = mainStore();

  const add = () => {
    store.num++;
  };

  const send = async () => {
    let res = await testAPI();
    console.log(res);
  };

  return {
    store,
    add,
    send,
  };
}
