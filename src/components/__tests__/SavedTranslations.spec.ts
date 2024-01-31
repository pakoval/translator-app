import { shallowMount, Wrapper } from "@vue/test-utils";
import SavedTranslations from "@/components/SavedTranslations.vue";
import { ITranslation } from "@/components/types";
import { Languages } from "@/languages";
import Button from "@/components/Button.vue";

jest.spyOn(Object.getPrototypeOf(window.localStorage), "getItem");
jest.spyOn(Object.getPrototypeOf(window.localStorage), "setItem");

describe("SavedTranslations", () => {
  const translation: ITranslation = {
    id: 1,
    inputText: "привіт",
    translation: "hi",
    targetLang: Languages.EN,
    sourceLang: Languages.UK,
  };
  const secondTranslation: ITranslation = {
    id: 2,
    inputText: "жінка",
    translation: "woman",
    targetLang: Languages.EN,
    sourceLang: Languages.UK,
  };
  let wrapper: Wrapper<SavedTranslations>;
  let vm: any;

  beforeEach(() => {
    wrapper = shallowMount(SavedTranslations, {
      propsData: {
        openSidebar: true,
        translation,
      },
      stubs: {
        Button,
      },
    });
    vm = wrapper.vm;
  });

  it("should exists the component", () => {
    expect(wrapper.findComponent(SavedTranslations).exists()).toBeTruthy();
  });

  it("should render with props", () => {
    expect(wrapper.props("openSidebar")).toBeTruthy();
    expect(wrapper.props("translation")).toEqual(translation);
  });

  it("should set class to the component", async () => {
    const asideEl = wrapper.find("aside");
    expect(asideEl.classes()).toContain("translations");
    await wrapper.setProps({
      openSidebar: false,
    });
    expect(asideEl.classes()).toEqual(
      expect.arrayContaining(["translations", "hide"])
    );
  });

  it("should get/set translations from localStorage", () => {
    localStorage.setItem("translations", JSON.stringify([translation]));
    vm.getTranslations();
    const translationItems = JSON.parse(
      localStorage.getItem("translations") || "{}"
    );
    expect(vm.translations).toEqual(translationItems);
  });

  it("should emit click event when clicked", async () => {
    const btn = wrapper.findComponent(Button);
    await btn.trigger("click");
    expect(wrapper.emitted().hide).toBeTruthy();
    const resultHide = vm.hide();
    expect(resultHide).toBe(false);
  });

  it("should to push to translations a new prop", async () => {
    expect(vm.translations.length).toEqual(1);
    await wrapper.setProps({
      translation: secondTranslation,
    });
    expect(wrapper.props("translation")).toBe(secondTranslation);
    expect(vm.translation).toEqual(secondTranslation);
    expect(vm.translations.length).toEqual(2);
    expect(vm.translations).toEqual([translation, secondTranslation]);
  });

  it("should remove item by removeItem and check in the markup", () => {
    localStorage.setItem(
      "translations",
      JSON.stringify([translation, secondTranslation])
    );
    vm.removeItem(2);
    expect(vm.translations).toEqual([translation]);
    const el = wrapper.find(".translations__item-input-text");
    expect(el.text()).toContain(translation.inputText);
  });
});
