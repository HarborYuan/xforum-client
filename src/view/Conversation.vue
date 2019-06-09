<template>
  <div class="item-view-header">
    <div v-if="error_flag">
      <b-alert show variant="danger">Some fatal error happened</b-alert>
    </div>
    <div v-if="not_found">
      <b-alert show variant="danger">User Not Found</b-alert>
    </div>
    <h1><a :href="'/user/' + uid + '/'">{{ user }}</a></h1>
    <div class="message">
      <div v-for="msg in msgs">
        <MessageBubble :correspondent="user" :msg="msg"></MessageBubble>
      </div>
    </div>

    <div style="margin: 50px 0px 10px 0px; text-align: center;">
      <input style="width: 950px;" v-model="content"><button @click="submitMsg">Send</button>
    </div>

  </div>
</template>

<script>
  import MessageBubble from '../components/MessageBubble';
  import { getUser } from '../api/user';
  import { recConversation, sendMsg } from '../api/message';

  export default {
    name: 'Conversation',
    data() {
      return {
        user: 'hello',
        uid: this.$route.params.uid,
        error_flag: false,
        not_found: false,
        msgs: [],
        content: '',
      };
    },
    components: { MessageBubble },
    mounted() {
      getUser(this.$route.params.uid).then((response) => {
        if (response === 'USER_NOT_FOUND') {
          this.not_found = true;
          this.$router.push('/404/');
        } else if (response === 'fail') {
          this.error_flag = true;
        } else {
          this.user = response.username;
        }
      }).catch(() => {
        this.error_flag = true;
      });
      recConversation(this.uid).then((response) => {
        if (response === 'NOT_LOG_IN') {
          this.$store.commit('LOGOUT');
          this.$router.push('/404/');
        } else if (response !== 'fail') {
          this.msgs = response.messages;
        }
      });
    },
    methods: {
      submitMsg() {
        if (this.content === '') {
          return;
        }
        sendMsg(this.uid, this.content).then((response) => {
          if (response === 'success') {
            this.content = '';
            recConversation(this.uid).then((res) => {
              if (res === 'NOT_LOG_IN') {
                this.$store.commit('LOGOUT');
                this.$router.push('/');
              } else if (res !== 'fail') {
                this.msgs = res.messages;
              }
            });
          } else {
            this.error_flag = true;
          }
        });
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .item-view-header
    background-color hsla(0,0%,100%,.7)
    padding 0 0 0 0
    box-shadow 0 1px 2px rgba(0,0,0,.1)
    min-height 1000px
    h1
      /*display inline*/
      background-color hsla(0,0%,100%,.5)
      text-align center
      font-size 2 em
      font-weight lighter
      margin 0 0 0 0
      position fixed
      width 1000px
    .host, .meta, .meta a
      color #828282
    .message
      padding-top 100px
</style>
