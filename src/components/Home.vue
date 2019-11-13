<template>

<div id="app">
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav" style="background-color:black">
    <div class="container">
      <a class="navbar-brand js-scroll-trigger" href="#page-top">Bakery Web</a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        Menu
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav text-uppercase ml-auto">
            <li
                class="nav-item"
                v-for="(linkObj, ind) in navList"
                :key="ind"
            >
              <a
                class="nav-link js-scroll-trigger"
                :href="linkObj.path"
                v-if="linkObj.path.indexOf('#') === 0"
            >{{ linkObj.name }}</a>
            <router-link
                class="nav-link js-scroll-trigger"
                v-else
                :to="linkObj.path"
            >{{ linkObj.name }}
            </router-link>
            </li>
          </ul>
        </div>
    </div>
  </nav>

  <!-- Header -->
  <header class="masthead">
    <div class="container">
      <div class="intro-text">
        <div class="intro-lead-in">Welcome To Our Bakery Web!</div>
        <div class="intro-heading text-uppercase">It's Nice To Meet You</div>
        
      </div>
    </div>
  </header>

<Services></Services>
<Franchises></Franchises>
<Cart></Cart>
<Contact></Contact>
<Mypage></Mypage>



  
  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-4">
          <span class="copyright">Copyright &copy; KimAJo</span>
        </div>
        <div class="col-md-4">
          <ul class="list-inline social-buttons">
            <li class="list-inline-item">
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="#">
                <i class="fab fa-facebook-f"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="#">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <ul class="list-inline quicklinks">
            <li class="list-inline-item">
              <a href="#">Privacy Policy</a>
            </li>
            <li class="list-inline-item">
              <a href="#">Terms of Use</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</div>
</template>

<script>
import Franchises from './Franchises.vue'
import Services from './Services.vue'
import Cart from './Cart.vue'
import Mypage from './Mypage.vue'
import Contact from './Contact.vue'


export default {
  name: 'app',
  components:{
    
    Franchises,
    Services,
    Cart,
    Mypage,
    Contact,
    //Carousel,
    //Slide
  },

  data:()=>({
      navList: [
            {
                name: 'Services',
                path: '#services'
            },
            {
                name: 'Franchises',
                path: '#franchises'
            },
            {
                name: 'Cart',
                path: '#cart'
            },
            {
                name: 'Contact',
                path: '#contact'
            },
            {
                name: 'Mypage',
                path: '#mypage'
            },

            {
                name: 'Signup',
                path: '/signup'
            },
            {
                name: 'Login',
                path: '/login'
            },
            {
                name: 'Logout',
                path: '/logout'
            },


        ]
  })
}
</script>