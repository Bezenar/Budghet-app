<template>
  <div class="">
    <div class="flex">
      <div
        class="wid-25 parent start-height"
        :class="{ expandedHeight: expanded }"
      >
        1
      </div>
      <div
        class="wid-25 parent start-height"
        :class="{ expandedHeight: expanded }"
      >
        2
      </div>
      <div
        class="wid-25 parent start-height"
        :class="{ expandedHeight: expanded }"
        @click="expanded = !expanded"
      >
        <p ref="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe et quam
          nesciunt facilis ad dolores pariatur fugit, alias in, delectus
          voluptatum possimus aspernatur ut fugiat omnis, ratione corporis sit
          animi!
        </p>
      </div>
      <div
        class="wid-25 parent start-height"
        :class="{ expandedHeight: expanded }"
      >
        4
      </div>
    </div>
  </div>
</template>
<script lang="ts">
//Import Vue.
import Vue from "vue";
//Import interface.
import { IconData } from "@/helpers/interfaces";
export default Vue.extend({
  name: "Transfer",
  props: {
    transfer: {
      type: Object
    }
  },
  data: () => ({}),
  computed: {
    icon(): IconData {
      return {
        url:
          this.transfer.type === "INCOME"
            ? require("../assets/arrow-up.png")
            : require("../assets/arrow-down.png"),
        alt: "Arrow",
        title: this.transfer.type === "INCOME" ? "INCOME" : "COSTS"
      };
    }
  },
  methods: {},
  mounted() {
    const p: HTMLElement = document.querySelector(".transfers .parent p");
    const expandedHeight: number = p.offsetHeight;
    const style = document.createElement("style");
    style.append(`.start-height {max-height: 3rem;}`);
    style.append(
      `.start-height.expandedHeight {max-height: ${expandedHeight}px;}`
    );
    document.head.appendChild(style);
  }
});
</script>
<style lang="scss"></style>
