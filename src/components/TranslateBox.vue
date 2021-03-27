<template>
<div class="wrap">
  <div class="btn-group">
    <btn @click="handleTrim">去除空白</btn>
    <btn @click="handleCopy">复制结果</btn>
    <btn @click="handleTaC">去除空白并复制</btn>
  </div>
  <textarea ref="input" cols="30" rows="10" v-model="ch_text"></textarea>
</div>
</template>

<script lang='ts'>
import { computed, defineComponent } from "vue";
import Btn from "./Btn.vue";
export default defineComponent({
  components: { Btn },
  props: {
    text: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const ch_text = computed({
      get() {
        return props.text;
      },
      set(val: string | undefined) {
        if (val) {
          emit("chChange", val);
        }
      },
    });

  async function handleCopy(){
    const clipboard = navigator.clipboard;
    if(!(clipboard&&props.text)) return
    await clipboard.writeText(props.text)
  }

  function handleTrim(){
    return ch_text.value = ch_text.value ? ch_text.value.replaceAll("\n",' '):'复制失败';
  }
  function handleTaC() {
    handleTrim()
    setTimeout(handleCopy,0)
  }

    return {
      ch_text,
      handleCopy,
      handleTrim,
      handleTaC
    };
  },
});
</script>
<style scoped>
@import url(../style/box.css);
</style>