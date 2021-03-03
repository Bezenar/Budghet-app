<template>
  <div class="transfers">
    <h3 class="transfers__heading">Transfers</h3>
    <div class="transfers__table--head">
      <div class="transfers__table__row transfers__table__row--head flex">
        <div
          v-for="title in tableHeadTitles"
          :key="title"
          class="transfers__table__cell--head
          transfers__table__cell
          transfers__table__cell--center-content
          wid-25"
        >
          <span class="transfers__table__text--head">{{ title }}</span>
        </div>
      </div>
    </div>
    <div class="transfers__table--body">
      <Transfer
        v-for="transfer in transfers"
        :key="transfer.id"
        :transfer="transfer"
      />
    </div>
  </div>
</template>

<script lang="ts">
// Import Vue.
import Vue from "vue";
// Import Vue component.
import Transfer from "./Transfer.vue";

export default Vue.extend({
  name: "TransfersTable",
  props: {
    transfers: {
      type: Array
    }
  },
  components: { Transfer },
  mixins: [],
  data: () => ({
    tableHeadTitles: ["Amount", "Category", "Description", "Configurations"]
  }),
  computed: {},
  methods: {}
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
    &__text {
      &--head {
        color: $white;
      }
    }
    &__row {
      display: flex;
      overflow: hidden;
      margin-bottom: 0.2rem;
      border-radius: 5px;
      &--head {
        background-color: rgba($blue, 0.8);
      }
    }
    &__cell {
      margin: 0.2rem;
      padding: 0.2rem 0.1rem;
      width: 100%;
      height: auto;
      text-align: center;
      border-radius: 5px;
      // border: 1px solid $dark;
      &--head {
      }
      &--center-content {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
