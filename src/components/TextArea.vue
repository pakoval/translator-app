<template>
  <textarea class="textarea" @input="textareaAdjust"></textarea>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class TextArea extends Vue {
  textareaAdjust(e: KeyboardEvent) {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    this.$emit("input", textarea.value);

    textarea.value.length >= 400
      ? (textarea.style.fontSize = "18px")
      : (textarea.style.fontSize = "22px");
  }
}
</script>
