<template>
  <textarea id="input" cols="30" rows="10" :value='text'></textarea>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  props:{
    text:{
      type:String
    }
  },
  setup() {
    return {
    };
  },
});
</script>
<style scoped>
textarea {
  font-size: 16px;
  resize: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  margin: 0 0.3em;
  padding: 10px;
  line-height: 20px;
}
</style>