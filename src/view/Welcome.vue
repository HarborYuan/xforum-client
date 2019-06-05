<template>
  <div>
    <b-jumbotron class="box">
      <div class="box-item">
        <h1 class="display-4"><span style="font-family: 'Brush Script MT', 'Chalkduster', 'Segoe Print',sans-serif; font-size: larger">X</span>-Forum</h1>
        <p class="lead">Connect the voices around the world!</p>
      </div>
      <!--      <p>For more information visit website</p>-->
      <div v-if="error_flag">
        <b-alert show variant="danger">Some fatal error happened</b-alert>
      </div>
      <Signup v-if="!this.isLoggedIn"></Signup>
    </b-jumbotron>


  </div>


</template>

<script>
  import Signup from '../components/Signup';
  // eslint-disable-next-line no-unused-vars

  export default {
    name: 'welcome',
    components: { Signup },
    data() {
      return {
        panel: {
          path: 'index',
        },
        error_flag: false,
        debug: this.$store.state.debug,
      };
    },
    computed: {
      isLoggedIn() { return this.$store.state.isLoggedIn; },
    },
    mounted() {
    },
  };
</script>

<style scoped>
  .box {
    display: flex;
    background: transparent;
    margin-left: 40px;
    margin-top: 0px;
    padding-top: 20px;
  }
  .box::before {
    filter: blur(2px);
  }
  .box-item {
    margin-top: 150px;

    color: #f8f8f8;
  }
</style>
