<template>
  <div class="transfers__table__cell transfers__table__cell--body wid-25">
    <div
      class="transfers__table__cell__buttons-container flex ai-center jc-se wid-100"
    >
      <button class="transfers__table__cell__button button--blue">
        EDIT
      </button>
      <button
        class="transfers__table__cell__button button--red"
        @click="deleteTransfer(id)"
      >
        DELETE
      </button>
    </div>
  </div>
</template>
<script lang="ts">
// Import Vue.
import Vue from "vue";
// Import enum.
import { ActionsNames } from "@/store/modules/transfers/enums";

export default Vue.extend({
  name: "ConfButtons",
  props: {
    id: {
      type: Number
    }
  },
  methods: {
    deleteTransfer(id: number): void {
      this.$store.dispatch(ActionsNames.DELETE_TRANSFER, id);
    }
  }
});
</script>
<style lang="scss">
.transfers {
  &__table {
    &__cell {
      &__buttons-container {
        height: 3rem;
        .button {
          &--red {
            background-color: $red;
          }
          &--blue {
            background-color: $blue;
          }
          &--red,
          &--blue {
            color: $white;
            cursor: pointer;
            font-size: 0.8em;
            padding: 0.2rem 1rem;
            border: none;
            outline: none;
            border-radius: 2px;
            transition: transform 0.2s ease;
            &:hover {
              transform: scale(1.1);
            }
          }
        }
      }
    }
  }
}
</style>
