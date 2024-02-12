import { shallowMount, Wrapper } from "@vue/test-utils";
import TextArea from "@/components/TextArea.vue";

describe("TextArea.vue", () => {
  let wrapper: Wrapper<TextArea>;
  let vm: any;

  beforeEach(() => {
    wrapper = shallowMount(TextArea, {
      propsData: {
        placeholder: "Type text..",
        value: "pop",
      },
    });
    vm = wrapper.vm;
  });

  it("check existence of TextArea", () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it("check class of TextArea", () => {
    expect(wrapper.classes()).toContain("textarea");
  });

  it("check placeholder", () => {
    expect(wrapper.attributes("placeholder")).toBe("Type text..");
  });
});
