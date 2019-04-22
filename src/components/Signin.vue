<template>
  <div class="login" id="login">


    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
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
        console.log('abc');
        // eslint-disable-next-line no-alert;
        alert(JSON.stringify(this.form));
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
