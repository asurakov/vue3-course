<template>
  <div>
    <h1>Page with posts</h1>
    <my-input v-model="searchQuery" placeholder="Search ..." v-focus />
    <div class="app__btns">
      <my-button @click="showDialog">Create post</my-button>
      <my-button @click="fetchPosts">Get posts</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>

    <!--v-bind:posts="posts" -->
    <!--v-bind:posts="sortedPosts" -->
    <post-list
      v-bind:posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    
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
import Pagging from "@/components/Pagging.vue";

export default {
  components: {
    PostList,
    PostForm,
    MyDialog,
    MyButton,
    MySelect,
    MyInput,
    Pagging,    
  },
  data() {
    return {
      posts: [
        /*{id: 1, title: 'Javascript', body: "Description post"},
                {id: 2, title: 'Javascript 2', body: "Description post 2"},
                {id: 3, title: 'Javascript 3', body: "Description post 3"},*/
      ],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "po title" },
        { value: "body", name: "po body" },
      ],
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPages: 0,      
    };
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
    changePage(pageNumber) {
      console.log(pageNumber)
      this.page = pageNumber      
      this.fetchPosts()
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = response.data;
        console.log(response);
      } catch (e) {
        alert("Error");
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;        
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = [...this.posts, ...response.data];
        console.log(response);
      } catch (e) {
        alert("Error");
      }
    },
  },

  mounted() {
    this.fetchPosts();

    // console.log(this.$refs.observer);
    // const options = {
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // };
    
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     console.log("load more");
    //     this.loadMorePosts();               
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {
    selectedSort(newValue) {
      //console.log(newValue)
      //this.posts.sort((post1, post2) => {
      //    return post1[newValue]?.localeCompare(post2[newValue])
      //})
    },
    // page() {
    //     this.fetchPosts()
    // }
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
