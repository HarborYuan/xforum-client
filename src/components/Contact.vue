<template>
  <li class="news-item">
    <span class="name">{{ getInitials(user) }}</span>
    <span class="title">
      <router-link :to="'/conversation/' + uid" >{{ user }}</router-link>
    </span>
    <br>
    <span class="meta">
      <span class="time">
        Last Message: {{ timeAgo }}
      </span>
      <router-link :to="'/user/' + uid" style="float: right">Check Profile</router-link>
    </span>
  </li>
</template>

<script>
  import { convertTimeAgo } from '../api/general';

  export default {
    name: 'news-item',
    props: {
      uid: Number,
      user: String,
      last_time: String,
    },
    computed: {
      timeAgo() {
        return convertTimeAgo(this.last_time);
      },
      // uid() {
      //   return this.$store.state.posts[this.pid].uid;
      // },
      // user() {
      //   return this.$router.state.posts[this.pid].user;
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
      font-size 2.5 em
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
