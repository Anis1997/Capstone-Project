<template>
<section class="page-section" id="cart">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h2 class="section-heading text-uppercase">Your Cart</h2>
          <h3 class="section-subheading text-muted">Please do Come Again</h3>
        </div>
      </div>
    


  <div class="container">
    <div class="text-field">
      <h5 id="theme" style="color:red;">결제 및 예약하기</h5>

      <div class="welcome">
        {{this.uName}}님
      </div>

      <div>
        <h4>장바구니 목록</h4>
        <button v-on:click="show_cart()">장바구니 불러오기</button>
      </div>
      <table id="cart_lists_2" style="width:200px;"></table>


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

import axios from 'axios'
const baseurl = 'https://scalr.api.appbase.io'

export default {
  name: 'Pay',
  data() {
    return {
      uName: '',
      cart_array: null,

    };
  },

  created() {
    this.uName = this.$session.get('uName');
    this.cart_array = this.$session.get('cart_array');

    var html = '<table>';
    for (var i = 0; i < this.cart_array.length; i++) {
      html += '<tr><td>';
      html += this.cart_array[i].pName;
      html += '</td><td>';
      html += this.cart_array[i].pAmount;
      html += '</td></tr>';
    }
    html += '</table>';

    //console.log(document.getElementById("cart_lists_2"));
    console.log(html);
    //document.getElementById("cart_lists_2").innerHTML = html;
  },

  methods: {
    goto_home() {
      this.$router.replace('/home');
    },
    show_cart() {
      var html = '<table><tr><td style="font-weight:bold">제품명</td><td style="font-weight:bold;">수량</td></tr>';
      for (var i = 0; i < this.cart_array.length; i++) {
        html += '<tr><td>';
        html += this.cart_array[i].pName;
        html += '</td><td>';
        html += this.cart_array[i].pAmount;
        html += '</td></tr>';
      }
      html += '</table>';

      document.getElementById("cart_lists_2").innerHTML = html;
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
