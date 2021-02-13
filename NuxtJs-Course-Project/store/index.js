import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex((post) => post.id === editedPost.id);
        state.loadedPosts[postIndex] = editedPost;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) { // special method executed on the server automatically
        return context.app.$axios.$get('/posts.json')
        .then((data) => {
          const postsArray = [];
          for (const key in data) {
            postsArray.push({
              ...data[key],
              id: key
            });
          }
          vuexContext.commit('setPosts', postsArray);
        }).catch((e) => context.error(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts);
      },
      addPost(vuexContext, post) {
        const createdPost = { ...post, updatedDate: new Date() };
        return this.$axios.$post('/posts.json', createdPost)
          .then((data) => {
            vuexContext.commit('addPost', { ...createdPost, id: data.name });
          })
          .catch((error) => {
            console.log(error);
          })
      },
      editPost(vuexContext, post) {
        const editedPost = { ...post, updatedDate: new Date() }
        return this.$axios.$put('/posts/' + post.id + '.json', editedPost)
          .then((res) => { 
            vuexContext.commit('editPost', editedPost); 
          })
          .catch((e) => { 
            console.log(e); 
          });
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
};

export default createStore;