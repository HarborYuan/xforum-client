<template>

  <b-jumbotron style="border-radius: 0px" :header="this.userInfo.username" :lead="'Joined Since '+new Date(userInfo.createtime).getFullYear()">
    <div v-if="error_flag">
      <b-alert show variant="danger">Some fatal error happened</b-alert>
    </div>
    <hr>
    <p>UID： {{ this.userInfo.uid }}</p>
    <p>Age: {{ this.age }}</p>
    <p>Gender: {{ ['Male', 'Female', 'Other'][this.userInfo.gender] }}</p>
    <p><a :href="'mailto:' + this.userInfo.email">📧Contact</a></p>
    <p><router-link :to="'/conversation/' + this.userInfo.uid">Send Message</router-link></p>
  </b-jumbotron>

</template>

<script>

  import { getUserInfo } from '../api/user';

  export default {
    name: 'InfoPage',
    data() {
      return {
        error_flag: false,
        userInfo: {
          uid: 0,
          username: '',
          birthdate: '',
          createtime: '',
          gender: 0,
          email: '',
        },
      };
    },
    mounted() {
      getUserInfo(parseInt(this.$route.params.uid, 10)).then((response) => {
        if (response === 'USER_NOT_FOUND') {
          this.$router.push('/404/');
        } else if (response === 'fail') {
          this.error_flag = true;
        } else {
          this.userInfo = response;
        }
      });
    },
    computed: {
      age() {
        const date = new Date(this.userInfo.birthdate);
        const now = new Date();
        const aged = now.getFullYear() - date.getFullYear();
        if (now.getMonth() < date.getMonth()) {
          return aged;
        } else if (now.getMonth() === date.getMonth()) {
          if (now.getDay() >= date.getDay()) {
            return aged + 1;
          }
          return aged;
        }
        return aged + 1;
      },
    },
  };
</script>

<style scoped>

</style>
