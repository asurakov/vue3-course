<template>
  <div>
    <!--<h1>{{$store.state.isAuth ? "User auth" : "Go to auth"}}</h1>
    <h1>{{ $store.getters.doubleLikes }}</h1>
    <div>
      <my-button @click="$store.commit('incrementLikes')">Like</my-button>
      <my-button @click="$store.commit('decrementLikes')">Dislike</my-button>
    </div>-->

    <h1>Page with posts</h1>
    <my-input :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Search ..." v-focus />
    <div class="app__btns">
      <my-button @click="showDialog">Create post</my-button>
      <my-button @click="fetchPosts">Get posts</my-button>
      <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
      v-bind:posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <!--v-bind:posts="posts" -->
    <div v-else>Loading ...</div>
    <!--<div ref="observer" class="observer"></div>-->
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!--<div class="page__wrapper">
      <div
        class="page"
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        :class="{
          current_page: page === pageNumber,
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div>-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: {
    PostList,
    PostForm,
    MyDialog,
    MyButton,
    MySelect,
    MyInput,
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
      console.log(post);
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
  
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
  },

  mounted() {
    this.fetchPosts();
  },

  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    }),
  },
  watch: {

  },
};
</script>

<style>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current_page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background: teal;
}
</style>
