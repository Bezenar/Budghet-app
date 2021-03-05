<template>
  <div class="transfers__table__cell transfers__table__cell--body wid-25">
    <div class="flex jc-center ai-center" style="height: 3rem;">
      <div class="transfers__table__cell__amount">
        {{ value }}
      </div>
      <div class="transfers__table__cell__icon-wrapper">
        <img
          class="transfers__table__cell__icon"
          :src="icon.url"
          :alt="icon.alt"
          :title="icon.title"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// Import Vue.
import Vue from "vue";
//Import interface.
import { IconData } from "@/helpers/interfaces";

export default Vue.extend({
  name: "Amount",
  props: {
    value: {
      type: Number
    },
    type: {
      type: String
    }
  },
  computed: {
    icon(): IconData {
      return {
        url:
          this.$props.type === "INCOME"
            ? require("../assets/arrow-up.png")
            : require("../assets/arrow-down.png"),
        alt: "Arrow",
        title: this.$props.type === "INCOME" ? "INCOME" : "COSTS"
      };
    }
  }
});
</script>
<style lang="scss">
.transfers {
  &__table {
    &__cell {
      &--body {
        font-size: 0.8em;
      }
      &__amount {
        padding-left: 3rem;
      }
      &__icon {
        &-wrapper {
          width: 1rem;
          height: 1rem;
        }
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
