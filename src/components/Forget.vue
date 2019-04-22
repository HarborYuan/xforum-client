<template>
  <div class="container">
    <div>
      <br>
      <h1>Forget</h1>
      <br>
    </div>
    <div class="col-md-6 offset-md-3">
      <b-card bg-variant="light">
        <div>
          <b-form
            @submit="onSubmit"
            @reset="onReset"
            @change="onChange"

          >
            <b-form-group
              label-cols-sm="5"
              id="input-group-type"
              label="What do you remember:"
              label-for="input-type"
              class="mb-2"
            >
              <b-form-radio-group
                class="pt-2"
                :options="[
              { value: 1, text: 'E-mail' },
              { value: 0, text: 'Username' },
            ]"
                v-model="form.type"
              ></b-form-radio-group>
            </b-form-group>
            <b-form-group
              label-cols-sm="5"
              id="input-group-username"
              label="User Name:"
              label-for="input-username"
              v-if="show_username"
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
              label-cols-sm="5"
              id="input-group-email"
              label="E-mail:"
              label-for="input-email"
              v-if="show_email"
            >
              <b-form-input
                id="input-email"
                v-model="form.email"
                type="email"
                placeholder="Enter your E-mail"
              ></b-form-input>

            </b-form-group>



            <b-form-group
              id="submit-group"
              class="mb-0"
            >
              <b-button type="submit" variant="primary">Submit</b-button>
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
          username: '',
          type: null,
        },
        show_username: false,
        show_email: false,
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
      onChange(evt) {
        evt.preventDefault();
        if (this.form.type === 0) {
          this.show_username = true;
          this.show_email = false;
        } else {
          this.show_username = false;
          this.show_email = true;
        }
      },
    },
  };
</script>

<style scoped>

</style>
