<template>
  <div class="home">
    <div class="home__select-block">
      <div class="home__option">
        <span class="home__subtitle">Language:</span>
        <Select
          :selectedOption="sourceLang"
          :list="languages"
          name="sourceLang"
          @change="changeLanguage"
        />
      </div>
      <Button @click="swapLanguages">
        <IconSvg :icon="iconMirror" />
      </Button>
      <div class="home__option">
        <span class="home__subtitle">Translate:</span>
        <Select
          :selectedOption="targetLang"
          :list="languages"
          name="targetLang"
          @change="changeLanguage"
        />
      </div>
    </div>
    <div class="home__content">
      <div class="textarea-block">
        <TextArea v-model="inputTextarea" @input="sendTextDebounce" />
        <p class="textarea-block__length">
          {{ inputTextarea.length }} / {{ maxLength }}
        </p>
      </div>

      <div class="textarea-block">
        <Loader v-if="loading" />
        <TextArea
          :value="outputTextarea"
          :isReadonly="true"
          placeholder="Translation"
          :class="{ 'textarea--error': isError, 'textarea--loading': loading }"
        />
        <Button
          v-clipboard:copy="outputTextarea"
          v-clipboard:success="copySuccess"
          v-clipboard:error="copyError"
          :class="copyBtnClass"
        >
          <IconSvg :icon="iconCopy" />
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
import { langs } from "@/languages";
import Loader from "@/components/Loader.vue";
import Select from "@/components/Select.vue";

@Component({
  components: {
    Select,
    Loader,
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
  isError = false;
  loading = false;

  iconCopy: IIcon = {
    name: "copy",
    width: "18px",
    height: "18px",
  };
  iconMirror: IIcon = {
    name: "exchange",
    width: "18px",
    height: "18px",
  };
  languages = langs;
  targetLang = "uk";
  sourceLang = "en";
  get copyBtnClass() {
    return this.outputTextarea && !this.isError && !this.loading
      ? "button__copy"
      : "button__copy--disabled";
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
  async changeLanguage(value: string, selectName: string) {
    if (selectName === "sourceLang" || selectName === "targetLang") {
      this[selectName] = value;
      await this.sendText();
    }
  }
  async swapLanguages() {
    [this.targetLang, this.sourceLang] = [this.sourceLang, this.targetLang];
    this.inputTextarea = this.outputTextarea;
    this.outputTextarea = "";
    await this.sendText();
  }
  async sendText() {
    const text = this.inputTextarea;
    if (text.trim()) {
      this.loading = true;
      try {
        this.outputTextarea = await sendToTranslate(
          this.sourceLang,
          this.targetLang,
          text
        );
        this.isError = false;
      } catch (e) {
        this.isError = true;
        this.outputTextarea = "Failed to translate. Please try again later";
      } finally {
        this.loading = false;
      }
    } else {
      this.outputTextarea = "";
    }
  }

  async mounted() {
    await getPhones();
    await addProduct();
    await deleteProduct(1);
  }
}
</script>
