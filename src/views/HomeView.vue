<template>
  <div class="home">
    <div class="home__content">
      <div class="textarea-block">
        <TextArea v-model="textareaContent.input" name="inputTextarea" />
        <p class="textarea-block__length">
          {{ textareaContent.input.length }} / {{ maxLength }}
        </p>
      </div>

      <div class="textarea-block">
        <TextArea v-model="textareaContent.output" name="outputTextarea" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TextArea from "@/components/TextArea.vue";
import { IPost, textareaContent } from "@/views/types";
import axios from "axios";

@Component({
  components: {
    TextArea,
  },
})
export default class HomeView extends Vue {
  post: IPost | null = null;
  maxLength = 5000;
  textareaOptions: object = {};
  textareaContent: textareaContent = {
    input: "",
    output: "",
  };
  private async getPost() {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      this.post = data;
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
