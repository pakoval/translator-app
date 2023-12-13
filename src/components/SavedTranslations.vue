<template>
  <aside :class="setSidebarClass">
    <div class="translations__header">
      <div class="translations__header-top">
        <h2 class="translations__header-title">Saved translations</h2>
        <Button @click="hide">
          <IconSvg :icon="iconClose" />
        </Button>
      </div>
      <p class="translations__quantity">
        All of expressions: {{ translations.length }}
      </p>
    </div>
    <ul class="translations__list">
      <li
        v-for="item in translations"
        :key="item.id"
        class="translations__item"
      >
        <div class="translations__item-info">
          <div class="translations__item-lang">
            {{ item.sourceLang.toUpperCase() }}
            <IconSvg :icon="iconArrow" />
            {{ item.targetLang.toUpperCase() }}
          </div>
          <p class="translations__item-input-text">
            {{ item.inputText }}
          </p>
          <hr class="translations__item-divider" />
          <p class="translations__item-text">
            {{ item.translation }}
          </p>
        </div>
        <div class="translations__item-remove">
          <Button @click="removeItem(item.id)">
            <IconSvg :icon="iconStar" />
          </Button>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import IconSvg from "@/components/IconSvg.vue";
import { IIcon, ITranslation } from "@/components/types";
import Button from "@/components/Button.vue";

@Component({
  components: { Button, IconSvg },
})
export default class SavedTranslations extends Vue {
  @Prop({ default: false }) openSidebar!: boolean;
  @Prop({ default: [] }) translations!: Array<ITranslation>;
  get setSidebarClass() {
    return this.openSidebar ? "translations" : "translations hide";
  }
  iconClose: IIcon = {
    name: "close",
    width: "16px",
    height: "16px",
  };

  iconStar: IIcon = {
    name: "star",
    width: "22px",
    height: "28px",
  };

  iconArrow: IIcon = {
    name: "exchange",
    width: "16px",
    height: "28px",
  };
  @Emit("hide")
  hide() {
    return !this.openSidebar;
  }
  @Emit("remove-item")
  removeItem(id: number) {
    const savedItems = JSON.parse(localStorage.translations);
    const idx = savedItems.findIndex((el: ITranslation) => el.id === id);
    savedItems.splice(idx, 1);
    return savedItems;
  }
}
</script>
