<script setup>
import {ref, watchEffect} from 'vue';
import {useColorScheme} from "@/util/useColorScheme.js";
import bus from "@/eventBus.js";

// 定义深浅模式的变量
const isDark = ref(false);

// 切换深浅模式
const handleThemeButton = () => {
  isDark.value = !isDark.value;
};

watchEffect(() => {
  //当深浅模式变量改变时，发出自定义事件
  bus.config.globalProperties.$bus.emit('themeChange', isDark.value);
});

useColorScheme();
</script>

<template>
  <header>
    <banner/>

  </header>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae ea eius explicabo fuga harum, incidunt laborum
  maiores neque nihil numquam optio possimus quaerat quia repudiandae sequi, sit vero voluptates voluptatibus!
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae ea eius explicabo fuga harum, incidunt laborum
  maiores neque nihil numquam optio possimus quaerat quia repudiandae sequi, sit vero voluptates voluptatibus!
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae ea eius explicabo fuga harum, incidunt laborum
  maiores neque nihil numquam optio possimus quaerat quia repudiandae sequi, sit vero voluptates voluptatibus!
  <!--<RouterView/>-->
  <button @click="handleThemeButton">切换</button>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
