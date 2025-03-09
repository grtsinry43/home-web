<script setup lang="ts">
import {ref} from 'vue';

const showAlert = ref(true);
const {t, locale} = useI18n();
const title = ref(locale.value === 'en' ? 'Coming Soon' : '敬请期待');
const notification = ref(locale.value === 'en' ? 'The content of this site is still under development and improvement, you can also refer to the commit history of Github, looking forward to meeting you' : '本站内容还在不断开发和完善中哦，具体也可以参考 Github 的提交历史，期待与你见面');
// const resp = await $fetch('/api/notification');
// console.log(resp);
// if (resp.code === 0) {
//   showAlert.value = true;
//   title.value = resp.data.title;
//   notification.value = resp.data.notification;
// }
</script>

<template>
  <div class="app-container">
    <NavBar class="nav-bar-desktop"/>
    <!--<NavBarMobile class="nav-bar-mobile"/>-->
    <!--<UContainer class="global-alert-container" v-if="showAlert">-->
    <!--  &lt;!&ndash;全站通知，仅在获取到后端数据时显示&ndash;&gt;-->
    <!--  <UAlert :title="title" @close="showAlert = false"-->
    <!--          :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"-->
    <!--          icon="i-heroicons:chat-bubble-left-ellipsis">-->
    <!--    <template #description>-->
    <!--      <span>{{ notification }}</span>-->
    <!--    </template>-->
    <!--  </UAlert>-->
    <!--</UContainer>-->
    <div class="content-container">
      <slot></slot>
    </div>
    <Footer/>
  </div>
</template>

<style scoped>
.content-container {
  padding-top: 5em;
}

.nav-bar-desktop {
  display: block;
}

.nav-bar-mobile {
  display: none;
}


.global-alert-container {
  transform: translateY(5em);
}
</style>
