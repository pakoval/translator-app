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
        <TextArea :value="outputTextarea" :isReadonly="true" />
        <Button
          v-clipboard:copy="outputTextarea"
          v-clipboard:success="copySuccess"
          v-clipboard:error="copyError"
          :class="copyBtnClass"
        >
          <IconSvg :icon="icon" />
        </Button>
        <transition name="fade">
          <Tooltip v-if="copyMessage" :message="copyMessage" />
        </transition>
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
import Button from "@/components/Button.vue";
import Tooltip from "@/components/Tooltip.vue";
import IconSvg from "@/components/IconSvg.vue";
import { IIcon } from "@/components/types";

@Component({
  components: {
    IconSvg,
    Tooltip,
    Button,
    TextArea,
  },
})
export default class HomeView extends Vue {
  maxLength = 5000;
  private inputTextarea = "";
  private outputTextarea = "";
  copyMessage = "";
  icon: IIcon = {
    name: "copy",
    width: "18px",
    height: "18px",
  };
  get copyBtnClass() {
    return this.outputTextarea ? "button__copy" : "button__copy--disabled";
  }

  sendTextDebounce = debounce(this.sendText, 1000);
  copyError = () => this.setTooltipMsg("Error: not copied");
  copySuccess = () => this.setTooltipMsg("Copied successful");
  setTooltipMsg(msg: string) {
    this.copyMessage = msg;
    setTimeout(() => {
      this.copyMessage = "";
    }, 2000);
  }
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
