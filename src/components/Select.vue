<template>
  <select v-model="selected" class="select">
    <option
      v-for="(item, idx) in list"
      :key="idx"
      :value="item.code"
      class="select__option"
    >
      {{ item.language }}
    </option>
  </select>
</template>

<script lang="ts">
import { Vue, Component, Prop, ModelSync } from "vue-property-decorator";
import { ILanguage } from "@/views/types";
import { Languages } from "@/languages";
@Component
export default class Select extends Vue {
  @Prop({ default: () => [] }) list!: ILanguage[];
  @Prop({ required: true }) selectedOption!: Languages;
  @ModelSync("selectedOption", "change") selected!: Languages;
}
</script>
