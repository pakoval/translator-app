<template>
  <div class="home">
    <div class="home__select-block">
      <div class="home__option">
        <span class="home__subtitle">Language:</span>
        <Select
          :selectedOption="selectedLangs.sourceLang"
          :list="languages"
          @change="(args) => changeLanguage(args, 'sourceLang')"
        />
      </div>
      <Button @click="swapLanguages">
        <IconSvg :icon="iconMirror" />
      </Button>
      <div class="home__option">
        <span class="home__subtitle">Translate:</span>
        <Select
          :selectedOption="selectedLangs.targetLang"
          :list="languages"
          @change="(value) => changeLanguage(value, 'targetLang')"
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
        <Button class="save-text" @click="saveTranslation">
          <IconSvg :icon="iconStar" />
        </Button>
        <Loader v-if="loading" />
        <TextArea
          :value="outputTextarea"
          isReadonly="true"
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
    <transition name="slide">
      <SavedTranslations
        v-show="openSidebar"
        :open-sidebar="openSidebar"
        :translation="translation"
        @hide="(isHidden) => (openSidebar = isHidden)"
      />
    </transition>
    <Button class="saved-translations" @click="openSidebar = !openSidebar">
      <IconSvg :icon="iconStar" /> Saved
    </Button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TextArea from "@/components/TextArea.vue";
import { sendToTranslate } from "@/translation/request";
import { debounce } from "lodash";
import Button from "@/components/Button.vue";
import Tooltip from "@/components/Tooltip.vue";
import IconSvg from "@/components/IconSvg.vue";
import { IIcon, ITranslation } from "@/components/types";
import { langs, Languages } from "@/languages";
import Loader from "@/components/Loader.vue";
import Select from "@/components/Select.vue";
import { TLangs } from "@/views/types";
import SavedTranslations from "@/components/SavedTranslations.vue";
import { selectLanguagesModule } from "@/store/modules/SelectLanguages";
@Component({
  components: {
    SavedTranslations,
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
  outputTextarea = "";
  copyMessage = "";
  isError = false;
  loading = false;
  openSidebar = false;

  iconCopy: IIcon = {
    name: "copy",
    width: "28px",
    height: "28px",
  };
  iconMirror: IIcon = {
    name: "exchange",
    width: "28px",
    height: "28px",
  };
  iconStar: IIcon = {
    name: "star",
    width: "22px",
    height: "28px",
  };
  languages = langs;
  translation: ITranslation | null = null;
  get copyBtnClass() {
    return this.outputTextarea && !this.isError && !this.loading
      ? "button__copy"
      : "button__copy--disabled";
  }

  get selectedLangs() {
    return selectLanguagesModule.selectedLangs;
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
  saveTranslation() {
    this.translation = {
      id: Date.now(),
      inputText: this.inputTextarea,
      translation: this.outputTextarea,
      targetLang: this.selectedLangs.targetLang,
      sourceLang: this.selectedLangs.sourceLang,
    };
  }
  async changeLanguage(value: Languages, selectName: TLangs) {
    selectLanguagesModule.changeStorageLanguages({ value, selectName });
    await this.sendText();
  }
  async swapLanguages() {
    selectLanguagesModule.swapStorageLanguages();
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
          this.selectedLangs.sourceLang,
          this.selectedLangs.targetLang,
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
  created() {
    selectLanguagesModule.getSelectedLanguages();
  }
}
</script>
