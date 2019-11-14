<template>

<section class="page-section" id="cart">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h2 class="section-heading text-uppercase" style="font-size: 60px">Franchises</h2>
          <h3 class="section-subheading text-muted" style="font-size: 30px">Choose from our connecting stores</h3>
        </div>
      </div>

  <div class="container">
    <div class="text-field">
      <h5 id="theme" style="font-size: 40px">매장 선택하기</h5>

      <div id="app">
        <reactive-base app="bakery_manager" credentials="WQ73FJ2Me:93ebb63e-a51c-42f5-8b8e-69c0c664b7d3">
          <reactive-list componentId="SearchResult" dataField="_id" :showResultStats="false" :pagination="true" :from="0" :size="10">
            <div slot="renderData" slot-scope="{ item }">
              <div class="flex book-content" key="item._id">
                <div class="flex column justify-center ml20">
                  <div style="font-weight: bold;">
                    <button v-on:click="goto_store(item._id)" style="font-size: 20px">{{ item.storeName }}</button>
                  </div>
                  <div class="inline-1" style="margin-bottom:10px; margin-left:10px; margin-top:5px;">


                  </div>
                </div>
              </div>
            </div>
          </reactive-list>

        </reactive-base>
      </div>

    </div>
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
</div>
</section>
</template>


<script>
import "./styles.css";
import axios from 'axios'
const baseurl = 'https://scalr.api.appbase.io'

export default {
  name: 'Store',
  data() {
    return {

    };
  },

  created() {

  },

  methods: {
    goto_home() {
      this.$router.replace('/home');
    },

    goto_store(manager_id) {
      this.$session.set('managerId', manager_id);
      this.$router.replace('/cart');
    },


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Arbutus+Slab&display=swap');
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap');
@import 'bootstrap.css';



#nav_home {
  color: white;
}


.container {
  font-family: 'Noto Sans KR', sans-serif;
}
</style>
