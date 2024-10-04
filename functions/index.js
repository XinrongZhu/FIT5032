/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.addBook = onRequest((req, res) => {
    cors(req, res, async () => {
      try {
        const { isbn, name } = req.body;
        const capitalizedName = name.toUpperCase();
        await admin.firestore().collection('books').add({
          isbn,
          name: capitalizedName,
        });
  
        res.status(200).send({ message: 'Book added and capitalized successfully!' });
      } catch (error) {
        console.error('Error adding book:', error.message);
        res.status(500).send('Error adding book');
      }
    });
  });

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection('books');
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({ count });
    } catch (error) {
      console.error('Error counting books:', error.message);
      res.status(500).send('Error counting books');
    }
  });
});

exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection('books');
      const snapshot = await booksCollection.get();
      const books = snapshot.docs.map(doc => doc.data()); 
      
      res.status(200).json(books);
    } catch (error) {
      console.error('Error getting books:', error.message);
      res.status(500).send('Error getting books');
    }
  });
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
