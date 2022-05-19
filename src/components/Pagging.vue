<template>
  <div class="page__wrapper" @click.stop >
    <div
      class="page"
      v-for="pageNumber in totalPagesP"
      :key="pageNumber"
      :class="{ current_page: pageP === pageNumber }"      
      @click.stop="$emit('click', pageNumber)"
    >
      {{ pageNumber }}
    </div>    
  </div>
</template>

<script>
export default {
  props: {
    totalPagesP: {
      type: Number,
      required: true,
    },
    pageP: {
      type: Number,
      required: true,
    },    
  },
  methods: {

  }
};
</script>

<style scoped>
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current_page {
  border: 2px solid teal;
}
</style>