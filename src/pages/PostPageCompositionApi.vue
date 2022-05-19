<template>
  <div>
    <!-- <h1>{{likes}}</h1>
    <button @click="addLike">Add</button> -->

    <h1>Page with posts</h1>
    <my-input v-model="searchQuery" placeholder="Search ..." v-focus />
    <div class="app__btns">
      <my-button @click="showDialog">Create post</my-button>
      <my-button @click="fetchPosts">Get posts</my-button>      
      <my-button @click="loadMorePosts">Get more posts</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <post-list
      v-bind:posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Loading ...</div>
    <!-- <div v-intersection="loadMorePosts" class="observer"></div> -->
    <Pagging v-bind:pageP="page" v-bind:totalPagesP="totalPages" @click="changePage"/>  
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
import { ref } from "vue";
import usePosts from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";
import Pagging from "@/components/Pagging.vue";

export default {
  components: {
    PostList,
    PostForm,
    MyDialog,
    MyButton,
    MySelect,
    MyInput,
    Pagging
  },
  data() {
    return {
      //dialogVisible: false,
      sortOptions: [
        { value: "title", name: "po title" },
        { value: "body", name: "po body" },
      ],
    };
  },
  methods: {
    // createPost(post) {
    //   this.posts.push(post);
    //   this.dialogVisible = false;
    //   console.log(post);
    // },
    // removePost(post) {
    //   this.posts = this.posts.filter((p) => p.id !== post.id);
    // },
    // showDialog() {
    //   this.dialogVisible = true;
    // },
  },
  setup(props) {
    // const likes = ref(0)
    // console.log(likes)
    // const addLike = () => {
    //   likes.value += 1
    // }
    // return {
    //   likes,
    //   addLike
    // }

    const { posts, totalPages, isPostsLoading, fetchPosts, loadMorePosts, page, createPost, showDialog, removePost, dialogVisible ,changePage } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      totalPages,
      isPostsLoading,fetchPosts,loadMorePosts,page, createPost, showDialog, removePost, dialogVisible, changePage,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    };
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
