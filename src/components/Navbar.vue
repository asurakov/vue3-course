<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="links">
      <router-link to="/posts">Posts</router-link>
      <router-link to="/about" style="margin-left: 20px">About</router-link>
    </div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button style="margin-left: 20px" @click="$router.push('/about')" >About</my-button>
      <my-button style="margin-left: 20px" @click="$router.push('/store')" >Store</my-button>
      <my-button style="margin-left: 20px" @click="$router.push('/composition')" >Composition</my-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgrey;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
}
.links {
    height: 30px;
    border: 1px solid black;
    padding: 0 15px;
    display: flex;
    align-items: center;
    margin-left: 20px;
}
</style>