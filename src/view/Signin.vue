<template>
  <div class="container">
    <div class="login-style">
      <b-card v-if="show" class="card-style">
        <h1 class="label-header"> Sign In</h1>
        <b-form
          @submit="onSubmit"
        >
          <div v-if="error_flag">
            <b-alert show variant="danger">Some fatal error happened</b-alert>
          </div>
          <b-form-group

            id="input-group-username"
            label="User Name:"
            label-for="input-username"

          >
            <b-form-input
              id="input-username"
              v-model="form.username"
              type="text"
              placeholder="Enter your username"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group

            label-for="input-password"

          >

            <div>
              <label>Password:</label>
              <a class="forget-style" href="#/forget">Forget Password?</a>
            </div>
            <b-form-input
              id="input-password"
              v-model="form.password"
              type="password"
              placeholder="Enter your password"
              required
            ></b-form-input>
          </b-form-group>


          <b-form-group

            id="submit-group"

          >
            <div v-if="fail_flag">
              <b-alert show variant="warning">Wrong Username or Password</b-alert>
            </div>
            <div class="button-style">
              <b-button type="submit" variant="primary" block>Login</b-button>
            </div>




          </b-form-group>
        </b-form>

      </b-card>
    </div>



    <b-card class="mt-3" v-if="debug" header="Form Data Result">
      <pre class="m-0"></pre>
      <b-button @change="ch">Change</b-button>
    </b-card>
  </div>
</template>

<script>
  import { login } from '../api/user';

  export default {
    name: 'Signup',
    data() {
      return {
        form: {
          username: '',
          password: '',
        },
        show: true,
        res: '',
        debug: this.$store.state.debug,
        error_flag: false,
        fail_flag: false,
      };
    },
    computed: {
      isLoggedIn() {
        return this.$store.state.isLoggedIn;
      },
    },
    created() {
      console.log('SignIn');
    },
    watch: {
      isLoggedIn() {
        this.$router.push('/posts/index');
      },
    },
    methods: {
      ch(evt) {
        evt.preventDefault();
      },
      onSubmit(evt) {
        evt.preventDefault();
        login(this.form).then((response) => {
          if (this.debug) console.log(response);
          if (response === 'success') {
            this.$store.commit('LOGIN');
            this.$router.push('/index');
          } else if (response === 'fail') {
            this.fail_flag = true;
            this.$store.commit('LOGOUT');
          } else {
            this.$store.commit('LOGOUT');
            this.error_flag = true;
          }
        });
      },
    },
  };
</script>

<style scoped>
  .login-style{
    padding-top: 50px;
    padding-left: 280px;
    padding-right: 280px;

  }
  .forget-style{
    float: right;
    margin-right: 10px;
    color: #acacac;
  }
  .forget-style:hover{
    float: right;
    margin-right: 10px;
    color: crimson;
  }
  .button-style {
    margin-top: 5px;
  }
  .card-style {
    background: hsla(0,0%,100%,.7);
  }
  .label-header {
    margin: 0px auto 30px 0;
    font-weight: lighter;
  }
</style>
