<template>
  <textarea
    class="textarea"
    :value="setValue()"
    :readonly="isReadonly"
    @input="textareaAdjust"
  ></textarea>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class TextArea extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop({ default: false }) readonly isReadonly!: boolean;
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
