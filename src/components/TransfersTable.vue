<template>
  <div class="transfers">
    <h3 class="transfers__heading">Transfers</h3>
    <div class="transfers__table--head flex">
      <div class="transfers__table__row transfers__table__row--head wid-25">
        <div class="transfers__table__cell--head transfers__table__cell"></div>
      </div>
      <div class="transfers__table__row transfers__table__row--head wid-25">
        2
      </div>
      <div
        class="transfers__table__row transfers__table__head__row wid-25 start-height"
        @click="expanded = !expanded"
        :class="{ expandedHeight: expanded }"
      >
        <p data-description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe et quam
          nesciunt facilis ad dolores pariatur fugit, alias in, delectus
          voluptatum possimus aspernatur ut fugiat omnis, ratione corporis sit
          animi!
        </p>
      </div>
      <div class="transfers__table__row transfers__table__head__row wid-25">
        4
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Import Vue.
import Vue from "vue";
// Import Vue component.
// import Transfer from "./Transfer.vue";
// Import map.
import { mapGetters } from "vuex";
// Import interface.
import { ActionsNames } from "@/store/modules/transfers/enums";

export default Vue.extend({
  name: "TransfersTable",
  props: {
    transfers: {
      type: Array
    }
  },
  components: {},
  mixins: [],
  data: () => ({
    expanded: false,
    class: `expanded-height`
  }),
  computed: {
    ...mapGetters(["getActiveFilter"]),
    changeTableColor(): string {
      let string;
      switch (this.getActiveFilter) {
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
  },
  methods: {
    deleteTransfer(id: number) {
      this.$store.dispatch(ActionsNames.DELETE_TRANSFER, id);
    }
  },
  async mounted() {
    const p = document.querySelector("[data-description]");
    const expandedHeight = p.offsetHeight;
    console.log(expandedHeight);
    const style = document.createElement("style");
    style.append(`.start-height {max-height: 3rem;}`);
    style.append(
      `.start-height.expandedHeight {max-height: ${expandedHeight}px;}`
    );
    document.head.appendChild(style);
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
  transition: all 2s ease;
  &__heading {
    margin-bottom: 1rem;
    text-align: center;
  }
  &__table {
    &--head {
    }
    &__row {
      display: flex;
      flex: 1 0 auto;
      transition: max-height 0.2s ease-out;
      overflow: hidden;
      &--head {
      }
    }
    &__cell {
      margin: 0.2rem;
      width: 100%;
      height: auto;
      text-align: center;
      &--head {
        border: 1px solid $blue;
        border-radius: 5px;
        background-color: rgba($blue, 0.5);
      }
    }
  }
}
</style>
