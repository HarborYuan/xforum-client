<template>
  <li class="news-item">
    <span class="name">{{ getInitials(username) }}</span>
    <span class="title">
      <router-link :to="'/post/' + pid" >{{ content }}</router-link>
    </span>
    <br>
    <span class="meta">
      <span class="by">
        by <router-link :to="'/user/' + uid">{{ username }}</router-link>
      </span>
      <span class="time">
        {{ timeAgo }}
      </span>
    </span>
  </li>
</template>

<script>
  import { convertTimeAgo } from '../api/general';

  export default {
    name: 'news-item',
    props: {
      pid: Number,
      uid: Number,
      username: String,
      createtime: String,
      content: String,
    },
    computed: {
      timeAgo() {
        return convertTimeAgo(this.createtime);
      },
      // uid() {
      //   return this.$store.state.posts[this.pid].uid;
      // },
      // username() {
      //   return this.$router.state.posts[this.pid].username;
      // },
      // content() {
      //   return this.$router.state.posts[this.pid].content;
      // },
    },
    methods: {
      getInitials(name) {
        const names = name.split(' ');
        if (/.*[\u4e00-\u9fa5]+.*/.test(name)) {
          return name[0];
        } else if (names.length >= 2) {
          return names[0][0].toUpperCase() + names[1][0].toUpperCase();
        }
        return name[0].toUpperCase();
      },
    },
  };
</script>

<style lang="stylus">
  .news-item
    background-color hsla(0,0%,100%,.7)
    padding 20px 30px 20px 80px
    border-bottom 1px solid #eee
    position relative
    line-height 20px
    .name
      color #ff6600
      font-size 2em
      font-weight 300
      position absolute
      top 50%
      left 0
      width 80px
      text-align center
      margin-top -10px
    .meta, .host
      font-size .85em
      color #828282
      a
        color #828282
        text-decoration underline
        &:hover
          color #ff6600
</style>
