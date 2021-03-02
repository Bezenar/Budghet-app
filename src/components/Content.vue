<template>
  <div class="content container">
    <div class="flex jc-center">
      <div class="wid-40 pad-1">
        <Form />
      </div>
      <div class="wid-60 pad-1">
        <div class="flex dir-col">
          <TotalBalance />
          <TransferFilters />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Import Vue.
import Vue from "vue";
// Import Vue components.
import Form from "@/components/Form.vue";
import TransferFilters from "@/components/TransferFilters.vue";
import TotalBalance from "@/components/TotalBalance.vue";

export default Vue.extend({
  name: "Content",
  props: {},
  components: { Form, TransferFilters, TotalBalance },
  mixins: [],
  data: () => ({}),
  computed: {},
  methods: {}
});
</script>

<style lang="scss" scoped>
.pad-1 {
  padding: 1rem;
}
</style>
