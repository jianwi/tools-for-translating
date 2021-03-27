<template>
  <button ref="btn" :class="isDown?'down':'up'">
    <slot>按钮</slot>
  </button>
</template>

<script lang='ts'>
import { defineComponent, onMounted, Ref, ref } from "vue";
export default defineComponent({
    setup(){
        const btn:Ref<null|HTMLButtonElement> = ref(null);
        const isDown:Ref = ref(false);

        onMounted(()=>{
            if(!btn.value) return
            const button = btn.value;
            button.addEventListener("mousedown",()=>{
                console.log('down')
                isDown.value = true
            })
            button.addEventListener("mouseup",()=>{
                isDown.value = false
            })
        })
        return {
            btn,
            isDown
        }
    }
});
</script>

<style scoped>
button {
  min-width: 80px;
  height: 33px;
  background: transparent;
  border: 1px solid;
  outline: none;
  margin: 3px;
}
.down{
    background: rgb(166, 240, 191);
}
.up{
    background: transparent;
}
</style>