<template>
  <div class="container-fluid">
    <div class="form-row">
      <div class="col-12">
        <div class="slidercaptcha card">
          <div class="card-header"></div>
          <div class="card-body">
            <el-icon
              class="cursorP ico"
              :size="config.icoSize"
              :color="config.icoColor"
              @click="onRefresh"
              v-show="!props.modelValue"
              ><Refresh
            /></el-icon>
            <div id="captcha"></div>

            <div v-show="props.modelValue" class="yes">验证成功</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./js/longbow.slidercaptcha.js";
import { ref, onMounted, Ref ,watch} from "vue";
import useComponent from "@/components/myComponents/mode/useComponent";

interface IProps {
  modelValue?: boolean;
  verifyApi?: () => string; // 图片api
  icoColor?: string;
  icoSize?: string;
  config?: {};
}
interface IEmit {
  (event: "verifySussess"): void;
  (event: "update:modelValue", n: boolean): void;
}

let emit = defineEmits<IEmit>();
let props = withDefaults(defineProps<IProps>(), {
  icoColor: "#fff",
  icoSize: "20px",
});
const config: Ref<IProps> = useComponent(props);
let captcha: any = null;
const state = ref(false);

watch(config.value,(newValue,oldValue)=>{ 	// .vlaue
	// console.log('sum变化了',newValue,oldValue)
  if(!newValue.modelValue)
  {
    onRefresh()
  }
},{deep:true})

const createImg = () => {
  let url = "";
  if (config.value?.verifyApi) {
    url = config.value.verifyApi();
  } else {
    url = new URL(
      `./images/${Math.ceil(Math.random() * 4)}.png`,
      import.meta.url
    ).href;
  }
  return url;
};

const onRefresh = () => {
  state.value = false;
  captcha.reset();
  emit("update:modelValue", false);
};

const createVerify = () => {
  captcha = (window as any).sliderCaptcha({
    id: "captcha",
    repeatIcon: "",
    setSrc: function () {
      return createImg();
    },
    onSuccess: function () {
      emit("update:modelValue", true);
    },
  });
};

onMounted(() => {
  // console.log("挂载了");
  createVerify();

  // config.value = { ...config.value, ...props };
  // delete config.value.config;
  // if (!props.config) return;
  // config.value = { ...config.value, ...props.config };
});
</script>

<style scoped lang="less">
.col-12 {
  height: 200px;
}
.slidercaptcha {
  .card-body {
    // padding: 1rem;
    position: relative;
    width: 278px;
    height: 155px;
  }
  .ico {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 3;
  }

  .yes {
    position: absolute;
    width: 280px;
    height: 42px;
    // bottom: -46px;
    text-align: center;
    line-height: 42px;
  }
}

// .slidercaptcha

.slidercaptcha canvas:first-child {
  border-radius: 4px;
  border: 1px solid #e6e8eb;
}

:deep(.slidercaptcha) {
  .block {
    position: absolute;
    left: 0;
    top: 0;
  }

  .card {
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
  }

  // .card-header {
  // padding: 0.75rem 1.25rem;
  // margin-bottom: 0;
  // background-color: rgba(0, 0, 0, 0.03);
  // border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  // }

  .card-header:first-child {
    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
  }

  // .card-body {
  //   flex: 1 1 auto;
  //   padding: 1.25rem;
  // }

  .sliderContainer {
    position: relative;
    text-align: center;
    line-height: 40px;
    background: #f7f9fa;
    color: #45494c;
    border-radius: 2px;
  }

  .sliderbg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    background-color: #f7f9fa;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #e6e8eb;
  }

  .sliderContainer_active .slider {
    top: -1px;
    border: 1px solid #1991fa;
  }

  .sliderContainer_active .sliderMask {
    border-width: 1px 0 1px 1px;
  }

  .sliderContainer_success .slider {
    top: -1px;
    border: 1px solid #52ccba;
    background-color: #52ccba !important;
  }

  .sliderContainer_success .sliderMask {
    border: 1px solid #52ccba;
    border-width: 1px 0 1px 1px;
    background-color: #d2f4ef;
  }

  .sliderContainer_success .sliderIcon:before {
    content: "\f00c";
  }

  .sliderContainer_fail .slider {
    top: -1px;
    border: 1px solid #f57a7a;
    background-color: #f57a7a !important;
  }

  .sliderContainer_fail .sliderMask {
    border: 1px solid #f57a7a;
    background-color: #fce1e1;
    border-width: 1px 0 1px 1px;
  }

  .sliderContainer_fail .sliderIcon:before {
    content: "\f00d";
  }

  .sliderContainer_active .sliderText,
  .sliderContainer_success .sliderText,
  .sliderContainer_fail .sliderText {
    display: none;
  }

  .sliderMask {
    position: absolute;
    left: 0;
    top: 0;
    height: 40px;
    border: 0 solid #1991fa;
    background: #d1e9fe;
    border-radius: 2px;
  }

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    background: #fff;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: background 0.2s linear;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slider:hover {
    background: #1991fa;
  }

  .slider:hover .sliderIcon {
    background-position: 0 -13px;
  }

  .sliderText {
    position: relative;
  }

  .refreshIcon {
    position: absolute;
    right: 0;
    // top: 0;
    top: -60px;
    cursor: pointer;
    margin: 6px;
    // color: rgba(0, 0, 0, 0.25);
    color: #000;
    font-size: 1rem;
    z-index: 5;
    transition: color 0.3s linear;
  }

  .refreshIcon:hover {
    color: #6c757d;
  }
}
</style>
