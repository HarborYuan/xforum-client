<template>
  <div>
    <h1>Test</h1>
    <div>{{ this.response }}</div>
    <Comment v-bind="{comment}"></Comment>
    <button @click="click">Test</button>
  </div>
</template>

<script>
  import Comment from '../components/Comment';

  export default {
    name: 'Test',
    components: {
      Comment,
    },
    computed: {
      posts() {
        return this.$store.state.list.index;
      },
    },
    created() {
      // this.$store.dispatch({ type: 'index' });
    },
    data() {
      return {
        pid: 6,
        comment: JSON.parse('{" ":3,"createtime":"2019-05-04 19:44:01","content":"附议"}'),
      };
    },
    methods: {
      click() {
        // this.$store.commit('SET_BOARD', { path: 'index' });
        this.$store.dispatch('FETCH_POST_DATA', { type: 'index' }).then((response) => {
          console.log(response);
        });
      },
    },
  };
</script>

<style scoped>

</style>
