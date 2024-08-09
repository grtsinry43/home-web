<script setup lang="ts">

</script>

<template>
  <div class="app-container">
    <!--<NavBar/>-->
    <NavBarMobile/>
    <div class="content-container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.content-container {
  background: yellowgreen;
}
</style>
