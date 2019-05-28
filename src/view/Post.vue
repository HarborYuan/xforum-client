<template>
  <div class="container">
    <div>
      <b-nav tabs fill>
        <b-nav-item variant="link" @click="changeBoard(board.path)" v-for="board in boards">{{ board.name }}</b-nav-item>
      </b-nav>
    </div>
    <div><p></p></div>
    <b-form-textarea
      id="postarea"
      v-model="post.content"
      rows="10"
    >
    </b-form-textarea>
    <p></p>
    <b-button @click="onSubmit" variant="primary">submit</b-button>
    <b-button href="#/" variant="danger">Home</b-button>
  </div>
</template>

<script>
  import axios from 'axios/index';
  import app from '../App';

  export default {
    name: 'Post',
    data() {
      return {
        boards: [{ name: 'Index', path: 'index' }],
        post: {
          path: 'index',
          content: '',
        },
      };
    },
    created() {
      this.updateBoard();
    },
    methods: {
      onSubmit() {
        axios.post(`${app.baseURL}api/addposts/`, JSON.stringify(this.post)).then(
          (response) => {
            if (response.data === 'B100') {
              alert('success');
              this.$router.push('/home');
            }
          },
        ).catch();
      },
      updateBoard() {
        axios.get(`${app.baseURL}api/getboards/`).then(
          (response) => {
            // eslint-disable-next-line no-console
            console.log(response);
            if (response.data === 'U200') {
              this.$router.push('/');
            } else {
              this.boards = response.data.board;
            }
          },
        ).catch();
      },
      changeBoard(path) {
        this.post.path = path;
      },
    },
  };
</script>

<style scoped>

</style>
