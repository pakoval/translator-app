import { shallowMount, Wrapper } from "@vue/test-utils";
import IconSvg from "@/components/IconSvg.vue";
import { IIcon } from "@/components/types";

describe("IconSvg.vue", () => {
  const iconData: IIcon = {
    name: "exchange",
    width: "24px",
    height: "24px",
  };
  let wrapper: Wrapper<IconSvg>;
  beforeEach(() => {
    wrapper = shallowMount(IconSvg, {
      propsData: {
        icon: iconData,
      },
    });
  });
  it("render svg when prop isn't provided", async () => {
    await wrapper.setProps({ icon: {} });
    expect(wrapper.props("icon")).toEqual({});
    expect(wrapper.find("svg").exists()).toBe(false);
  });
  it("renders with props", () => {
    expect(wrapper.props("icon")).toBeTruthy();
    expect(wrapper.props("icon")).toEqual(iconData);
    expect(wrapper.find("svg").element.getAttribute("width")).toEqual("24px");
    expect(wrapper.find("svg").element.getAttribute("height")).toEqual("24px");
  });
  it("set icon class ", () => {
    const svgEl = wrapper.find("svg");
    expect(svgEl.classes()).toContain("icon-exchange");
  });
});
