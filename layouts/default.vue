<script setup lang="ts">
</script>

<template>
  <div class="app-container">
    <NavBar class="nav-bar-desktop"/>
    <NavBarMobile class="nav-bar-mobile"/>
    <div class="content-container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.content-container {
  background: yellowgreen;
  padding-top: 5em;
}

.nav-bar-desktop {
  display: block;
}

.nav-bar-mobile {
  display: none;
}

@media (max-width: 800px) {
  .nav-bar-desktop {
    display: none;
  }

  .nav-bar-mobile {
    display: block;
  }
}
</style>
