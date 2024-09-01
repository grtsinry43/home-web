<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t: $t} = useI18n();
useHead({
  title: `${$t('about')} | ${$t('homePageTitle')}`,
  meta: [
    {
      name: 'description',
      content: $t('meta.description'),
    },
    {
      name: 'keywords',
      content: $t('meta.keywords'),
    }
  ]
})
</script>

<template>

</template>

<style scoped>

</style>
