<template>
  <router-link v-bind:to="'/posts/' + path"> {{ name }} </router-link>
</template>

<script>
  export default {
    name: 'Boardlink',
    props: ['name', 'path'],
  };
</script>

<style scoped>

</style>
