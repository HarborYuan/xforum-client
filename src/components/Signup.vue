<template>
  <div class="container-fluid">
    <div>
      <br>
      <h1>Sign Up</h1>
      <p  v-if="fail_flag" style="color: #dc3545">Some kinds of error</p>
      <br>
    </div>
    <div class="col-md-6 offset-md-3">
      <b-card bg-variant="light" v-if="show">
        <div>
          <b-form
            @submit="onSubmit"
            @reset="onReset"
          >
            <b-form-group
              label-cols-sm="5"
              id="input-group-username"
              label="User Name:"
              label-for="input-username"

            >
              <b-form-input
                id="input-username"
                v-model="form.username"
                type="text"
                placeholder="Enter your username"
                @input="onUsernameChange"
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
              label-cols-sm="5"
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
              label-cols-sm="5"
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
                @input="onEmailChange"
              ></b-form-input>
              <b-form-invalid-feedback
                id="passwordValidated"
                v-bind:state="isEmailValid"
                >
                Email Registered!
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              label-cols-sm="5"
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
              label-cols-sm="5"
              id="input-group-birthday"
              label="Birthday:"
              label-for="input-birthday"
              required
              class="mb-3"
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
              class="mb-0"
            >
              <b-button type="submit" variant="primary">Submit</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form-group>
          </b-form>
        </div>

      </b-card>
    </div>



<!--    <b-card class="mt-3" header="Form Data Result">-->
<!--      <pre class="m-0">{{ form }}</pre>-->
<!--    </b-card>-->
<!--    <b-card class="mt-3" header="response">-->
<!--      <pre class="m-0">{{ responses }}</pre>-->
<!--    </b-card>-->
  </div>
</template>

<script>
  import axios from 'axios';
  import app from '../App';

  export default {
    name: 'Signup',
    data() {
      return {
        // form: {
        //   email: 'Bob@bobindustry.co',
        //   username: 'Bob',
        //   password: 'password',
        //   gender: 0,
        //   birthday: '9102-01-01',
        // },
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
    created() {

    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        // this.onEmailChange(evt);
        // this.onUsernameChange(evt);
        // console.log(this.isUsernameValid);
        // console.log(this.isEmailValid);
        if (this.isUsernameValid === 'valid' && this.isEmailValid === 'valid') {
          axios.post(`${app.baseURL}api/signup/`, JSON.stringify(this.form))
            .then((response) => {
              console.log(response);
              this.responses = 'response';
              if (response.data === 'U100') {
                this.$router.push('/signin/');
              }
            })
            .catch((error) => {
              this.fail_flag = true;
              console.log(error);
              // this.responses = error;
            });
        }
      },
      onReset(evt) {
        evt.preventDefault();
        // Reset our form values
        this.logined = true;
        this.form.email = '';
        this.form.username = '';
        this.form.gender = null;
        this.form.birthday = '';
        this.form.password = '';
        // Trick to reset/clear native browser form validation state
        this.show = false;
        this.$nextTick(() => {
          this.show = true;
        });
      },
      onUsernameChange(evt) {
        // evt.preventDefault();
        console.log(evt);
        axios.post(`${app.baseURL}api/checkusername/`, JSON.stringify(this.form))
          .then(
            (response) => {
              console.log(response);
              if (response.data === 'C100-1') {
                console.log(response.data);
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
        console.log(evt);
        axios.post(`${app.baseURL}api/checkemail/`, JSON.stringify(this.form))
          .then(
            (response) => {
              console.log(response);
              if (response.data === 'C100-1') {
                this.isEmailValid = 'invalid';
              } else if (response.data === 'C100-0') {
                this.isEmailValid = 'valid';
              }
            },
          )
          .catch(
            (error) => {
              console.log(error);
            },
          );
      },

    },
  };
</script>

<style scoped>

</style>
