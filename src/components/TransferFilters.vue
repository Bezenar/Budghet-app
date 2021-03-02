<template>
  <div>
    <div class="filters">
      <h3 class="filters__heading">Filters</h3>
      <div class="filters-types flex">
        <div class="wid-50">
          <div class="flex dir-col jc-sb h-full">
            <div class="filters-types__heading">
              <span>Type</span>
            </div>
            <div
              class="filters-types__button-container flex jc-center ai-center"
            >
              <button
                class="btn btn--outline--green filter-btn"
                v-for="btn in filters"
                :key="`filter-${btn.name}`"
                :class="{ active: btn.active }"
                :data-filter="btn.name"
                @click="onChangeFilter(btn.name)"
              >
                {{ btn.name }}
              </button>
            </div>
          </div>
        </div>
        <div class="wid-50">
          <form
            class="pos-relative flex dir-col jc-se h-full filters__form"
            @mouseleave="showCategory = false"
          >
            <label class="filters-types__heading" for="categoryFilter"
              >Category</label
            >
            <input
              id="categoryFilter"
              class="filters-types__input-field"
              autocomplete="off"
              type="text"
              v-model="categoryFilter"
              @focus="showCategory = true"
              @input="showCategory = true"
            />
            <div
              v-if="showCategory"
              class="filters-types__input-field__autocomplete-wrapper"
            >
              <ul class="filters-types__input-field__autocomplete-list">
                <li
                  class="filters-types__input-field__autocomplete-list__item"
                  v-for="(cat, index) in autocompleteList"
                  :key="`category-${index}`"
                  @click="pickAutocompleteListItem(cat)"
                >
                  {{ cat }}
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div>
      <TransfersTable :transfers="filteredList" />
    </div>
  </div>
</template>

<script lang="ts">
// Import VUE.
import Vue from "vue";
// Import VUE components.
import TransfersTable from "./TransfersTable.vue";
// Import VUEX map.
import { mapGetters } from "vuex";
// Import interface.
import { FiltersData } from "@/helpers/interfaces";
//Import type
import { Filter } from "@/helpers/types";
//Import store enum.
import { MutationsNames } from "@/store/modules/transfers/enums";
//Import JS class.
import { Transfer } from "@/classes/transfer";

export default Vue.extend({
  name: "TransferFilters",
  props: {},
  components: { TransfersTable },
  mixins: [],
  data: () =>
    ({
      filters: [
        { name: "All", active: true },
        { name: "INCOME", active: false },
        { name: "COSTS", active: false }
      ],
      categoryFilter: "",
      showCategory: false
    } as FiltersData),
  computed: {
    ...mapGetters(["getActiveFilter", "allCategorys"]),
    categoryFilterValue(): Array<string> {
      return this.categoryFilter
        .replaceAll(" ", ",")
        .replaceAll(",,", ",")
        .split(",");
    },
    filteredList(): Array<Transfer> {
      return this.$store.getters.getFilteredTransfers(
        this.activeFilter,
        this.categoryFilterValue
      );
    },
    activeFilter() {
      return this.getActiveFilter;
    },
    autocompleteList(): Array<string> {
      return this.allCategorys.reduce((acc: Array<string>, cat: string) => {
        const last: string = this.categoryFilterValue.slice("").pop();
        if (
          last.substring(0, last.length - 1).toLowerCase() ===
          cat.substring(0, last.length - 1).toLowerCase()
        ) {
          acc.push(cat);
        }
        return acc;
      }, []);
    }
  },
  watch: {
    activeFilter: {
      handler: function(val) {
        this.filters.forEach((filter: Filter) => (filter.active = false));
        const newActiveFilter = this.filters.find(
          (filter: Filter) => filter.name === val
        );
        if (newActiveFilter) {
          newActiveFilter.active = true;
        }
      }
    }
  },
  methods: {
    onChangeFilter(name: string) {
      this.$store.commit(MutationsNames.CHANGE_FILTER, name);
    },
    pickAutocompleteListItem(value: string): void {
      const stringArray: Array<string> = this.categoryFilterValue as Array<
        string
      >;
      stringArray[stringArray.length - 1] = `${value}`;
      this.categoryFilter = stringArray.join(", ");
      this.showCategory = false;
    }
  }
});
</script>

<style lang="scss">
.filters {
  margin-top: 0.5rem;
  color: $dark;
  background-color: $grey;
  border-radius: 15px;
  border: 2px solid $dark;
  margin-bottom: 0.5rem !important;
  padding: 0.5rem !important;
  text-align: center;
  &__form {
    margin: 0 2rem;
  }
  &__heading {
    font-size: 1em;
  }
  &-types {
    &__heading {
      margin-bottom: 0.5rem;
    }
    &__input-field {
      border-radius: 10px;
      border: 2px solid $dark;
      padding: 0.5rem 1rem;
      transition: all 0.2s ease;
      &:focus {
        border-color: $blue;
      }
      &__autocomplete {
        &-wrapper {
          position: absolute;
          z-index: 100;
          width: 100%;
          height: auto;
          bottom: 0;
          left: 0;
          transform: translateY(98%);
        }
        &-list {
          background-color: $grey;
          border: 2px solid $dark;
          border-radius: 10px;
          &__item {
            padding-bottom: 0.2rem;
            cursor: pointer;
            &:hover {
              color: $white;
              background-color: rgba($blue, 0.5);
            }
          }
        }
      }
    }
  }
  .filter-btn {
    &.active {
      background-color: $green;
      color: $white;
      border-color: $dark;
    }
    &:hover {
      color: $white;
      border-color: $dark;
      background-color: $green;
    }
  }
}
</style>
