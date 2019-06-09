<template>
  <div id="msglist">
    <div class="item-view-header">
      <h1>Conversation List</h1>
    </div>
    <div v-if="error_flag">
      <b-alert show variant="danger">Some fatal error happened</b-alert>
    </div>
    <transition :name="transition">
      <div class="news-list">
        <h2 align="center" style="font-weight: 300" v-if="msgs.length === 0">
          Sorry! There's nothing here
        </h2>
        <transition-group v-else tag="ul" name="item">
          <Contact v-for="(msg, index) in msgs" v-bind="msg" :key="index"></Contact>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script>
  import Contact from '../components/Contact';
  import { recMsgList } from '../api/message';

  export default {
    name: 'MessageList',
    components: { Contact },
    data() {
      return {
        transition: 'slide-right',
        error_flag: false,
        msgs: [],
      };
    },
    mounted() {
      recMsgList().then((response) => {
        if (response === 'NOT_LOG_IN') {
          this.$store.commit('LOGOUT');
          this.$router.push('/');
        } else if (typeof response === 'string') {
          this.error_flag = true;
        } else {
          thi s.msgs = response.messages;
        }
      }).catch(() => {
        this.error_flag = true;
      });
    },
  };
</script>

<style lang="stylus">
  .item-view-header
    background-color hsla(0,0%,100%,.7)
    padding 1.8em 2em 1em
    box-shadow 0 1px 2px rgba(0,0,0,.1)
    h1
      /*display inline*/
      text-align center
      font-size 2 em
      font-weight lighter
      margin 0
      margin-right .5em
    .host, .meta, .meta a
      color #828282
    .meta a
      text-decoration underline

  .item-view-comments
    background-color hsla(0,0%,100%,.7)
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

  .item-view-editor
    margin-top 10px
    margin-bottom 30px
    padding 1em 0
    h3
      font-weight lighter

  .comment-children
    list-style-type none
    padding 0
    margin 0

  .news-list
    position absolute
    margin 30px 0
    width 100%
    transition all .5s cubic-bezier(.55,0,.1,1)
    ul
      list-style-type none
      padding 0
      margin 0

  @media (max-width 600px)
    .item-view-header
      h1
        font-size 1.25em

</style>

