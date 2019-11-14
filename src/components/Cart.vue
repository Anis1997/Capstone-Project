<template>
<section class="page-section" id="cart">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h2 class="section-heading text-uppercase">Bakery Items</h2>
          <h3 class="section-subheading text-muted">Choose whatever you want</h3>
        </div>
      </div>
<div class="container">
    <div class="text-field">
      <h5 id="theme" style="color:red;">
        <span>{{this.store_name}}</span><br>
        <span>매장 제품 확인하기</span>
      </h5>
      <button v-on:click="goto_franchises()">이전 페이지</button><br><br>
      
      <span>
              <md-dialog :md-active.sync="showDialog">
                <md-dialog-title>Recommendation for you!</md-dialog-title>

                <md-tabs md-dynamic-height>
        <md-tab md-label="New Stuff">
           <reactive-base app="" credentials="">
            <reactive-list componentId="SearchResult" dataField="_id" :showResultStats="false" :pagination="true" :from="0" :size="10" :defaultQuery="this.defaultQuery">
              <div slot="renderData" slot-scope="{ item }">
                <div class="flex book-content" key="item._id">
                  <div class="flex column justify-center ml20">
                    <div style="font-weight:bold; margin-bottom:10px" >{{ item.pName }}</div>
                    <div>
                      <span class="small-title" >[가격] {{ item.pPrice }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </reactive-list>
          </reactive-base>
        </md-tab>

        <md-tab md-label="Most Popular">
          <reactive-base app="bakery_record" credentials="TqzgC7pxS:222d2517-2375-4324-bf75-13085ec4aa7d">
            <reactive-list componentId="SearchResult" dataField="_id" :showResultStats="false" :pagination="true" :from="0" :size="10" :defaultQuery="this.defaultQuery">
              <div slot="renderData" slot-scope="{ item }">
                <div class="flex book-content" key="item._id">
                  <div class="flex column justify-center ml20">
                    <div style="font-weight:bold; margin-bottom:10px" >{{ item.rName }}</div>
                    <div>
                      <span class="small-title" >[가격] {{ item.rPrice }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </reactive-list>
          </reactive-base>
        </md-tab>

        <md-tab md-label="Fitted for you!">
         <reactive-base app="test_record" credentials="o4RZue9dm:3e7a63a1-5139-4a2e-bb0a-c40844c76dc3">
            <reactive-list componentId="SearchResult" dataField="rBuyer" :showResultStats="false" :pagination="true" :from="0" :size="10" :defaultQuery="this.defaultQuery">
              <div slot="renderData" slot-scope="{ item }">
                <div class="flex book-content" key="item._id">
                  <div class="flex column justify-center ml20">
                    <div style="font-weight:bold; margin-bottom:10px" >{{ item.rName }}</div>
                    <div>
                      <span class="small-title" >[가격] {{ item.rPrice }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </reactive-list>
          </reactive-base>
        </md-tab>
      </md-tabs>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
       
      </md-dialog-actions>
    </md-dialog>

              <button class="btn btn-danger btn-sm" @click="showDialog = true" style="margin-left:10px;">Recommended for you!</button>
            </span>


      

      <div class="grid-container">
        <div id="app" class="products">
          <reactive-base app="bakery_product" credentials="rucxxdjm3:7d5fd3b6-f237-4c31-ad2b-5ab5ff3b3ae2">
            <reactive-list componentId="SearchResult" dataField="_id" :showResultStats="false" :pagination="true" :from="0" :size="10" :defaultQuery="this.defaultQuery">
              <div slot="renderData" slot-scope="{ item }">
                <div class="flex book-content" key="item._id">
                  <div class="flex column justify-center ml20">

                    <div style="font-weight:bold; margin-bottom:10px; font-size: 40px" >{{ item.pName }}</div>

                    <div>
                      <button v-on:click="cart_clicked(item._id)">카트 추가</button>
                      <span style="margin-left:10px;" v-if="get_now_id()==item._id">
                        <input type="number" v-model="user_amount" class="form-control" placeholder="수량">
                        <button v-on:click="add_cart(item._id, item.pName)">추가</button>
                      </span>
                      <button v-on:click="delete_cart(item.pName)">카트 삭제</button>
                    </div>


                    <div>
                      <span class="small-title" style="font-size: 30px">[가격] {{ item.pPrice }}</span>
                    </div>

                  </div>
                </div>
              </div>
            </reactive-list>

          </reactive-base>
        </div>

        <div class="cart">
          <div style="font-weight:bold;">
            <h4>나의 장바구니</h4>
            <div>
              <button v-on:click="cart_reset()">비우기</button>
              <button v-on:click="goto_pay()">예약하기</button>
            </div>

            <div>
              <table style="width:200px; color:blue;">
                <tr>
                  <td style="padding-left:30px;">제품명</td>
                  <td style="padding-left:40px;">수량</td>
                </tr>
              </table>
              <table id="cart_lists" style="width:200px;"></table>
            </div>

          </div>
        </div>

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
import 'vue-material/dist/vue-material.min.css'

export default {
  name: 'Product',
  data() {
    return {
      manager_id: '',
      store_name: '',
      now_id: '',
      user_amount: null,
      cart_name: [],
      cart_amount: [],
    };
    
  },
      data: () => ({
      showDialog: false
    }),

  created() {
    this.manager_id = this.$session.get('managerId');
    

    axios({
        method: 'POST',
        url: baseurl + '/bakery_manager/_mget',
        headers: {
          Authorization: 'Basic V1E3M0ZKMk1lOjkzZWJiNjNlLWE1MWMtNDJmNS04YjhlLTY5YzBjNjY0YjdkMw==',
          'Content-Type': 'application/json'
        },
        data: {
          "docs": [{
            "_id": this.manager_id,
          }, ]
        }
        
      })
      .then((response) => {
        console.log(response);
        this.store_name = response.data.docs[0]._source.storeName;

      }).catch((e) => {
        console.log(e.response)
      })
      
  },

  methods: {
    goto_home() {
      this.$router.replace('/');
    },
    goto_franchises() {
      this.$router.replace('/franchises');
    },

    defaultQuery: function(value, props) {
      return {
        query: {
          match: {
            pManagerID: this.manager_id
          }
        }
      }
    },

    cart_clicked(id) {
      this.now_id = id;
    },

    get_now_id() {
      return (this.now_id);
    },

    add_cart(id, name) {
      if (this.user_amount <= 0) {
        alert("양수를 입력해주세요!");
      } else {
        var a = this.cart_name.indexOf(name);

        if (a == -1) {
          // newly add
          this.cart_name.push(name);
          this.cart_amount.push(this.user_amount);
          alert("추가되었습니다");
        }else{
          // change amount
          this.cart_amount[a] = this.user_amount;
          alert("수량 변경되었습니다");
        }

        this.user_amount = null;

        var html = '';

        html += '<table>';

        for (var i = 0; i < this.cart_name.length; i++) {
          html += '<tr><td>';
          html += this.cart_name[i];
          html += '</td><td>';
          html += this.cart_amount[i];
          html += '</td></tr>';
        }

        html += '</table>';

        document.getElementById("cart_lists").innerHTML = html;

      }

    },

    cart_reset() {
      this.cart_name = [];
      this.cart_amount = [];
      document.getElementById("cart_lists").innerHTML = '비어있습니다';
    },

    delete_cart(name) {
      // check if in cart
      var i = this.cart_name.indexOf(name);

      if (i == -1) {
        alert("카트에 없습니다");
      } else {
        this.cart_name.splice(i, 1);
        this.cart_amount.splice(i, 1);

        // update cart
        var html = '';

        if (this.cart_name.length == 0) {
          html = '비어있습니다';
        } else {
          html += '<table>';

          for (var i = 0; i < this.cart_name.length; i++) {
            html += '<tr><td>';
            html += this.cart_name[i];
            html += '</td><td>';
            html += this.cart_amount[i];
            html += '</td></tr>';
          }

          html += '</table>';
        }

        document.getElementById("cart_lists").innerHTML = html;
      }
    },

    goto_pay(){
      if(this.cart_name.length != 0){
        // make cart array (JSON object array)
        var arr = '[';

        for(var i=0; i<this.cart_name.length; i++){
          arr += '{ "pName" : "';
          arr += this.cart_name[i];
          arr += '", "pAmount" : "';
          arr += this.cart_amount[i];

          if(i != (this.cart_name.length - 1)){
            arr += '" },';
          }else{
            arr += '" }]';
          }
        }

        var arr_final =  JSON.parse(arr);
        this.$session.set('cart_array', arr_final);

        this.$router.replace('/pay');
      }else{
        alert("장바구니가 비어있습니다!");
      }
      
    },


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Arbutus+Slab&display=swap');
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap');
@import 'bootstrap.css';

.grid-container {
  display: grid;
  grid-template-areas:
    'app'
    'cart';
}

.base{
  display: grid;
  grid-template-areas:
  'filters-container products products';
}



.text-field {
  margin-left: 40px;
  margin-top: 10px;
}

.container {
  font-family: 'Noto Sans KR', sans-serif;
}

.small-title {
  color: #425DC6;
  font-weight: bold;
}

.products {
  width: auto;
  right: 0;
  overflow-y: scroll;
  height: 65vh;
  display: grid;
  grid-area: products;
  flex-direction: column;
  scroll-behavior: smooth;
  transition: all ease 0.2s;
}

.filters-container {
  width: 20%;
  display: grid;
  grid-area:filters-container;
  flex-direction: column;
  margin-left:10px;
  margin-right:50px;
  margin-top: 140px;
  top: 0;
  scroll-behavior: smooth;
  justify-content: center;
  transition: all ease 0.2s;
  overflow: hidden;
}

.cart {
  grid-area: cart;
  display: grid;
  background-color: white;
  margin-bottom: 50px;
}


#app {
  display: grid;
  grid-area: app;
  right:0;
}

  .md-dialog {
    max-width: 728px;
  }
</style>
