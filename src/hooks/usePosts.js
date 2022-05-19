import axios from "axios";
import {ref, onMounted} from "vue";

export default function usePosts(limit) {
    const posts = ref([])
    const totalPages = ref(0)
    const isPostsLoading = ref(true)
    const page = ref(1)
    const dialogVisible = ref(false)

    const fetchPosts = async () => {
        try {        
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts",
                {
                    params: {
                        _page: page.value,//1, //this.page,
                        _limit: limit,
                    },
                }
            );
            totalPages.value = Math.ceil(response.headers["x-total-count"] / limit);
            posts.value = response.data;
            console.log(response);
        } catch (e) {
            alert("Error");
        } finally {
            isPostsLoading.value = false;
        }
    }

    onMounted(fetchPosts)

    const loadMorePosts = async () => {
        try {
          page.value += 1;        
          const response = await axios.get("https://jsonplaceholder.typicode.com/posts",
            {
              params: {
                _page: page.value,
                _limit: limit,
              },
            }
          );
          totalPages.value = Math.ceil(response.headers["x-total-count"] / limit);
          posts.value = [...posts.value, ...response.data];
          console.log(response);
        } catch (e) {
          alert("Error");
        }
      }

      const createPost = (post) => {
        posts.value.push(post);
        dialogVisible.value = false;
        console.log(post);
      }

      const showDialog = () => {
        dialogVisible.value = true;
      }

      const removePost = (post) => {
        posts.value = posts.value.filter((p) => p.id !== post.id);
      }

      const changePage = (pageNumber) => {
        console.log(pageNumber)
        page.value = pageNumber      
        fetchPosts()
      }

    return {
        posts, isPostsLoading, totalPages, fetchPosts, loadMorePosts, page, removePost, createPost, showDialog, dialogVisible, changePage
    }
}
