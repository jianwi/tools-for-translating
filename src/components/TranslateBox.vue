<template>
  <textarea ref="input" cols="30" rows="10" v-model="ch_text"></textarea>
</template>

<script lang='ts'>
import { computed, defineComponent } from "vue";
export default defineComponent({
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

    return {
      ch_text,
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