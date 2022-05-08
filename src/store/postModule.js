import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) =>
                post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
            );
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter((post) =>
                post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        },
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        setPage(state, page) {
            state.page = page;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true);                
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts",
                    {
                        params: {
                            _page: state.page,
                            _limit: state.limit,
                        },
                    }
                );
                commit('setTotalPages', Math.ceil(response.headers["x-total-count"] / state.limit))
                commit('setPosts', response.data)                
                console.log(response);
            } catch (e) {
                console.log(e);
                //alert("Error");
            } finally {
                commit('setLoading', false); 
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page + 1);               
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts",
                    {
                        params: {
                            _page: state.page,
                            _limit: state.limit,
                        },
                    }
                );
                commit('setTotalPages', Math.ceil(response.headers["x-total-count"] / state.limit))
                commit('setPosts', [...state.posts, ...response.data])                 
                console.log(response);
            } catch (e) {
                //alert("Error");
                console.log(e);
            }
        },
    },
    namespaced: true
}