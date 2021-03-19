<template>
  <textarea
    ref="input"
    cols="30"
    rows="10"
    @input="handleInput"
    placeholder="Paste english here"
    @select="handleSelect"
  ></textarea>
</template>

<script lang='ts'>
import { defineComponent, onMounted, Ref, ref } from "vue";
import caches from '../utils/caches'; 

export default defineComponent({
  setup(props, { emit }) {
    //   过早优化
    //   growUp when scrollHeight > clientHeight

    function growUp(): void {
      const input_ele: HTMLTextAreaElement|null = input.value;
      if (input_ele && input_ele.scrollHeight > input_ele.clientHeight) {
        //   input_ele.style.height = input_ele.scrollHeight + 'px';
      }
    }
    
    const input:Ref<HTMLTextAreaElement|null> = ref(null);

    let id: number | undefined;
    function handleInput(): void {
      if (id) {
        clearTimeout(id);
      }
      id = setTimeout(() => {
        let input_ele: HTMLTextAreaElement | null = input.value;
        if(!input_ele) return
        input_ele.value = input_ele.value
          .replace(/-\n/g, "")
          .replace(/\n/g, "")
          .replace(/(?<!\d)\.(?!\d)/g, ".\n");
        emit("translateParagraph", input_ele.value);
        caches.setInput(input_ele.value)
      }, 500);
    }
    let w_id: number|undefined
    function handleSelect(e: Event) {
      // console.log("选中le");
      clearTimeout(w_id);
      w_id = setTimeout(()=>{
        const target:HTMLTextAreaElement = e.target as HTMLTextAreaElement
      if(!target) return
      const seleted = target.value.substr(target.selectionStart,target.selectionEnd - target.selectionStart)
      emit("translateWord",seleted)
      },0)
    }

    onMounted(()=>{
      input.value && (input.value.value = caches.getInput())
    })

    return {
      input,
      growUp,
      handleInput,
      handleSelect,
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