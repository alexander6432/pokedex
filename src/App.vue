<script setup>
import { RouterView } from 'vue-router'
import Generations from './components/Generations.vue';

</script>

<template>
  <v-layout class="rounded rounded-md">
    <Generations />
    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
