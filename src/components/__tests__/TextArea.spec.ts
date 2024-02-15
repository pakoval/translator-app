import { shallowMount, Wrapper } from "@vue/test-utils";
import TextArea from "@/components/TextArea.vue";

describe("TextArea.vue", () => {
  let wrapper: Wrapper<TextArea>;
  let vm: any;

  beforeEach(() => {
    wrapper = shallowMount(TextArea, {
      propsData: {
        placeholder: "Type text..",
      },
    });
    vm = wrapper.vm;
  });

  it("does a wrapper exist", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it("check class of TextArea", () => {
    expect(wrapper.classes()).toContain("textarea");
  });

  it("check placeholder", () => {
    expect(wrapper.attributes("placeholder")).toBe("Type text..");
  });

  it("should set isReadonly", async () => {
    expect(vm.isReadonly).toBeFalsy();
    await wrapper.setProps({ isReadonly: true });
    expect(wrapper.find("textarea").element.getAttribute("readonly")).toBe(
      "readonly"
    );
  });

  describe("textareaAdjust", () => {
    const smallText = "hello";

    it("should emit input event", async () => {
      await wrapper.find("textarea").setValue("k");
      expect(wrapper.emitted("input")).toBeTruthy();
    });

    it("should emit value", async () => {
      await wrapper.setValue(smallText);
      expect(wrapper.emitted().input).toEqual([[smallText]]);
      expect(wrapper.emitted().input).toBeTruthy();
    });

    it("check resizing of fontSize", async () => {
      const text =
        "From friday i was starting test custom textarea component and I wrote couple tests for him. Faced with issue which related with typing in field. i'll try to overcome this soon. About main page still remaining 1 test for fixing. So today i'm planning to resolve these 2 issues at least and test custom Select component. If these tasks will take less day i'll pass one course at the end end end end end end";

      const textareaEl = wrapper.element as HTMLTextAreaElement;
      await wrapper.setValue(text);
      expect(textareaEl.value).toEqual(text);
      expect(textareaEl.style.fontSize).toBe("18px");

      await wrapper.setValue(smallText);
      expect(textareaEl.value).toEqual(smallText);
      expect(textareaEl.style.fontSize).toBe("22px");
    });
  });

  it("check setValue", async () => {
    const textareaEl = wrapper.element as HTMLTextAreaElement;
    expect(textareaEl.value).toEqual("");
    await wrapper.setValue("hi");
    expect(textareaEl.value).toEqual("hi");
  });
});
