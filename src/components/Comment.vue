<template>
  <li class="comment">
    <div class="by">
      <router-link :to="'/user/' + this.uid">{{ this.username }}</router-link>
      {{ timeAgo }}
    </div>
    <div class="text" v-html="this.content"></div>
<!--    <div class="toggle" :class="{ open }" v-if="comment.kids && comment.kids.length">-->
<!--      <a @click="open = !open">{{-->
<!--        open-->
<!--        ? '[-]'-->
<!--        : '[+] ' + pluralize(comment.kids.length) + ' collapsed'-->
<!--        }}</a>-->
<!--    </div>-->
<!--    <ul class="comment-children" v-show="open">-->
<!--      <comment v-for="id in comment.kids" :key="id" :id="id"></comment>-->
<!--    </ul>-->
  </li>
</template>

<script>
  import { convertTimeAgo } from '../api/general';

  export default {
    name: 'comment',
    props: {
      uid: Number,
      content: String,
      username: String,
      createtime: String,
    },
    computed: {
      timeAgo() {
        return convertTimeAgo(this.createtime);
      },
    },
    methods: {
      // pluralize: n => n + (n === 1 ? ' reply' : ' replies')
    },
  };
</script>

<style lang="stylus">
  .comment-children
    .comment-children
      margin-left 1.5em

  .comment
    border-top 1px solid #eee
    position relative
    .by, .text, .toggle
      font-size .9em
      margin 1em 0
    .by
      color #828282
      a
        color #828282
        text-decoration underline
    .text
      overflow-wrap break-word
      a:hover
        color #ff6600
      pre
        white-space pre-wrap
    .toggle
      background-color #fffbf2
      padding .3em .5em
      border-radius 4px
      a
        color #828282
        cursor pointer
      &.open
        padding 0
        background-color transparent
        margin-bottom -0.5em
</style>
