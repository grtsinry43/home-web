<script setup>

</script>

<template>
  <!--导航栏-->
  <div class="banner-container">
    <img class="logo" src="" alt="Vue logo" width="100" height="100"/>
    <nav>
      <router-link to="/" exact>Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </div>
</template>

<style scoped>
.banner-container {
  background-color: rgba(185, 90, 255, 0.6);
  border-bottom: 1px solid;
  position: fixed;
  backdrop-filter: blur(10px);
  width: 100%;
}
</style>
