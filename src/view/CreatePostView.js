import PostList from './PostList';

export default function createListView(board) {
  return {
    name: `${board}-stories-view`,

    asyncData({ store }) {
      return store.dispatch('FETCH_POST_DATA', { type: board });
    },

    render(h) {
      return h(PostList, { props: { board } });
    },
  };
}
