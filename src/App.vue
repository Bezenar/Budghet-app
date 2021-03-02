<!--
//TODO
// * delete classes from start styles.
-->
<template>
  <div id="app" class="app">
    <header class="app__header">
      <div class="container">
        <nav class="app__navbar flex">
          <div class="wid-33 logo-col">
            <div class="app__navbar__left-side flex ai-center jc-sb">
              <div class="app__navbar__logo-wrapper">
                <img
                  class="app__navbar__logo"
                  alt="Logo"
                  title="Maksim Bezenar"
                  src="./assets/logo.png"
                />
              </div>
            </div>
          </div>
          <div class="wid-33 title-col">
            <div class="flex jc-center ai-center h-full">
              <h1 class="app__navbar__title">Budget app</h1>
            </div>
          </div>
          <div class="wid-33 menu-col">
            <div class="app__navbar__right-side flex ai-center jc-end h-full">
              <span class="app__navbar__text">Clear local storage</span>
              <div class="pos-relative">
                <button
                  class="clear-btn btn btn--outline--red tooltip-btn"
                  @mouseenter="tooltip = !tooltip"
                  @mouseleave="tooltip = !tooltip"
                  @click="clearLocalStorage"
                >
                  Clear
                </button>
                <transition name="tooltip">
                  <p class="tooltip-msg" v-if="tooltip" data-tooltipMsg>
                    All operations saved on your browser local storage. If you
                    want to delete saved operations press clear.
                  </p>
                </transition>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
    <Content />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
/**
 * Import Vue component
 */
import Content from "@/components/Content.vue";
/**
 * Import Interface.
 */
import { AppData } from "@/helpers/interfaces";

export default Vue.extend({
  name: "App",
  components: { Content },
  data: () =>
    ({
      tooltip: false
    } as AppData),
  methods: {
    clearLocalStorage(): void {
      localStorage.removeItem("transfers");
    }
  },
  async created() {
    await this.$store.dispatch("GET_TRANSFERS");
    // const test = this.$store.getters.getFilteredTransfers("All", [
    //   "Work",
    //   "Food"
    // ]);
    // console.log(test);
  }
});
</script>

<style lang="scss">
.pos-relative {
  position: relative;
}
.tooltip {
  &-msg {
    text-align: center;
    font-size: 0.8em;
    position: absolute;
    min-width: 20rem;
    height: auto;
    background-color: $green;
    padding: 1rem;
    border-radius: 15px;
    bottom: -100%;
    right: 0;
    transform: translate(0, 65%);
    &::before {
      content: "";
      position: absolute;
      width: 1rem;
      height: 1rem;
      top: 0;
      right: 0;
      transform: translate(-100%, -90%);
      border-width: 10px;
      border-style: solid;
      border-bottom-color: $green;
      border-left-color: transparent;
      border-right-color: transparent;
      border-top-color: transparent;
    }
  }
}
.btn {
  display: inline;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-size: 1em;
  outline: none;
  box-shadow: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.5s ease;
  &--red {
    background-color: $red;
    color: $white;
    &:hover {
      background-color: $white;
      border-color: $red;
      color: $red;
    }
  }
  &--green {
    background-color: $green;
    color: $white;
    &:hover {
      background-color: $white;
      border-color: $green;
      color: $green;
    }
  }
  &--outline--green {
    border-color: $green;
    color: $green;
    background-color: $white;
    &:hover {
      background-color: $green;
      color: $white;
      border-color: $green;
    }
  }
  &--outline--red {
    border-color: $red;
    color: $red;
    background-color: $white;
    &:hover {
      background-color: $red;
      color: $white;
      border-color: $white;
    }
  }
}
.app {
  background-color: $grey;
  min-width: 100%;
  min-height: 100vh;
  padding: 1rem;
  color: $white;
  &__header {
    background-color: rgba($dark, 0.8);
    border-radius: 15px;
    min-height: 10vh;
  }
  &__navbar {
    padding: 0.2rem;
    &__logo-wrapper {
      width: 10rem;
    }
    &__logo {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &__title {
      font-size: 2.5em;
    }
    &__text {
      font-size: 1.25em;
      padding-right: 1rem;
    }
  }
}
// Transitions
.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.5s;
}
.tooltip-enter,
.tooltip-leave {
  opacity: 0;
}
.tooltip-enter-to,
.tooltip-leave-to {
  opacity: 1;
}
</style>
