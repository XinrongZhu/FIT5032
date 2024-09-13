<template>
  <div>
    <h1>You have been logged out</h1>
  </div>
</template>

<script setup>
import { getAuth } from "firebase/auth";
import { onMounted } from "vue";

const auth = getAuth();

onMounted(() => {
  console.log("Current user after logout: ", auth.currentUser);
});
</script>
