<template>
  <textarea class="textarea" @keyup="textAreaAdjust" ref="txtArea"></textarea>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class TextArea extends Vue {
  textAreaAdjust() {
    const textarea: HTMLTextAreaElement | null = this.$refs
      .txtArea as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = Math.max(25, textarea.scrollHeight) + "px";
    }
  }
}
</script>
