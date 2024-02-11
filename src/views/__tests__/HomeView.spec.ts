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
import { TLangs } from "@/views/types";
import Loader from "@/components/Loader.vue";
import Tooltip from "@/components/Tooltip.vue";
import { selectLanguagesModule } from "@/store/modules/SelectLanguages";
import { sendToTranslate } from "@/translation/request";

jest.mock("@/translation/request", () => ({
  sendToTranslate: jest.fn(() => Promise.resolve("привіт")),
}));
jest.mock("@/store/modules/SelectLanguages");

const localVue = createLocalVue();
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
          outputTextarea: "",
          copyMessage: "copy",
          loading: false,
        };
      },
      computed: {
        selectedLangs: () => selectLanguagesModule.selectedLanguages,
      },
    });
    vm = wrapper.vm;
    jest.clearAllMocks();
  });

  it("should render correct page", () => {
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

  it("should be equal getter selectedLangs", () => {
    const languages = {
      targetLang: Languages.EN,
      sourceLang: Languages.UK,
    };
    const l = selectLanguagesModule.selectedLangs;
    console.log(l);
    expect(vm.selectedLangs).toEqual(languages);
  });

  describe("changeLanguage", () => {
    it("should call changeLanguage", () => {
      vm.changeLanguage = jest.fn();
      const select = wrapper.findAllComponents(Select).at(0);
      select.trigger("change");
      expect(vm.changeLanguage).toHaveBeenCalledWith(
        Languages.UK,
        "sourceLang"
      );
    });

    it("check body of changeLanguage", async () => {
      vm.sendText = jest.fn();
      await vm.changeLanguage(Languages.UK, "sourceLang");
      expect(selectLanguagesModule.changeStorageLanguages).toHaveBeenCalledWith(
        {
          selectName: "sourceLang",
          value: "uk",
        }
      );
      expect(vm.sendText).toHaveBeenCalled();
    });
  });

  describe("swapLanguages", () => {
    it("should call swapLanguages", () => {
      wrapper.setData({ outputTextarea: "ok" });
      vm.sendText = jest.fn();
      wrapper.findAllComponents(Button).at(0).trigger("click");
      expect(vm.sendText).toHaveBeenCalled();
      expect(vm.outputTextarea).toEqual("");
    });

    it("check body of swapLanguages", async () => {
      vm.sendText = jest.fn();
      const text = "Hello everyone";
      await wrapper.setData({ outputTextarea: text });
      await vm.swapLanguages();
      expect(selectLanguagesModule.swapStorageLanguages).toHaveBeenCalled();
      expect(vm.inputTextarea).toEqual(text);
      expect(vm.outputTextarea).toEqual("");
      expect(vm.sendText).toHaveBeenCalled();
    });
  });

  it("should render/not render Tooltip component", async () => {
    const tooltip = wrapper.findComponent(Tooltip);
    expect(tooltip.exists()).toBe(true);
    await wrapper.setData({ copyMessage: "" });
    expect(tooltip.exists()).toBe(false);
  });

  describe("Select component", () => {
    let selectOptions: WrapperArray<Vue>;
    beforeEach(() => {
      selectOptions = wrapper.findComponent(Select).findAll("option");
    });

    it("should the length of the array of languages must match", () => {
      expect(selectOptions.length).toEqual(vm.languages.length);
    });
  });

  describe("Loader", () => {
    it("should don't render when loading false", () => {
      const loader = wrapper.findComponent(Loader);
      expect(loader.exists()).toBe(false);
      expect(vm.loading).toBe(false);
    });

    it("should render when loading is true", async () => {
      await wrapper.setData({ loading: true });
      const loader = wrapper.findComponent(Loader);
      expect(vm.loading).toBe(true);
      expect(loader.exists()).toBe(true);
    });
  });

  describe("set classes for copy Button", () => {
    it("should set button__copy--disabled class", () => {
      const btn = wrapper.findAllComponents(Button).at(2);
      expect(btn.classes()).toContain("button__copy--disabled");
    });
    it("should set class button__copy", async () => {
      const btn = wrapper.findAllComponents(Button).at(2);
      await wrapper.setData({ outputTextarea: "hi" });
      expect(btn.classes()).toContain("button__copy");
    });
  });

  describe("set classes for outputTextarea", () => {
    let textarea: Wrapper<any>;
    beforeEach(() => {
      textarea = wrapper.findAllComponents(TextArea).at(1);
    });

    it("should set textarea--error class", async () => {
      await wrapper.setData({ isError: true });
      expect(textarea.classes()).toContain("textarea--error");
    });

    it("should set textarea--loading class", async () => {
      await wrapper.setData({ loading: true });
      expect(textarea.classes()).toContain("textarea--loading");
    });

    it("should set textarea--loading && textarea--error classes", async () => {
      await wrapper.setData({ isError: true, loading: true });
      expect(textarea.classes()).toContain("textarea--loading");
      expect(textarea.classes()).toContain("textarea--error");
    });

    it("should contain just textarea class", () => {
      expect(textarea.classes()).toContain("textarea");
      expect(textarea.classes()).not.toContain("textarea--loading");
      expect(textarea.classes()).not.toContain("textarea--error");
    });
  });

  describe("sendText", () => {
    it("check body of sendText function", async () => {
      await wrapper.setData({ inputTextarea: "hi" });
      await vm.sendText();
      expect(sendToTranslate).toHaveBeenCalledWith(
        Languages.UK,
        Languages.EN,
        "hi"
      );
      expect(vm.outputTextarea).toEqual("привіт");
      expect(vm.isError).toEqual(false);
      expect(vm.loading).toEqual(false);
    });

    it("should not run sendToTranslate when text is empty", async () => {
      await wrapper.setData({ inputTextarea: "" });
      await vm.sendText();
      expect(vm.outputTextarea).toEqual("");
      expect(sendToTranslate).not.toHaveBeenCalled();
    });

    it("should throw error and run catch block", async () => {
      const errorMsg = "Failed to translate. Please try again later";
      await wrapper.setData({ inputTextarea: "hi" });
      jest
        .requireMock("@/translation/request")
        .sendToTranslate.mockRejectedValue("err");
      await vm.sendText();
      expect(vm.isError).toEqual(true);
      expect(vm.outputTextarea).toEqual(errorMsg);
    });
  });

  describe("check copyError && copySuccess functions", () => {
    jest.useFakeTimers();
    it("should be called setTooltipMsg", async () => {
      vm.setTooltipMsg = jest.fn();
      await vm.copyError();
      expect(vm.setTooltipMsg).toHaveBeenCalledWith("Error: not copied");
      await vm.copySuccess();
      expect(vm.setTooltipMsg).toHaveBeenCalledWith("Copied successful");
    });

    it("should set error message and clear it after 2s", async () => {
      await vm.copyError();
      expect(vm.copyMessage).toEqual("Error: not copied");
      jest.advanceTimersByTime(2000);
      expect(vm.copyMessage).toEqual("");
    });

    it("should set success message and clear it after 2s on copySuccess call", async () => {
      await vm.copySuccess();
      expect(vm.copyMessage).toEqual("Copied successful");
      jest.advanceTimersByTime(2000);
      expect(vm.copyMessage).toEqual("");
    });
  });
});
