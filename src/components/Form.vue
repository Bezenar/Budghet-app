<template>
  <div class="form-wrapper">
    <form class="form flex wrap jc-center ai-center h-full">
      <h3 class="form__heading">Add Transfer</h3>
      <div class="wid-100 flex jc-center form__row">
        <label class="form__label" for="type" :class="{ error: type.error }"
          >Type</label
        >
        <select
          class="form__input"
          name="type"
          id="type"
          v-model="type.value"
          @focus="type.error = false"
        >
          <option value="INCOME">INCOME</option>
          <option value="COSTS">COSTS</option>
        </select>
      </div>
      <div class="wid-100 flex jc-center form__row">
        <label class="form__label" for="value" :class="{ error: amount.error }"
          >Set value</label
        >
        <input
          @focus="amount.error = false"
          v-model="amount.value"
          placeholder="0.00"
          class="form__input"
          type="number"
          id="value"
          name="value"
          autocomplete="off"
        />
      </div>
      <div class="wid-100 flex jc-center form__row">
        <label class="form__label" for="category">Category</label>
        <input
          v-model="category"
          class="form__input"
          type="text"
          id="value"
          name="category"
          placeholder="Example: Food, Fuel, Gifts"
        />
      </div>
      <div class="wid-100 flex jc-center form__row">
        <label class="form__label form__text-area__label" for="description"
          >Description</label
        >
        <textarea
          v-model="description"
          placeholder="Input short text with description. Max 20 characters. It's not necesssary"
          class="form__input"
          name="description"
          id="description"
          cols="30"
          rows="5"
        ></textarea>
      </div>
      <div class="wid-100 flex jc-sa">
        <button
          class="btn btn--red"
          data-btn="reset"
          @click.prevent="resetForm"
        >
          reset
        </button>
        <button
          class="btn btn--green"
          data-btn="add"
          @click.prevent="addTransfer"
        >
          Add
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
// Import Vue.
import Vue from "vue";
//Import JS Class.
import { Transfer } from "@/classes/transfer";
//Import Interface.
import { FormData } from "@/helpers/interfaces";
//Import Action enum.
import { ActionsNames } from "@/store/modules/transfers/enums";
// Import Vuex map method.
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "Form",
  props: {},
  components: {},
  mixins: [],
  data: () =>
    ({
      type: {
        value: "",
        error: false
      },
      amount: {
        value: "",
        error: false
      },
      category: "",
      description: ""
    } as FormData),
  computed: {
    ...mapGetters(["getAllTransfers"]),
    categoryArray(): Array<string> {
      if (this.category.length) {
        const list = this.category
          .replaceAll(" ", ",")
          .replaceAll(",,", ",")
          .split(",");
        return list.reduce((acc: Array<string>, string: string) => {
          acc.push(string[0].toUpperCase() + string.slice(1, string.length));
          return acc;
        }, []);
      } else {
        return [];
      }
    }
  },
  methods: {
    resetForm(): void {
      this.type.value = "";
      this.type.error = false;
      this.amount.value = "";
      this.amount.error = false;
      this.category = "";
      this.description = "";
    },
    formValidation(): boolean {
      if (!this.type.value || this.type.value.length < 3) {
        this.type.error = true;
      }
      if (
        !this.amount.value ||
        (this.type.value === "INCOME" && this.amount.value < 0)
      ) {
        this.amount.error = true;
      }
      let result = true;
      if (this.amount.error || this.type.error) {
        result = false;
      }
      return result;
    },
    createId(): number {
      const maxId = this.getAllTransfers.reduce(
        (acc: number, transfer: Transfer) => {
          if (transfer.id > acc) {
            acc = transfer.id;
          }
          return acc;
        },
        0
      );
      return maxId + 1;
    },
    async addTransfer() {
      const validation: boolean = this.formValidation();
      if (validation) {
        const id = this.createId();
        const newTransfer = new Transfer(
          id,
          this.type.value,
          this.categoryArray,
          this.amount.value,
          this.description
        );
        await this.$store.dispatch(ActionsNames.ADD_TRANSFER, newTransfer);
        this.resetForm();
      }
    }
  }
});
</script>

<style lang="scss">
// hide input number fields up/down arrows.
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.form-wrapper {
  background-color: rgba($grey, 1);
  border: 2px solid $dark;
  border-radius: 15px;
}

.form {
  padding: 1rem 0;
  &__heading {
    padding-bottom: 1rem;
    color: $dark;
  }
  &__row {
    margin-bottom: 0.5rem;
  }
  &__label {
    width: 40%;
    background-color: rgba($dark, 0.8);
    border-radius: 10px 0 0 10px;
    padding: 0.2rem 0;
    text-align: center;
    border: 2px solid transparent;
    transition: all 0.2s ease;
    &.error {
      border: 2px solid darken($red, 10);
      background-color: rgba($red, 0.7);
    }
  }
  &__input {
    border: 2px solid $dark;
    border-radius: 0 10px 10px 0;
    width: 40%;
    outline: none;
    padding-left: 0.2rem;
    transition: all 0.2s ease;
    &:focus {
      padding-left: 0.5rem;
      border-color: lighten($blue, 10);
    }
    &:hover {
      border-color: lighten($blue, 10);
    }
  }
  &__label,
  &__input {
    cursor: pointer;
  }
  &__text-area {
    transition: all 0.2s ease;
    &:focus {
      padding-left: 0.5rem;
      border-color: $blue;
    }
    &__label {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
