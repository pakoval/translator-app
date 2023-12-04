<template>
  <span class="loader"></span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Loader extends Vue {
  @Prop({ default: false }) isLoad!: boolean;
}
</script>
