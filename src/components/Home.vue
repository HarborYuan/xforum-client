<template>
  <div>
    <div>
      <b-nav tabs fill>
        <b-nav-item variant="link" @click="changeBoard(board.path)" v-for="board in boards">{{ board.name }}</b-nav-item>
      </b-nav>
    </div>
    <b-card-group deck>
      <b-card class="card card__one" v-for="(post, index) in posts" v-show="show" @click="getComments(index)">
        <b-card-title>{{ post.content }}</b-card-title>
        <b-card-sub-title><p class="meta">
          {{ post.createtime }} | {{ post.username }}
        </p></b-card-sub-title>
      </b-card>
      <b-card v-show="!show">
        <b-card-title>
          {{ posts[this.new_comment.pid].content }}
        </b-card-title>
        <p class="meta">
          {{ this.posts[this.new_comment.pid].createtime }} | {{ this.posts[this.new_comment.pid].username }}
        </p>
        <b-card-group deck>
          <b-card class="item-view-header" v-show="!show" v-for="(comment, index) in comments">
            <b-card-title>{{ comment.content }}</b-card-title>
            <p class="meta">
              {{ comment.createtime }} | {{ comment.username }}
            </p>
          </b-card>
        </b-card-group>
        <div>
          <p></p>
          <b-button v-if="!show" variant="primary" @click="onReturn">return</b-button>
        </div>
      </b-card>
    </b-card-group>
    <b-card v-show="!show">
      <b-form-textarea
        id="postarea"
        v-model="new_comment.content"
        rows="10"
      >
      </b-form-textarea>
      <p></p>
      <b-button @click="onSubmit" variant="primary">submit</b-button>
    </b-card>
    <div>
      <br>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import TimeAgo from 'javascript-time-ago';
  import en from 'javascript-time-ago/locale/en';
  import app from '../App';

  export default {
    name: 'Home',
    data() {
      return {
        boards: [{ name: '', path: '' }],
        response: 'Hello',
        comments: [
          {
            uid: 6,
            createtime: '',
            content: '',
          },
        ],
        posts: [
          {
            pid: 1,
            uid: 1,
            createtime: '',
            content: '',
          },
        ],
        panel: {
          path: 'index',
        },
        show: true,
        show_nothing: false,
        new_comment: {
          pid: 0,
          content: '',
        },
      };
    },
    created() {
      this.updatePosts();
      this.updateBoard();
    },
    methods: {
      onSubmit() {
        axios.post(`${app.baseURL}api/addresponse/`, JSON.stringify(this.new_comment)).then(
          (response) => {
            if (response.data === 'R100') {
              alert('success');
              this.new_comment = { pid: 1, content: '' };
              this.show = true;
            }
          },
        );
      },
      updatePosts() {
        axios.post(`${app.baseURL}api/getposts/`, JSON.stringify(this.panel)).then(
          (response) => {
            this.response = response;
            if (response.data === 'U200') {
              // 清除cookies
              this.$router.push('/');
            } else if (response.data === 'G104') {
              this.posts = [{ content: 'Unfortunately, there is nothing here.' }];
            } else {
              this.posts = response.data.posts;
              this.convertTimeAgo();
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
      convertTimeAgo() {
        const postLen = this.posts.length;
        TimeAgo.addLocale(en);
        for (let i = 0; i < postLen; i += 1) {
          const current = new TimeAgo('en-US');
          this.posts[i].createtime = current.format(Date.parse(this.posts[i].createtime));
        }
      },
      changeBoard(path) {
        this.panel.path = path;
        this.updatePosts();
        this.show = true;
      },
      onReturn(evt) {
        evt.preventDefault();
        // eslint-disable-next-line no-console
        console.log(evt);
        this.show = !this.show;
        console.log(this.show);
      },
      getComments(i) {
        console.log(i);
        this.show = false;
        this.new_comment.pid = this.posts[i].pid;
        console.log('new_comment:');
        console.log(this.new_comment);
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
  body {
    display: flex;
    align-items: center;
    min-height: 100vh;
    background: #f8f8f8;
  }
  .grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 340px;
    margin: 0 auto;
  }
  @media screen and (min-width: 768px) {
    .grid {
      max-width: 1200px;
    }
  }
  .card {
    position: relative;
    flex: 1 1 100%;
    margin: 31px 0;
    padding: 20px;
    background: white;
  }
  @media screen and (min-width: 768px) {
    .card {
      flex-basis: calc(33.33% - (62px + 40px));
      margin: 0 31px;
    }
  }
  .card__thumb {
    overflow: hidden;
  }
  .card__img {
    margin: -20px -20px 0;
  }
  .card__img img {
    max-width: 100%;
    height: auto;
    border: 0;
    vertical-align: middle;
    box-sizing: border-box;
  }
  .card__desc {
    margin-top: 20px;
  }
  .card__two .card__img {
    padding: 20px;
  }
  .card__one {
    transition: transform .5s;
  }
  .card__one::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 2s cubic-bezier(0.165, 0.84, 0.44, 1);
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
    content: '';
    opacity: 0;
    z-index: -1;
  }
  .card__one:hover,
  .card__one:focus {
    transform: scale3d(1.006, 1.006, 1);
  }
  .card__one:hover::after,
  .card__one:focus::after {
    opacity: 1;
  }
  .card__two::before,
  .card__two::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity .38s ease-in-out, transform .35s ease-in-out;
    content: '';
    opacity: 0;
    pointer-events: none;
  }
  .card__two::before {
    transform: scale3d(0, 1, 1);
    transform-origin: left top;
    border-top: 1px solid #acacac;
    border-bottom: 1px solid #acacac;
  }
  .card__two::after {
    transform: scale3d(1, 0, 1);
    transform-origin: right top;
    border-right: 1px solid #acacac;
    border-left: 1px solid #acacac;
  }
  .card__two:hover::before,
  .card__two:hover::after,
  .card__two:focus::before,
  .card__two:focus::after {
    transform: scale3d(1, 1, 1);
    opacity: 1;
  }
  .card__three::before,
  .card__three::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: scale3d(0, 0, 1);
    transition: transform .3s ease-out 0s;
    background: rgba(255, 255, 255, 0.1);
    content: '';
    pointer-events: none;
  }
  .card__three::before {
    transform-origin: left top;
  }
  .card__three::after {
    transform-origin: right bottom;
  }
  .card__three:hover::before,
  .card__three:hover::after,
  .card__three:focus::before,
  .card__three:focus::after {
    transform: scale3d(1, 1, 1);
  }
  .meta{
    text-align: end;
    color: #acacac;
    font-size: small;
  }
</style>
