<template>
  <svg
    v-if="icon.name"
    class="icon"
    :class="setIconClass"
    :width="icon.width"
    :height="icon.height"
  >
    <use :xlink:href="`/sprite.svg#${icon.name}`"></use>
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { IIcon } from "@/components/types";

@Component
export default class IconSvg extends Vue {
  @Prop({ required: true }) icon!: IIcon;
  get setIconClass() {
    return [`icon-${this.icon.name}`];
  }
}
</script>
