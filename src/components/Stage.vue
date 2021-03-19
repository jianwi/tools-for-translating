<template>
  <div id="stage" ref="stage" v-show="text"></div>
</template>

<script lang='ts'>
import { defineComponent, Ref, ref, watch } from "vue";
export default defineComponent({
  props: {
    text: {
      type: String,
    },
  },
  setup(props) {
    const ch_text = ref();
    const stage: Ref<HTMLDivElement | null> = ref(null);

    watch(props, function () {
      // console.log("props变化");
      stage.value && (stage.value.innerHTML = "")
      const p_arr: string[] = props.text ? props.text.split("\n") : [];
      // console.log(p_arr);

      // ch_text.value
      for (const p of p_arr) {
        if(p === "") continue
        const p_ele: HTMLParagraphElement = document.createElement("p");
        p_ele.style.margin = '7px'
        p_ele.innerText = p;
        stage.value && stage.value.append(p_ele);
      }
    });

    return {
      ch_text,
      stage,
    };
  },
});
</script>

<style lang="less" scoped>
#stage {
  margin: 50px auto 0 auto;
  width: 100%;
  min-height: 90px;
  background-image: url(../assets/bg.png);
  align-items: center;
  justify-content: center;
  padding: 15px;
  text-indent: 2em;
  box-sizing: border-box;
  
} 

p{
  max-width: 1100px;
  width: 95%;
  padding: 3px 25px;
  font-size: 1em;
  letter-spacing: 3.2px;
  white-space: pre-line;
  color: #0d141e;
  font-weight: 400;
  margin: 1px;
}
</style>