import { shallowMount } from "@vue/test-utils";
import Filters from "@/components/Filters.vue";

describe("Filters.vue", () => {
  const wrapper = shallowMount(Filters);

  type filterDataType = { name: string; active: boolean };

  function getFilterObject(name: string): filterDataType {
    const filters = wrapper.vm.$data.filters.find(
      (el: filterDataType) => el.name === name
    );
    return filters;
  }

  it("Checking active filter on change", async () => {
    expect(wrapper.vm.$data.activeFilter).toBe("All");
    expect(getFilterObject("All").active).toBeTruthy();

    await wrapper.find("[data-filter=INCOME]").trigger("click");

    expect(wrapper.vm.$data.activeFilter).toBe("INCOME");
    expect(getFilterObject("INCOME").active).toBeTruthy();

    await wrapper.find("[data-filter=OUTCOME]").trigger("click");

    expect(wrapper.vm.$data.activeFilter).toBe("OUTCOME");
    expect(getFilterObject("OUTCOME").active).toBeTruthy();

    await wrapper.find("[data-filter=All]").trigger("click");

    expect(wrapper.vm.$data.activeFilter).toBe("All");
    expect(getFilterObject("All").active).toBeTruthy();
  });
});
