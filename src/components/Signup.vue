<template>
  <div class="container">
    <div>
      <br>
      <h1>Sign Up</h1>
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
                v-model="form.name"
                type="text"
                placeholder="Enter your username"
                required
              ></b-form-input>
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
              ></b-form-input>

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
              ></b-form-radio-group>
            </b-form-group>
            <b-form-group
              label-cols-sm="5"
              id="input-group-birthday"
              label="Birthday:"
              label-for="input-birthday"

              class="mb-3"
            >
              <b-form-input
                id="input-birthday"
                v-model="form.birthday"
                type="date"
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



    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Signup',
    data() {
      return {
        form: {
          email: '',
          name: '',
          password: '',
          gender: null,
          birthday: '',
        },
        show: true,
      };
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        // eslint-disable-next-line no-alert;
        alert(JSON.stringify(this.form));
        axios.post('/api/signup/', JSON.stringify(this.form))
          .then((response) => {
            alert(response);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      onReset(evt) {
        evt.preventDefault();
        // Reset our form values
        this.form.email = '';
        this.form.name = '';
        this.form.gender = null;
        this.form.birthday = '';
        this.form.password = '';
        // Trick to reset/clear native browser form validation state
        this.show = false;
        this.$nextTick(() => {
          this.show = true;
        });
      },

    },
  };
</script>

<style scoped>

</style>
