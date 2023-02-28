import { ref, onMounted, watch } from "vue";
export default function (props: any) {
  const config = ref(props);

  const createConfig = () => {
    config.value = { ...config.value, ...props };
    delete config.value.config;
    if (!props.config) return;
    config.value = { ...config.value, ...props.config };
  };

  onMounted(() => {
    createConfig();
  });

  watch(props, () => {
    // console.log('变了',props);
    createConfig();
  });
  return config;
}
