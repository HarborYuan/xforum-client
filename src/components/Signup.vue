<template>
  <div class="box">
    <b-form
      class="form"
      @submit="onSubmit"
    >
      <h1 class="label-header">
        Sign Up
      </h1>
      <b-form-group
        label="User Name"
        id="input-group-username"
        label-for="input-username"
      >
        <b-form-input
          id="input-username"
          v-model="form.username"
          type="text"
          placeholder="Enter your username"
          @change="onUsernameChange"
          required
        ></b-form-input>
        <b-form-invalid-feedback
          id = "usernameValidated"
          v-bind:state="isUsernameValid"
        >
          Username Taken!
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group

        label="Password:"
        label-for="input-password"

      >
        <b-form-input
          id="input-password"
          v-model="form.password"
          type="password"
          placeholder="Enter your password"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group

        id="input-group-email"
        label="E-mail:"
        label-for="input-email"

      >
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          placeholder="Enter your E-mail"
          required
          @change="onEmailChange"
        ></b-form-input>
        <b-form-invalid-feedback
          id="passwordValidated"
          v-bind:state="isEmailValid"
        >
          Email Registered!
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group

        id="input-group-gender"
        label="Gender:"
        label-for="input-gender"
        class="mb-2"
      >
        <b-form-radio-group
          class="pt-2"
          :options="[
              { value: 0, text: 'Male' },
              { value: 1, text: 'Female' },
              { value: 2, text: 'Other' },
            ]"
          v-model="form.gender"
          required
        ></b-form-radio-group>
      </b-form-group>
      <b-form-group
        id="input-group-birthday"
        label="Birthday:"
        label-for="input-birthday"
        required

      >
        <b-form-input
          id="input-birthday"
          v-model="form.birthday"
          type="date"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group

        id="submit-group"

      >
        <div v-if="fail_flag">
          <b-alert show variant="danger">There is some fatal error!</b-alert>
        </div>
        <div class="button-style">
          <b-button block type="submit" variant="warning" >Submit</b-button>
        </div>

      </b-form-group>
    </b-form>
  </div>

</template>

<script>
  import axios from 'axios';
  import store from '../store/store';

  export default {
    name: 'Signup',
    data() {
      return {

        form: {
          email: '',
          username: '',
          password: '',
          gender: null,
          birthday: '',
        },
        show: true,
        fail_flag: false,
        responses: null,
        isUsernameValid: 'valid',
        isEmailValid: 'valid',
      };
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        if (this.isUsernameValid === 'valid' && this.isEmailValid === 'valid') {
          axios.post(`${store.baseURL}api/signup/`, JSON.stringify(this.form))
            .then((response) => {
              if (store.debug) console.log(response);
              this.responses = 'response';
              if (response.data === 'U100') {
                this.$router.push('/success/');
              }
            })
            .catch((error) => {
              this.fail_flag = true;
              if (store.debug) console.log(error);
              // this.responses = error;
            });
        }
      },
      onUsernameChange(evt) {
        // evt.preventDefault();
        if (store.debug) console.log(evt);
        axios.post(`${store.baseURL}api/checkusername/`, JSON.stringify(this.form))
          .then(
            (response) => {
              if (store.debug) console.log(response);
              if (response.data === 'C100-1') {
                if (store.debug) console.log(response.data);
                this.isUsernameValid = 'invalid';
              } else if (response.data === 'C100-0') {
                this.isUsernameValid = 'valid';
              }
            },
          )
          .catch(
            (error) => {
              console.log(error);
            },
          );
      },
      onEmailChange(evt) {
        // evt.preventDefault();
        if (store.debug) console.log(evt);
        axios.post(`${store.baseURL}api/checkemail/`, JSON.stringify(this.form))
          .then(
            (response) => {
              if (store.debug) console.log(response);
              if (response.data === 'C100-1') {
                this.isEmailValid = 'invalid';
              } else if (response.data === 'C100-0') {
                this.isEmailValid = 'valid';
              }
            },
          )
          .catch(
            (error) => {
              if (store.debug) console.log(error);
            },
          );
      },
    },
  };
</script>

<style scoped>
  .box {
    background: hsla(0,0%,100%,.7);
    filter: blur(0);
    width: 50%;
    position: relative;
    margin: auto auto;
    padding-top: 10px;
  }
  .form {
    margin: auto;
    width: 80%;
  }
  .label-header {
    margin: 30px auto 30px 0;
    font-weight: lighter;
  }

  .button-style {
    margin-top: 10px;
    margin-bottom: 15px;
    align-items: center;
  }

</style>
