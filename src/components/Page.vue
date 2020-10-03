<template>
  <nav class="page">
    <ul class="page__list l-flex-row">
      <li
        class="page__item"
        :class="{ 'page__item--disabled': !pagination.has_pre }"
        v-if="pagination.has_pre"
      >
        <a
          class="page__link"
          href="#"
          @click.prevent="
            changePage(
              pagination.current_page - 1,
              pagination.category,
              pagination.is_high_first,
            )
          "
        >
          <font-awesome-icon :icon="['fas', 'chevron-left']" size="lg" />
        </a>
      </li>
      <li
        class="page__item"
        v-for="page in pagination.total_pages"
        :key="`page${page}`"
      >
        <a
          class="page__link"
          :class="{ 'page__link--active': pagination.current_page === page }"
          href="#"
          v-text="page"
          @click.prevent="
            changePage(page, pagination.category, pagination.is_high_first)
          "
        ></a>
      </li>
      <li
        class="page__item"
        :class="{ 'page__item--disabled': !pagination.has_next }"
        v-if="pagination.has_next"
      >
        <a
          class="page__link"
          href="#"
          @click.prevent="
            changePage(
              pagination.current_page + 1,
              pagination.category,
              pagination.is_high_first,
            )
          "
        >
          <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Page',
  props: {
    pageObj: Object,
    nowFilter: String,
  },
  data() {
    return {
      pagination: this.pageObj,
    };
  },
  watch: {
    pageObj() {
      this.pagination = this.pageObj;
    },
  },
  methods: {
    changePage(page, cate, isHighFirst) {
      const vm = this;
      vm.$emit('change-page', page, cate, isHighFirst);
    },
  },
};
</script>
