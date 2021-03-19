<template>
  <header>Tool for translating (v2)</header>
  <div class="input-wrap">
    <input-box
      @translateParagraph="handleTranslateParagraph"
      @translateWord="handleTranslateWord"
    />
    <translate-box :text="paragraph_ch" @chChange="handleChChange" />
  </div>
  <stage :text="word_ch" />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import InputBox from "./components/InputBox.vue";
import Stage from "./components/Stage.vue";
import TranslateBox from "./components/TranslateBox.vue";
import en2ch from "./utils/en2ch";
import caches from "./utils/caches";

export default defineComponent({
  name: "App",
  setup() {
    const paragraph_ch = ref("");
    const word_ch = ref("");
    watch(paragraph_ch,function(val){
      word_ch.value = val;
    })

    async function handleTranslateParagraph(en: string): Promise<void> {
      paragraph_ch.value = await en2ch(en);
      caches.setTranslated(paragraph_ch.value)
    }
    async function handleTranslateWord(en_word: string): Promise<void> {
      word_ch.value = await en2ch(en_word);
    }

    function handleChChange(val: string) {
      paragraph_ch.value = val;
      caches.setTranslated(val)
    }
    
    onMounted(()=>{
        paragraph_ch.value = caches.getTranslated()
    })
    return {
      handleTranslateParagraph,
      paragraph_ch,
      handleTranslateWord,
      word_ch,
      handleChChange,
    };
  },
  components: {
    InputBox,
    TranslateBox,
    Stage,
  },
});
</script>

<style>
body {
  width: 99vw;
  max-width: 1300px;
  margin: auto;
  padding: 0;
}
header {
  text-align: center;
  padding: 10px;
  margin: 15px 0 12px 0;
}
.input-wrap {
  height: 55vh;
  display: flex;
  justify-items: center;
  margin: auto;
  padding: 0;
}
</style>
