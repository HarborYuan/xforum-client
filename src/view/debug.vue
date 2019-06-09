<template>
  <div>
    {{ data }}
  </div>
</template>

<script>
  export default {
    name: 'debug',
    computed: {
      data() {
        return this.$store.state;
      },
    },
  };
</script>

<style scoped>

</style>
