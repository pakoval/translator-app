import { shallowMount, Wrapper } from "@vue/test-utils";
import Select from "@/components/Select.vue";
import { Languages } from "@/languages";

describe("Select", () => {
  let wrapper: Wrapper<Select>, vm: Select | any;

  beforeEach(() => {
    wrapper = shallowMount(Select, {
      // I'd define required props at the very beginning, will test the other props later
      propsData: {
        selectedOption: Languages.UK,
      },
    });
    vm = wrapper.vm;
  });

  // the next tests inside the general 'describe' are more general tests,
  // that's why are they aren't extracted into separate 'describes'

  it("should build a select with empty options when 'list' prop is empty", () => {
    expect(wrapper.find("select").exists()).toBeTruthy();
    expect(wrapper.findAll("select option").length).toBe(0);
  });

  it("should build a select with 3 options based on 'list' prop", async () => {
    const mock_list = [
      { language: "Bulgarian", code: Languages.BG },
      { language: "Germany", code: Languages.GR },
      { language: "Polish", code: Languages.PL },
    ];
    await wrapper.setProps({
      list: mock_list,
    });

    const options = wrapper.findAll("select option");
    expect(options.length).toBe(3);

    expect(options.at(0).element.getAttribute("value")).toEqual(Languages.BG);
    expect(options.at(0).text()).toEqual("Bulgarian");

    expect(options.at(1).element.getAttribute("value")).toEqual(Languages.GR);
    expect(options.at(1).text()).toEqual("Germany");

    expect(options.at(2).element.getAttribute("value")).toEqual(Languages.PL);
    expect(options.at(2).text()).toEqual("Polish");
  });

  describe("Test selected model", () => {
    it("should set selected language from selectedOption prop", () => {
      expect(vm.selected).toEqual(Languages.UK);
    });

    it("should change the selected language if selectedOption prop change", async () => {
      wrapper.setProps({ selectedOption: Languages.JA });
      await vm.$nextTick();
      expect(vm.selected).toEqual(Languages.JA);
    });
  });
});
