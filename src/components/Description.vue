<template>
  <div
    class="transfers__table__cell transfers__table__cell--body wid-25"
    :style="
      extendedDescription
        ? `max-height: calc(${height}px + 2.2rem);`
        : `max-height: 3rem;`
    "
  >
    <div class="transfers__table__cell__description-wrapper">
      <p ref="description" class="transfers__table__cell__description">
        {{ description }}
      </p>
      <div
        ref="btnCon"
        v-if="overLongerDesc"
        class="transfers__table__cell__buttons-container"
        :class="{ ['more-info']: !extendedDescription }"
      >
        <button
          v-if="!extendedDescription"
          class="transfers__table__cell__button button--blue"
          @click="extendedDescription = !extendedDescription"
        >
          show
        </button>
        <button
          v-else
          class="transfers__table__cell__button button--blue"
          @click="extendedDescription = !extendedDescription"
        >
          close
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// Import Vue.
import Vue from "vue";
// Import interface.
import { DescriptionData } from "@/helpers/interfaces";
export default Vue.extend({
  name: "Description",
  props: {
    description: {
      type: String,
      default: ""
    }
  },
  data: () =>
    ({
      extendedDescription: false,
      height: 0
    } as DescriptionData),
  computed: {
    overLongerDesc(): boolean {
      return this.$props.description.length > 38 ? true : false;
    }
  },
  mounted() {
    const element: HTMLElement = this.$refs.description as HTMLElement;
    const btnCon: HTMLElement = this.$refs.btnCon as HTMLElement;
    let btnHeight = 0;
    if (btnCon) {
      btnHeight = btnCon.offsetHeight;
    }
    this.height = element.offsetHeight + btnHeight;
  }
});
</script>

<style lang="scss">
.more-info {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  button {
    transition: opacity 0.2s ease;
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
}
.transfers {
  &__table {
    &__cell {
      position: relative;
      transition: max-height 0.5s ease;
      &__description {
        &-wrapper {
          font-size: 0.8em;
          padding-bottom: 1rem;
        }
      }
    }
  }
}
</style>
