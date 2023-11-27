<template>
  <div class="home">
    <div class="home__content">
      <div class="textarea-block">
        <TextArea v-model="inputTextarea" @input="sendTextDebounce" />
        <p class="textarea-block__length">
          {{ inputTextarea.length }} / {{ maxLength }}
        </p>
      </div>

      <div class="textarea-block">
        <TextArea :value="outputTextarea" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TextArea from "@/components/TextArea.vue";
import {
  addProduct,
  sendToTranslate,
  deleteProduct,
  getPhones,
} from "@/translation/request";
import { debounce } from "lodash";

@Component({
  components: {
    TextArea,
  },
})
export default class HomeView extends Vue {
  maxLength = 5000;
  inputTextarea = "";
  outputTextarea = "";

  sendTextDebounce = debounce(this.sendText, 1000);
  async sendText() {
    this.outputTextarea = await sendToTranslate("en", "uk", this.inputTextarea);
  }
  async mounted() {
    await getPhones();
    await addProduct();
    await deleteProduct(1);
  }
}
</script>
