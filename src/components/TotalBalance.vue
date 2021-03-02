<template>
  <div class="total-balance" :class="classDependOnValue">
    <h3 class="total-balance__heading">
      Total Balance :
      <span class="total-balance__result">{{ totalBalance.toFixed(2) }}</span>
    </h3>
  </div>
</template>

<script lang="ts">
// Import Vue.
import Vue from "vue";
//Import Vuex map.
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "TotalBalance",
  props: {},
  components: {},
  mixins: [],
  data: () => ({}),
  computed: {
    ...mapGetters(["totalBalance"]),
    classDependOnValue() {
      let borderClass: string;
      borderClass = "";
      this.totalBalance < 0
        ? (borderClass = "less-than-zero")
        : this.totalBalance > 0
        ? (borderClass = "more-than-zero")
        : (borderClass = "");
      return borderClass;
    }
  },
  methods: {}
});
</script>

<style lang="scss">
.total-balance {
  color: $dark;
  background-color: $grey;
  border: 2px solid $dark;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 0.5rem !important;
  padding: 0.5rem !important;
  transition: all 0.2s ease;
  &.less-than-zero {
    border-color: $red;
    background-color: rgba($red, 0.5);
  }
  &.more-than-zero {
    border-color: $green;
    background-color: rgba($green, 0.5);
  }
  &__heading {
    font-weight: 600;
  }
}
</style>
