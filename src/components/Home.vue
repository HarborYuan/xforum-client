<template>
  <div>
    <div>
      <b-button-group v-for="board in boards">
        <b-button variant="link" @click="changeBoard(board.path)">{{ board.name }}</b-button>
      </b-button-group>
    </div>
    <b-card>
      <div class="container">
        <div class="item-view" v-for="(post, index) in posts" v-show="show">
          <div class="item-view-header">
            <a @click="getComments(index)"><h1>{{ post.content }}</h1></a>
            <p class="meta">
              {{ post.createtime }} | {{ getUsername(post.uid) }}
            </p>
          </div>
        </div>
        <div class="item-view">
          <div class="item-view-header" v-show="!show" v-for="(comment, index) in comments">
            <h2 style="font-size:12px">{{ comment.content }}</h2>
            <p class="meta">
              {{ comment.createtime }}
            </p>
          </div>
        </div>
        <div>
          <b-button v-if="!show" variant="link" @click="onReturn">return</b-button>
        </div>

      </div>
    </b-card>
  </div>
</template>

<script>
  import axios from 'axios';
  import app from '../App';

  export default {
    name: 'Home',
    data() {
      return {
        boards: [{ name: '体育', path: 'pe' }, { name: '教育', path: 'edu' }],
        response: 'Hello',
        comments: [
          {
            uid: 3,
            createtime: '2019-05-04 19:44:01',
            content: '附议',
          },
          {
            uid: 4,
            createtime: '2019-05-04 19:44:01',
            content: '反对',
          },
        ],
        posts: [
          {
            pid: 1,
            uid: 1,
            createtime: '2019-03-02 20:29:57',
            content: '是不是太差劲了',
          },
          {
            pid: 2,
            uid: 2,
            createtime: '2019-04-30 20:29:57',
            content: '差评',
          },
        ],
        panel: {
          path: 'index',
        },
        show: true,
      };
    },
    created() {
      axios.post(`${app.baseURL}api/getposts/`, JSON.stringify(this.panel)).then(
        (response) => {
          this.response = response;
          if (response.data === 'U200') {
            // 清除cookies
            this.$router.push('/');
          } else {
            this.posts = response.data.posts;
          }
        },
      ).catch();
      axios.get(`${app.baseURL}api/getboards`).then(
        (response) => {
          console.log(response);
          if (response.data === 'U200') {
            this.$router.push('/');
          } else {
            this.boards = response.data.board;
          }
        },
      ).catch();
    },
    methods: {
      changeBoard(path) {
        this.panel.path = path;
        axios.post(`${app.baseURL}api/getposts/`, JSON.stringify(this.panel)).then(
          (response) => {
            this.response = response;
            if (response.data === 'U200') {
              // 清除cookies
              this.$router.push('/');
            } else {
              this.posts = response.data.posts;
            }
          },
        ).catch();
      },
      getUsername(uid_) {
        console.log(uid_);
        axios.post(`${app.baseURL}api/getuserinfo/`, JSON.stringify({ uid: uid_ })).then(
          (response) => {
            if (response.data === 'G104') {
              return 'Anonymous';
            }
            return response.data.username;
          },
        ).catch();
      },
      onReturn(evt) {
        evt.preventDefault();
        console.log(evt);
        this.show = !this.show;
        console.log(this.show);
      },
      getComments(i) {
        console.log(i);
        this.show = false;
        axios.post(`${app.baseURL}api/getresponse/`, JSON.stringify(this.posts[i])).then(
          (response) => {
            console.log(response);
            if (response.data === 'U200') {
              this.$router.push('/');
            } else {
              this.comments = response.data.response;
            }
          },
        ).catch();
      },
    },
  };
</script>

<style scoped>
  .item-view-header {
    background-color: #fff;
    padding: 1.8em 2em 1em;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
  }
    h1 {
      text-decoration-style: solid;
      text-decoration-color: #527394;
      line-height: 20px;
      display: inline;
      font-size: 16px;
      margin: 0 .5em 0 0;
      font-weight: 300;


    }
    .host, .meta, .meta a {
      color: #828282;
      font-size: 12px;
      text-align: left;
    }
    .meta a {
      text-decoration: underline
    }

    .item-view-comments {
      background-color: #fff;
      margin-top: 10px;
      padding: 0 2em .5em
    }

    .item-view-comments-header{
    margin: 0;
    font-size: 1.1em;
    padding: 1em 0;
    position: relative
    }
    .spinner{
    display: inline-block;
    margin: -15px 0;}

    .comment-children{
    list-style-type: none;
    padding: 0;
    margin: 0}

    @media (max-width: 600px) {
      .item-view-header
      h1 {
        font-size: 1.25em
      }
    }
</style>
