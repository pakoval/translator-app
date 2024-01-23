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
  const translations: ITranslation[] = [translation];
  let wrapper: Wrapper<SavedTranslations>;
  let wrapperBtn: Wrapper<Button>;

  beforeEach(() => {
    wrapper = shallowMount(SavedTranslations, {
      propsData: {
        openSidebar: true,
        translation,
      },
    });
    wrapperBtn = shallowMount(Button);
  });

  it("should exists the component", () => {
    expect(wrapper.findComponent(SavedTranslations).exists()).toBeTruthy();
  });

  it("should render with props", () => {
    expect(wrapper.props("openSidebar")).toBeTruthy();
    expect(wrapper.props("translation")).toEqual(translation);
  });

  it("should set class to the component", () => {
    const asideEl = wrapper.find("aside");
    expect(asideEl.classes()).toContain("translations");
  });

  it("should get/set translations from localStorage", () => {
    localStorage.setItem("translations", JSON.stringify([translation]));
    const translationItems = JSON.parse(
      localStorage.getItem("translations") || "{}"
    );
    expect(translations).toEqual(translationItems);
  });

  it("should emit click event when clicked", async () => {
    await wrapperBtn.trigger("click");
    expect(wrapperBtn.emitted().click).toBeTruthy();
  });

  it("should to change props data", async () => {
    const newProp: ITranslation = {
      id: 2,
      inputText: "жінка",
      translation: "woman",
      targetLang: Languages.EN,
      sourceLang: Languages.UK,
    };
    await wrapper.setProps({
      translation: newProp,
    });
    expect(wrapper.props("translation")).toBe(newProp);
  });
});
