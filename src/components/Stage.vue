<template>
  <div id="stage" v-text="text">
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  props:{
    text: {
      type: String
    }
  },
  setup() {
      return {}
  },
});
</script>

<style scoped>
#stage {
  margin: 50px auto 0 auto;
  width: 100%;
  height: 90px;
  background-image: url(../assets/bg.png);
  display: flex;
  align-items: center;
  justify-content: center;
}
#stage p {
  max-width: 1100px;
  width: 95%;
  line-height: 1.7rem;
  padding: 3px 25px;
  font-size: 1em;
  letter-spacing: 3.2px;
  text-indent: 2em;
  white-space: pre-line;
  color: #0d141e;
  font-weight: 400;
  margin: 2px;
}
</style>