<template>
  <div class="container">
    <div>
      <br>
      <h1>Login in</h1>
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
                required
              ></b-form-input>
            </b-form-group>
            <br>
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

              id="submit-group"
              class="mb-0"
            >
              <div >
                <br>
                <b-button type="submit" variant="primary">Login</b-button>
              </div>
              <div>
                <br>
                <a href="./Forget.vue">Forget Password?</a>
              </div>

              <div>

              </div>

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
          username: '',
          password: '',
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
            alert(response.data);
          })
          .catch((error) => {
            console.log(error.data);
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
