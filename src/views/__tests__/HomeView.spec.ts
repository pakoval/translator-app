import {
  shallowMount,
  Wrapper,
  createLocalVue,
  WrapperArray,
} from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import Button from "@/components/Button.vue";
import VueClipboard from "vue-clipboard2";
import Select from "@/components/Select.vue";
import TextArea from "@/components/TextArea.vue";
import { Languages } from "@/languages";
import { ILanguage, TLangs } from "@/views/types";
import Loader from "@/components/Loader.vue";
import Tooltip from "@/components/Tooltip.vue";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve()),
}));

const localVue = createLocalVue(Button);
localVue.use(VueClipboard);

describe("HomeView.vue", () => {
  let wrapper: Wrapper<HomeView>;
  let vm: any;
  beforeEach(() => {
    wrapper = shallowMount(HomeView, {
      localVue,
      stubs: {
        Button,
        Select,
        TextArea,
        Loader,
        Tooltip,
      },
      data() {
        return {
          inputTextarea: "",
          copyMessage: "copy",
        };
      },
      computed: {
        selectedLangs: (): Record<TLangs, Languages> => {
          return {
            targetLang: Languages.EN,
            sourceLang: Languages.UK,
          };
        },
      },
    });
    vm = wrapper.vm;
  });

  it("should render correct page", async () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("modelValue of inputTextarea should be updated ", async () => {
    await wrapper.findComponent(TextArea).setValue("hi");
    expect(vm.inputTextarea).toBe("hi");
  });

  it("should assign translation object", () => {
    vm.saveTranslation();
    expect(vm.translation).not.toBeNull();
  });

  it("should call getter selectedLangs", () => {
    const languages = vm.selectedLangs;
    expect(vm.selectedLangs).toEqual(languages);
  });

  it("should to call changeLanguage", async () => {
    vm.changeLanguage = jest.fn();
    await vm.changeLanguage(Languages.UK, "sourceLang");
    expect(vm.changeLanguage).toHaveBeenCalledWith(Languages.UK, "sourceLang");
  });

  it("should to call swapLanguages", async () => {
    vm.swapLanguages = jest.fn();
    const btn = wrapper.findComponent(Button);
    await wrapper.setData({ outputTextarea: "hi" });
    expect(vm.outputTextarea).toEqual("hi");
    await btn.trigger("click");
    expect(vm.swapLanguages).toHaveBeenCalled();
  });

  it("should set class to copy Button", async () => {
    const btn = wrapper.findComponent({ ref: "copy-button" });
    expect(btn.classes()).toContain("button__copy--disabled");
    await wrapper.setData({ outputTextarea: "hi" });
    expect(btn.classes()).toContain("button__copy");
  });

  it("should render Tooltip component", async () => {
    const tooltip = wrapper.findComponent(Tooltip);
    expect(tooltip.exists()).toBe(true);
  });

  describe("Select component", () => {
    let selectOptions: WrapperArray<Vue>;
    beforeEach(async () => {
      selectOptions = wrapper.findComponent(Select).findAll("option");
    });

    it("should selected 1 option and same data", async () => {
      await selectOptions.at(1).setSelected();
      expect(wrapper.find("option").text()).toEqual("Ukrainian");
      expect(selectOptions.length).toEqual(vm.languages.length);
    });

    it("should set a new data", async () => {
      const newLangs: ILanguage[] = [
        { language: "Ukrainian", code: Languages.UK },
        { language: "English", code: Languages.EN },
      ];
      await wrapper.setData({ languages: newLangs });
      expect(newLangs.length).toEqual(vm.languages.length);
    });
  });

  describe("Loader", () => {
    let loader: Wrapper<Loader>;
    beforeEach(() => {
      loader = wrapper.findComponent(Loader);
    });

    it("should don't render when loading false", () => {
      expect(loader.exists()).toBe(false);
    });

    it("should render when loading is true", async () => {
      await wrapper.setData({ loading: true });
      expect(vm.loading).toBe(true);
    });
  });
});
