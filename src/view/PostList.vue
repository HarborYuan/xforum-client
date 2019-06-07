<template>
  <div class="news-view" v-if="refreshed">
<!--    <div class="news-list-nav">-->
<!--      <router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)">&lt; prev</router-link>-->
<!--      <a v-else class="disabled">&lt; prev</a>-->
<!--      <span>{{ page }}/{{ maxPage }}</span>-->
<!--      <router-link v-if="hasMore" :to="'/' + type + '/' + (page + 1)">more &gt;</router-link>-->
<!--      <a v-else class="disabled">more &gt;</a>-->
<!--    </div>-->
<!--    <transition :name="transition">-->
<!--      <div class="news-list" :key="displayedPage" v-if="displayedPage > 0">-->
<!--        <transition-group tag="ul" name="item">-->
<!--          <item v-for="item in displayedItems" :key="item.pid" v-bind:="item">-->
<!--          </item>-->
<!--        </transition-group>-->
<!--      </div>-->
<!--    </transition>-->
    <div style="margin-top: 20px;">
      <input style="width: 89%;" v-model="content"><button @click="submitPost">Add New Post</button>
    </div>
    <div v-if="error_flag">
      <b-alert show variant="danger">Some fatal error happened</b-alert>
    </div>
    <transition :name="transition">
      <div class="news-list">
        <h2 align="center" style="font-weight: 300" v-if="posts.length === 0">
          Sorry! There's nothing here
        </h2>
        <transition-group v-else tag="ul" name="item">
          <Item v-for="item in posts" :key="item.pid" v-bind="item"></Item>
        </transition-group>
      </div>
    </transition>
<!--    <div>-->
<!--      {{ board }}-->
<!--    </div>-->

  </div>
</template>

<script>
  import Item from '../components/Item';
  import { sendPost } from '../api/post';

  export default {
    name: 'post-list',
    components: { Item },
    data() {
      return {
        transition: 'slide-right',
        refreshed: true,
        content: '',
        error_flag: false,
      };
    },
    mounted() {
      this.$store.dispatch('FETCH_POST_DATA', { type: this.$route.params.board });
    },
    computed: {
      posts() {
        return this.$store.state.list[this.$route.params.board];
      },
      board() {
        return this.$route.params.board;
      },
    },
    methods: {
      submitPost() {
        sendPost(this.content, this.$route.params.board).then((response) => {
          if (response === 'success') {
            this.$router.go(0);
          } else {
            this.error_flag = true;
          }
        });
      },
    },
    beforeRouteUpdate(to, from, next) {
      this.$store.dispatch('FETCH_POST_DATA', { type: to.params.board }).then(() => {
        this.refreshed = true;
      });
      this.refreshed = false;
      next();
    },
  };
</script>


<style lang="stylus">
  .news-view
    padding-top 0px

  .news-list-nav, .news-list
    background-color transparent
    border-radius 2px

  .news-list-nav
    padding 15px 30px
    position fixed
    text-align center
    top 55px
    left 0
    right 0
    z-index 998
    box-shadow 0 1px 2px rgba(0,0,0,.1)
    a
      margin 0 1em
    .disabled
      color #ccc

  .news-list
    position absolute
    margin 30px 0
    width 100%
    transition all .5s cubic-bezier(.55,0,.1,1)
    ul
      list-style-type none
      padding 0
      margin 0

  .slide-left-enter, .slide-right-leave-to
    opacity 0
    transform translate(30px, 0)

  .slide-left-leave-to, .slide-right-enter
    opacity 0
    transform translate(-30px, 0)

  .item-move, .item-enter-active, .item-leave-active
    transition all .5s cubic-bezier(.55,0,.1,1)

  .item-enter
    opacity 0
    transform translate(30px, 0)

  .item-leave-active
    position absolute
    opacity 0
    transform translate(30px, 0)

  @media (max-width 600px)
    .news-list
      margin 10px 0
</style>
