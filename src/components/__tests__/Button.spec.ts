import { shallowMount, Wrapper } from "@vue/test-utils";
import Button from "@/components/Button.vue";

describe("Button.vue", () => {
  let wrapper: Wrapper<Button>;
  beforeEach(() => {
    wrapper = shallowMount(Button, {
      slots: {
        default: "I'm a button",
      },
    });
  });
  it("emit click event when clicked", async () => {
    await wrapper.trigger("click");
    expect(wrapper.emitted().click).toBeTruthy();
  });
  it("renders slot content", () => {
    expect(wrapper.text()).toContain("I'm a button");
  });
});
