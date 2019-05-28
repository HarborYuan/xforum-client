<template>
  <div>
    <b-jumbotron class="box">
      <div class="box-item">
        <h1 class="display-4"><span style="font-family: 'Brush Script MT', 'Chalkduster', sans-serif; font-size: larger">X</span>-forum</h1>
        <p class="lead">Connect the voices around the world!</p>
      </div>
      <!--      <p>For more information visit website</p>-->
      <Signup></Signup>
    </b-jumbotron>


  </div>


</template>

<script>
  import Signup from '../components/Signup';

  export default {
    name: 'welcome',
    components: { Signup },
    data() {
      return {
        panel: {
          path: 'index',
        },
      };
    },
  };
</script>

<style scoped>
  .box {
    display: flex;
    background: transparent;


  }
  .box::before {
    filter: blur(2px);
  }
  .box-item {
    margin-top: 100px;
    color: #f8f8f8;
  }
</style>
