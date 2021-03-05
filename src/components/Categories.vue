<template>
  <div class="transfers__table__cell transfers__table__cell--body wid-25">
    <ul class="transfers__table__categories-list flex wrap" ref="catList">
      <li
        class="transfers__table__categories-list__item"
        v-for="(cat, index) in categories"
        :key="`cat-${index}`"
      >
        {{ cat }}
      </li>
    </ul>
    <div ref="btnCon" class="transfers__table__cell__buttons-container">
      <button class="transfers__table__cell__button button--blue">
        show
      </button>
      <button class="transfers__table__cell__button button--blue">
        close
      </button>
    </div>
  </div>
</template>

<script lang="ts">
interface CategoriesData {
  height: number;
}
import Vue from "vue";
export default Vue.extend({
  name: "Categories",
  props: {
    categories: {
      type: Array
    }
  },
  data: () =>
    ({
      height: 0
    } as CategoriesData),
  mounted() {
    const catList: HTMLElement = this.$refs.catList as HTMLElement;
    this.height = catList.offsetHeight;
    const fontSize: number = parseFloat(
      window
        .getComputedStyle(document.querySelector("body") as Element, null)
        .getPropertyValue("font-size")
    );
    console.log(fontSize);
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
    &__categories-list {
      color: black;
      &__item {
        position: relative;
        z-index: 2;
        font-size: 0.6em;
        color: $white;
        background-color: $dark;
        border-radius: 5px;
        overflow: hidden;
        padding: 0.2rem;
        margin: 0.2rem;
      }
    }
  }
}
</style>
