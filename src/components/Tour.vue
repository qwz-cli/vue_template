<template>
  <v-tour  :name="props.name" :steps="config.steps" :options="config.options" />
</template>
<script setup lang="ts">
// import VueTour from "v3-tour";
import { reactive, onMounted, Ref ,ref} from "vue";
import type { Options_tour, Steps_tour } from "@/type/tour";
import useComponent from "@/hooks/useComponent";
// import {} from
interface Props {
  name: string;
  steps?: Steps_tour;
  options?: Options_tour;
  config?: {};
}
// const tourRef =ref()
const props = defineProps<Props>();
const config: Ref<Props> = useComponent(props);

onMounted(()=>{
    console.log(21,props,config.value);
})
</script>
<style scoped>
/* .v-tour__target--highlighted {
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.4) !important;
} */
</style>
