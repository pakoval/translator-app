<template>
  <div class="home">
    <div class="home__content">
      <TextArea />
      <TextArea />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TextArea from "@/components/TextArea.vue";
import { IPost } from "@/views/types";
import axios from "axios";

@Component({
  components: {
    TextArea,
  },
})
export default class HomeView extends Vue {
  post: IPost | null = null;
  async mounted() {
    // await this.getPost();
  }
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
