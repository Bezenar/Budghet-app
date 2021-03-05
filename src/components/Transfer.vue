<template>
  <div
    class="transfers__table__row transfers__table__row--body flex"
    :class="changeRowColor"
  >
    <Amount :value="transfer.value" :type="transfer.type" />
    <Categories :categories="transfer.category" />
    <Description :description="transfer.description" />
    <ConfButtons :id="transfer.id" />
  </div>
</template>

<script lang="ts">
//Import Vue.
import Vue from "vue";
// Import Vue components.
import Amount from "@/components/Amount.vue";
import ConfButtons from "@/components/ConfButtons.vue";
import Description from "@/components/Description.vue";
import Categories from "@/components/Categories.vue";
// Import map.
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "Transfer",
  components: {
    Amount,
    ConfButtons,
    Description,
    Categories
  },
  props: {
    transfer: {
      type: Object
    }
  },
  data: () => ({}),
  computed: {
    ...mapGetters(["getActiveFilter"]),
    changeRowColor(): string {
      let string;
      switch (this.transfer.type) {
        case "INCOME":
          string = "green";
          break;
        case "COSTS":
          string = "red";
          break;
        default:
          string = "";
          break;
      }
      return string;
    }
  }
});
</script>

<style lang="scss">
.transfers {
  margin-top: 0.5rem;
  color: $dark;
  background-color: $grey;
  border: 2px solid $dark;
  border-radius: 15px;
  padding: 1rem calc(1rem - 12px);
  &__heading {
    margin-bottom: 1rem;
    text-align: center;
  }
  &__table {
    &__row {
      &--body {
        &.red {
          background-color: rgba($red, 0.2);
        }
        &.green {
          background-color: rgba($green, 0.2);
        }
      }
    }
    &__cell {
      &--body {
        font-size: 0.8em;
      }
    }
  }
}
</style>
