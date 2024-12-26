<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<template>
    <Navbar />
    <main>
        <div>
            <RouterView />
        </div>
    </main>
</template>