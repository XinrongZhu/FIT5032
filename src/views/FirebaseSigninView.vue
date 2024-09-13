<template>
    <h1>Sign in</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="signin">Sign in via Firebase</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();

const userRoles = {
  "lalio976379610@gmail.com": "admin",   
  "xzhu0074@monash.student.edu": "user"      
};
const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      const userEmail = user.email;
      
      const role = userRoles[userEmail];
      if (role) {
        console.log("User Role: ", role);
        
        if (role === "admin") {
          router.push("/"); 
        } else if (role === "user") {
          router.push("/");
        }
      } else {
        console.log("No role assigned to this user");
      }
    })
    .catch((error) => {
      console.log("Error: ", error.code);
    });
};
</script>