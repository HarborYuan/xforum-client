<template>
  <div>
    <h1>Test</h1>
    <MessageBubble :sender="true"></MessageBubble>
    <MessageBubble :sender="false"></MessageBubble>
  </div>
</template>

<script>
  import Comment from '../components/Comment';
  import PostView from './PostView';
  import InfoPage from './InfoPage';
  import TextEditor from '../components/TextEditor';
  import MessageBubble from '../components/MessageBubble';

  // import TextEditor from '../components/TextEditor';

  export default {
    name: 'Test',
    components: {
      MessageBubble,
      InfoPage,
      PostView,
      Comment,
      TextEditor,
    },
    computed: {
      posts() {
        return this.$store.state.list.index;
      },
    },
    mounted() {
    },
    // data() {
    //   return {
    //     item: JSON.parse('{\n' +
    //       '  "uid": 1,\n' +
    //       '  "username": "alice",\n' +
    //       '  "createtime": "2006-01-02 15:04:05",\n' +
    //       '  "content": "我在马路边捡到一分钱",\n' +
    //       '  "response": [\n' +
    //       '    {\n' +
    //       '      "uid": 2,\n' +
    //       '      "username": "bob",\n' +
    //       '      "createtime": "2006-01-02 15:04:05",\n' +
    //       '      "content": "我并不认为你捡过钱"\n' +
    //       '    },\n' +
    //       '    {\n' +
    //       '      "uid": 1,\n' +
    //       '      "username": "alice",\n' +
    //       '      "createtime": "2006-01-02 15:04:05",\n' +
    //       '      "content": "我确确实实捡了钱"\n' +
    //       '    },\n' +
    //       '    {\n' +
    //       '      "uid": 1,\n' +
    //       '      "username": "alice",\n' +
    //       '      "createtime": "2006-01-02 15:04:05",\n' +
    //       '      "content": "我就是捡了钱"\n' +
    //       '    }\n' +
    //       '  ]\n' +
    //       '}'),
    //   };
    // },
    methods: {
      click() {
        // this.$store.commit('SET_BOARD', { path: 'index' });
        this.$store.dispatch('FETCH_POST_DATA', { type: 'index' }).then((response) => {
          console.log(response);
        });
      },
    },
  };
</script>

<style scoped>

</style>
