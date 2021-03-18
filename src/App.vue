<template>
  <header>Tool for translating (v2)</header>
  <div class="input-wrap">
    <input-box
      @translateParagraph="handleTranslateParagraph"
      @translateWord="handleTranslateWord"
    />
    <translate-box :text="paragraph_ch" />
  </div>
  <stage :text="word_ch" />
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import InputBox from "./components/InputBox.vue";
import Stage from "./components/Stage.vue";
import TranslateBox from "./components/TranslateBox.vue";

export default defineComponent({
  name: "App",
  setup() {
    // let en = ref("");
    const paragraph_ch = ref("");
    const word_ch = ref("");

    watch(paragraph_ch, async (str) => {
      console.log("变化咯", str);
      word_ch.value = await str;
    });

    async function handleTranslateParagraph(en: string): Promise<void> {
      paragraph_ch.value = await en2ch(en);
    }
    async function handleTranslateWord(en_word: string): Promise<void> {
      word_ch.value = await en2ch(en_word);
    }

    async function en2ch(en: string) {
      let res = "";
      let req = await fetch("http://f.jialidun.vip/t.php", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `q=${en}`,
      });
      if (req.ok) {
        let text = await req.text();
        let data_json = JSON.parse(text);
        console.log(data_json)
        if (data_json) {
          for (let r of data_json.trans_result) {
            res += r.dst + "\n";
          }
        }
      }
      return res;
    }

    return {
      handleTranslateParagraph,
      paragraph_ch,
      handleTranslateWord,
      word_ch,
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
