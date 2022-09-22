import * as mqtt from "mqtt/dist/mqtt.min";
import protobuf from "protobufjs";
import protoJson from "../proto/json.json";
import { mainStore } from "@/store/main";
const mainStart = mainStore();


// protoBuff
const root = protobuf.Root.fromJSON(protoJson);
const protoData = root.lookupType("interface_message.GeneralDetectionMapData");
// mq连接
const client = mqtt.connect(`ws://192.168.1.114:1884`);

export default function (onMessage: (tioic: string, msg: any) => void) {
  client.on("connect", (e: unknown) => {
    console.log("连接成功");

    // 监听信息
    client.on("message", (topic: string, message: any) => {
      const info: any = protoData.decode(message);
      onMessage(topic, info);
      return;
    });

    // 重新连接
    client.on("reconnect", (err: unknown) => {
      console.log("正在重新连接", err);
    });

    // 连接失败
    client.on("error", (err: unknown) => {
      console.log("连接失败");
    });
  });

  // return client;
}

// 订阅主题
export const subscribe_mqtt = (theme: string) => {
  client.subscribe(theme, { qos: 0 }, function (error: unknown) {
    if (error) {
      console.log("订阅失败", error);
    }else{
      console.log('订阅成功');
    }
  });
};

// 取消订阅
export const unsubscribe_mqtt = (theme: string) => {
  client.unsubscribe(theme, { qos: 0 }, function (error: unknown) {
    if (error) {
      console.log("取消订阅失败", error);
    }
  });
};
