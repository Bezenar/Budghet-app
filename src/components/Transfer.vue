<template>
  <div
    class="transfers__table__row transfers__table__row--body flex"
    :class="changeRowColor"
  >
    <div
      class="transfers__table__cell transfers__table__cell--body transfers__table__cell wid-25"
    >
      <div class="flex ai-center jc-sb" style="padding: 0 3rem;">
        <div class="transfers__table__cell__amount">
          {{ transfer.value }}
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
    <div
      class="transfers__table__cell transfers__table__cell--body transfers__table__cell wid-25"
    >
      2
    </div>
    <div
      ref="description"
      class="transfers__table__cell transfers__table__cell--body wid-25"
      :class="[
        { [`start-height.extended`]: extended },
        { [`start-height`]: !extended }
      ]"
    >
      <div class="transfers__table__cell__description-wrapper">
        <p class="transfers__table__cell__description">
          {{ transfer.description }}
        </p>
        <div
          v-if="!extended && descriptionExtend"
          class="transfers__table__cell__buttons-container more-info"
        >
          <button
            class="transfers__table__cell__button button--blue"
            @click="extended = !extended"
          >
            show
          </button>
        </div>
        <div v-if="extended" class="transfers__table__cell__buttons-container">
          <button
            class="transfers__table__cell__button button--blue"
            @click="extended = !extended"
          >
            close
          </button>
        </div>
      </div>
    </div>
    <div
      class="transfers__table__cell transfers__table__cell--body transfers__table__cell wid-25 flex ai-center jc-center"
    >
      <div class="transfers__table__cell__buttons-container flex jc-se wid-100">
        <button class="transfers__table__cell__button button--blue">
          EDIT
        </button>
        <button
          class="transfers__table__cell__button button--red"
          @click="deleteTransfer(transfer.id)"
        >
          DELETE
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
//Import Vue.
import Vue from "vue";
//Import interface.
import { IconData } from "@/helpers/interfaces";
// Import map.
import { mapGetters } from "vuex";
// Import enum.
import { ActionsNames } from "@/store/modules/transfers/enums";

export default Vue.extend({
  name: "Transfer",
  props: {
    transfer: {
      type: Object
    }
  },
  data: () => ({
    extended: true
  }),
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
    },
    icon(): IconData {
      return {
        url:
          this.transfer.type === "INCOME"
            ? require("../assets/arrow-up.png")
            : require("../assets/arrow-down.png"),
        alt: "Arrow",
        title: this.transfer.type === "INCOME" ? "INCOME" : "COSTS"
      };
    },
    descriptionExtend(): boolean {
      return this.transfer.description.length > 38 ? true : false;
    }
  },
  methods: {
    deleteTransfer(id: number) {
      this.$store.dispatch(ActionsNames.DELETE_TRANSFER, id);
    }
  },
  mounted() {
    const style = document.createElement("style");
    const description: HTMLElement = this.$refs.description as HTMLElement;
    const expandedHeight: number = description.offsetHeight;
    console.log(expandedHeight);
    style.append(`.start-height.extended {max-height: ${expandedHeight}px;}`);
    style.append(`.start-height {max-height: 3rem;}`);
    document.head.appendChild(style);
    this.extended = false;
  }
});
</script>

<style lang="scss">
.more-info {
  display: flex;
  flex-direction: column-reverse;
  justify-content: end;
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
    }
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
        font-size: 0.6em;
        position: relative;
      }
      &__amount {
        padding-right: 1rem;
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
      &__desctiption {
        &-wrapper {
          padding-bottom: 1rem;
        }
      }
      &__buttons-container {
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
