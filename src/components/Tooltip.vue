<template>
  <div class="tooltip">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Tooltip extends Vue {
  @Prop({ default: "" }) readonly message!: string;
}
</script>

<style lang="scss" scoped>
.tooltip {
  position: absolute;
  width: max-content;
  border: 1px #bebebe solid;
  padding: 5px;
  font-size: 12px;
  border-radius: 3px;
  background-color: #41475c;
  color: #bebebe;
  transition: 0.5s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
