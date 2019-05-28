<template>
  <h1>Success</h1>
</template>

<script>
  export default {
    name: 'Success',
    mounted() {
      new Promise(resolve => setTimeout(resolve, 500)).then(() => {
        this.$router.push('/signin/');
      });
    },
  };
</script>

<style scoped>

</style>
