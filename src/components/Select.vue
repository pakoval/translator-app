<template>
  <select class="select" :name="name" @change="changeOption">
    <option
      v-for="(item, idx) in list"
      :key="idx"
      :value="item.code"
      :selected="item.code === selectedOption"
      class="select__option"
    >
      {{ item.language }}
    </option>
  </select>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ILanguage } from "@/views/types";

@Component
export default class Select extends Vue {
  @Prop({ default: [] }) list!: ILanguage[];
  @Prop({ required: true }) name!: string;
  @Prop({ required: true }) selectedOption!: string;

  changeOption(e: Event) {
    const option = e.target as HTMLSelectElement;
    this.$emit("change", option.value, option.name);
  }
}
</script>
