<template>
    <div>
      <h1>Add Book</h1>
      <form @submit.prevent="addBook">
        <div>
          <label for="isbn">ISBN:</label>
          <input type="text" v-model="isbn" id="isbn" required />
        </div>
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="name" id="name" required />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import db from '../firebase/init.js';
import { collection, addDoc } from 'firebase/firestore';
import BookList from '../components/BookList.vue';
import axios from 'axios';

export default {
  setup() {
    const isbn = ref('');
    const name = ref('');
    const message = ref('');

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number');
          return;
        }
        const response = await axios.post('https://addbook-xbuh7vzecq-uc.a.run.app', {
          isbn: isbnNumber,
          name: name.value
        });
        isbn.value = '';
        name.value = '';
        message.value = response.data.message;
        alert('Book added successfully!');
      } catch (error) {
        console.error('Error adding book: ', error);
        message.value = 'Failed to add book';
      }
    };

    return {
      isbn,
      name,
      message,
      addBook,
    };
  }
};
</script>