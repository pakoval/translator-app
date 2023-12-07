<template>
  <textarea
    class="textarea"
    :value="setValue()"
    :readonly="isReadonly"
    :placeholder="placeholder"
    @input="textareaAdjust"
  ></textarea>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class TextArea extends Vue {
  @Prop({ default: "" }) value!: string;
  @Prop({ default: false }) isReadonly!: boolean;
  @Prop({ default: "" }) placeholder!: string;
  textareaAdjust(e: KeyboardEvent) {
    const textarea = e.target as HTMLTextAreaElement;
    this.$emit("input", textarea.value);
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    textarea.value.length >= 400
      ? (textarea.style.fontSize = "18px")
      : (textarea.style.fontSize = "22px");
  }

  setValue(): string | null {
    return this.value ? this.value : null;
  }
}
</script>
