import Avatar from 'vue-avatar'

<template>
  <div id="app">
    <header class="header">
      <nav class="inner">
        <router-link to="/" exact style="font-variant: small-caps">
          X-Forum
        </router-link>
        <span v-if="isLoggedIn">
          <Boardlink v-for="board in boards" v-bind="board"></Boardlink>
        </span>
        <a v-if="isLoggedIn" @click="logout" class="github">Logout</a>
        <router-link v-if="!isLoggedIn" class="github" to="/signin/">Sign In</router-link>
        <router-link v-if="isLoggedIn" class="github" :to="'/user/' + this.uid">Profile</router-link>
        <router-link v-if="isLoggedIn" class="github" to="/message/">Message</router-link>

      </nav>

    </header>
    <div v-if="error_flag">
      <b-alert show variant="danger">Some fatal error happened</b-alert>
    </div>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
  import Boardlink from './components/Boardlink';
  import { logout } from './api/user';

  export default {
    name: 'app',
    components: { Boardlink },
    data() {
      return {
        error_flag: false,
      };
    },
    computed: {
      isLoggedIn() {
        return this.$store.state.isLoggedIn;
      },
      boards() {
        return this.$store.state.boards;
      },
      uid() {
        return this.$store.state.uid;
      },
    },
    methods: {
      logout() {
        logout().then(() => {
          this.$store.commit('LOGOUT');
          this.$router.push('/');
        });
      },
    },
    beforeCreate() {
      // checkState().then((response) => {
      //   if (this.debug) console.log(response);
      //   if (response === 'error') {
      //     this.$store.commit('LOGOUT');
      //     this.error_flag = true;
      //     this.$router.push('/signin');
      //   } else if (response) {
      //     this.$store.commit('LOGIN');
      //     this.$store.dispatch('FETCH_BOARD_DATA');
      //     // this.$router.push('/posts/index');
      //   }
      // });
      this.$store.dispatch('FETCH_BOARD_DATA').then((response) => {
        if (response === 'refuse') {
          if ((this.$route.path !== '/') && (this.$route.path !== '/signin/')) {
            if (!this.$store.state.debug) this.$router.push('/');
          }
        } else if (response === 'fail') {
          this.error_flag = true;
        } else {
          this.$store.commit('LOGIN');
          this.$store.dispatch('FETCH_SELF_INFO');
        }
      });
    },
  };
</script>

<style lang="stylus">
  body
    font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size 15px
    background-color lighten(#eceef1, 30%)
    margin 0
    padding-top 55px
    color #34495e
    overflow-y scroll
    background #e6ccc0
    background-position center


  a
    color #34495e
    text-decoration none

  .header
    background-color #ee6e15
    position fixed
    z-index 999
    height 55px
    top 0
    left 0
    right 0
    .inner
      max-width 800px
      box-sizing border-box
      margin 0px auto
      padding 15px 5px
    a
      color color #fff
      line-height 24px
      transition color .15s ease
      display inline-block
      vertical-align middle
      font-weight 300
      letter-spacing .075em
      margin-right 1.8em
      &:hover
        color #fff
      &.router-link-active
        color #fff
        font-weight 500
      &:nth-child(6)
        margin-right 0
    .user
      color #ffad7b
      margin 0
      float right
      &:hover
        color #fff3cd
    .github
      color #fff
      font-size .9em
      margin 0 1 0 0
      float right

  .logo
    width 24px
    margin-right 10px
    display inline-block
    vertical-align middle

  .view
    max-width 1000px
    margin 0 auto
    position relative

  .fade-enter-active, .fade-leave-active
    transition all .2s ease

  .fade-enter, .fade-leave-active
    opacity 0

  @media (max-width 860px)
    .header .inner
      padding 15px 30px

  @media (max-width 600px)
    .header
      .inner
        padding 15px
      a
        margin-right 1em
      .github
        display none
</style>
