import { shallowMount, Wrapper, createLocalVue } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import Button from "@/components/Button.vue";
import VueClipboard from "vue-clipboard2";
import Select from "@/components/Select.vue";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve()),
}));

const localVue = createLocalVue(Button);
localVue.use(VueClipboard);

describe("HomeView.vue", () => {
  let wrapper: Wrapper<HomeView>;
  let wrapperBtn: Wrapper<Button>;
  let wrapperSelect: Wrapper<Select>;

  beforeEach(() => {
    wrapper = shallowMount(HomeView, {
      localVue,
    });
    wrapperBtn = shallowMount(Button);
  });

  it("should render correct page", async () => {
    const home = wrapper.find(".home");
    expect(home.exists()).toBe(true);
  });
});
