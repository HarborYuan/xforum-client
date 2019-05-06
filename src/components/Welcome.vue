<template>
  <div>
    <b-jumbotron>
      <h1 class="display-4"><span style="font-family: 'Brush Script MT', 'Chalkduster', sans-serif; font-size: larger">X</span>-forum</h1>
      <p class="lead">Connect the voices around the world!</p>
<!--      <p>For more information visit website</p>-->
      <b-button variant="primary" href="#/signup">Join us</b-button>
      <b-button variant="primary" href="#/signin">Sign in</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
  import axios from 'axios';
  import app from '../App';

  export default {
    name: 'welcome',
    data() {
      return {
        panel: {
          path: 'index',
        },
      };
    },
    created() {
      axios.post(`${app.baseURL}api/getposts/`, '{"path":"index"}').then(
        (response) => {
          if (response.data !== 'U200') {
            this.$router.push('/home');
          }
        },
      ).catch();
    },
  };
</script>

<style scoped>

</style>
