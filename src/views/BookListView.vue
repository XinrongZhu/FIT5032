<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
        <button @click="editBook(book)">Edit</button>
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>

    <div v-if="editingBook">
      <h2>Edit Book</h2>
      <div>
        <label for="name">Name:</label>
        <input v-model="updatedName" id="name" placeholder="Update Book Name" />
      </div>
      <div>
        <label for="isbn">ISBN:</label>
        <input v-model="updatedIsbn" id="isbn" placeholder="Update ISBN" />
      </div>
      <button @click="updateBook(editingBook.id)">Update</button>
    </div>

  </div>
</template>

<script> 
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js'; 
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, orderBy, limit } from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);
    const editingBook = ref(null); 
    const updatedName = ref('');
    const updatedIsbn = ref(''); 

    const fetchBooks = async () => {
      try {
        const q = query(
          collection(db, 'books'),
          where('isbn', '>', 1000),     
          orderBy('isbn', 'desc'),      
          limit(4)                
        );
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray; 
      } catch (error) {
        console.error('Error fetching books: ', error.message); 
      }
    };

    const editBook = (book) => {
      editingBook.value = book;
      updatedName.value = book.name;
      updatedIsbn.value = book.isbn;
    };

    const updateBook = async (id) => {
      try {
        const bookRef = doc(db, 'books', id);  
        await updateDoc(bookRef, {
          name: updatedName.value,
          isbn: Number(updatedIsbn.value) 
        });
        alert('Book updated successfully!');
        fetchBooks(); 
        editingBook.value = null;  
      } catch (error) {
        console.error('Error updating book: ', error);
      }
    };

    const deleteBook = async (id) => {
      try {
        const bookRef = doc(db, 'books', id);  
        await deleteDoc(bookRef);  
        alert('Book deleted successfully!');
        fetchBooks();  
      } catch (error) {
        console.error('Error deleting book: ', error);
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      books,
      editingBook,
      updatedName,
      updatedIsbn,
      editBook,
      updateBook,
      deleteBook
    };
  }
};
</script>