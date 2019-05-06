<template>
  <div class="container">
    <div>
      <br>
      <br>
    </div>
    <div class="col-md-8 offset-md-2">
      <b-card
        title="Personal Information"
      >
        <b-media>
          <b-img slot="aside" src="/static/img/avteg.png"></b-img>
          <b-card>
            <h2 class="mt-0" align="left">{{ form.username }}</h2>
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
          </b-card>
        </b-media>
      </b-card>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import app from '../App';

  export default {
    name: 'InfoPage',
    data() {
      return {
        form: app.form,
        isEmailValid: 'valid',
      };
    },
    methods: {
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
  img.avartar{


  }
</style>
