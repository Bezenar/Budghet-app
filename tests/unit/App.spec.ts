import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import Form from "@/components/Form.vue";
import Content from "@/components/Content.vue";
import Filters from "@/components/Filters.vue";
import TotalBalance from "@/components/TotalBalance.vue";
import Transactions from "@/components/Transactions.vue";

describe("App.vue", () => {
  const wrapper = mount(App);
  it("Tooltip", async () => {
    expect(wrapper.vm.$data.tooltip).toBeFalsy();

    await wrapper.find("[data-tooltip]").trigger("mouseenter");

    expect(wrapper.vm.$data.tooltip).toBeTruthy();

    await wrapper.find("[data-tooltip]").trigger("mouseleave");

    expect(wrapper.vm.$data.tooltip).toBeFalsy();
  });
  it("Tooltip message is visible", async () => {
    expect(wrapper.find("[data-tooltipMsg]").exists()).toBeFalsy();

    await wrapper.find("[data-tooltip]").trigger("mouseenter");

    expect(wrapper.find("[data-tooltipMsg]").isVisible()).toBeTruthy();

    await wrapper.find("[data-tooltip]").trigger("mouseleave");

    expect(wrapper.find("[data-tooltipMsg]").exists()).toBeFalsy();
  });
  it("Components rendering", () => {
    // Checking for Content component rendering.
    expect(wrapper.findComponent(Content).exists()).toBeTruthy();

    // Checking for Form component rendering.
    expect(wrapper.findComponent(Form).exists()).toBeTruthy();

    // Checking for TotalBalance component rendering.
    expect(wrapper.findComponent(TotalBalance).exists()).toBeTruthy();

    // Checking for Filters component rendering.
    expect(wrapper.findComponent(Filters).exists()).toBeTruthy();

    // Checking for Transactions component rendering.
    expect(wrapper.findComponent(Transactions).exists()).toBeTruthy();
  });
});
