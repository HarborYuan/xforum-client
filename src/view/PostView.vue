<template>
  <div class="item-view" v-if="item">
    <template v-if="item">
      <div class="item-view-header">
        <h1>{{ item.content }}</h1>
        <p class="meta">
          {{ timeAgo }} | by <router-link :to="'/user/' + item.uid">{{ item.username }}</router-link>
        </p>
      </div>
      <div class="item-view-comments">
        <p class="item-view-comments-header">
          {{ item.response.length > 0 ? item.response.length + ' comments' : 'No comments yet.' }}
        </p>
        <ul class="comment-children">
          <Comment v-for="res in item.response" v-bind="res"></Comment>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
  import { convertTimeAgo } from '../api/general';
  import Comment from '../components/Comment';

  export default {
    name: 'PostView',
    components: { Comment },
    // props: ['item'],
    mounted() {
      this.$store.dispatch('FETCH_COMMENT_DATA', { pid: this.$route.params.pid });
    },
    computed: {
      item() {
        return this.$store.state.posts[this.$route.params.pid];
      },
      timeAgo() {
        return convertTimeAgo(this.item.createtime);
      },
    },
  };
</script>


<style lang="stylus">
  .item-view-header
    background-color #fff
    padding 1.8em 2em 1em
    box-shadow 0 1px 2px rgba(0,0,0,.1)
    h1
      display inline
      font-size 1.5em
      margin 0
      margin-right .5em
    .host, .meta, .meta a
      color #828282
    .meta a
      text-decoration underline

  .item-view-comments
    background-color #fff
    margin-top 10px
    padding 0 2em .5em

  .item-view-comments-header
    margin 0
    font-size 1.1em
    padding 1em 0
    position relative
    .spinner
      display inline-block
      margin -15px 0

  .comment-children
    list-style-type none
    padding 0
    margin 0

  @media (max-width 600px)
    .item-view-header
      h1
        font-size 1.25em
</style>

