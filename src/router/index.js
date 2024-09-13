import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import { useAuth } from '../router/authenticated'
import LogoutView from '../views/LogoutView.vue'; 
import AddBookView from '../views/AddBookView.vue';
import BookListView from '../views/BookListView.vue'; 
const { isAuthenticated } = useAuth()

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView,
  },
  {
    path: '/booklist',
    name: 'BookList',
    component: BookListView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView,
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: LogoutView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'About' && !isAuthenticated.value) {
    alert("You need to log in to access this page.");
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router