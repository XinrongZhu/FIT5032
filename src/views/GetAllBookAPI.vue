<template>
  <div>
    <h1>All Books</h1>
    <pre>{{ books }}</pre> 
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GetAllBookAPI',
  data() {
    return {
      books: null 
    };
  },
  mounted() {
    this.fetchAllBooks();
  },
  methods: {
    async fetchAllBooks() {
      try {
        const response = await axios.get('https://getallbooks-xbuh7vzecq-uc.a.run.app'); 
        this.books = response.data;
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }
  }
};
</script>