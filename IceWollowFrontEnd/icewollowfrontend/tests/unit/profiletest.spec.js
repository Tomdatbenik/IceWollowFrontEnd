import { shallowMount } from "@vue/test-utils";
import Profile from "@/components/Profile.vue";

describe("Profile.vue", () => {
  it("renders props.user when passed", () => {
    const user = { displayName: "test" };
    const wrapper = shallowMount(Profile, {
      propsData: { user }
    });
    expect(wrapper.props().user.displayName).toBe("test");
  });
});
