<template>
<div class="container-start">
<br>
<br>
      <div class="row">
        <div class="col-lg-12 text-center">
          <h2 class="section-heading text-uppercase">Bakery Items</h2>
          <h3 class="section-subheading text-muted">Choose whatever you want</h3>
        </div>
      </div>
      <br>
      <br>
  <div class="container">
    <div class="text-field">
      <h5 id="theme" style="font-weight:bold;">
        <span style="color: #4463DC;">{{this.store_name}}</span>
        <span>매장 제품 확인하기</span>
      </h5>
      <md-button class="md-accent" v-on:click="goto_franchises()">이전 페이지</md-button>

      <br>
      <br>

<span>
              <md-dialog :md-active.sync="showDialog">
                <md-dialog-title>Recommendation for you!</md-dialog-title>

                <md-tabs md-dynamic-height>
    
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

<button class="btn btn-danger btn-sm" @click="showDialog = true" style="margin-left:10px; font-size:20px">Recommended for you!</button>
     </span>
<br>
      <div class="grid-container" style="margin-top:20px;">
        <div id="app">
          <reactive-base app="bakery_product" class="base" credentials="rucxxdjm3:7d5fd3b6-f237-4c31-ad2b-5ab5ff3b3ae2">
            <div class="filters-container">
              <multi-list componentId="Category" dataField="pCategory.keyword" class="filter" title="카테고리를 선택" selectAllLabel="모두"
              :defaultQuery="this.defaultQuery" />
            </div>





            <reactive-list componentId="SearchResult" dataField="_id"  class="products" :showResultStats="false"
            :pagination="true" :from="0" :size="3" :react="{and: ['Category']}" :defaultQuery="this.defaultQuery">
              <div slot="renderData" slot-scope="{ item }">
                <div class="flex book-content" key="item._id">
                  <div class="flex column justify-center ml20">
                    <img :src="item.pImg" alt="Image" class="book-image" />
                    <div style="font-weight:bold; margin-bottom:10px;">{{ item.pName }}</div>
                    <table style="margin-bottom:5px; width:300px;">
                      <tr>
                        <td style="color: #4463DC;">[가격]</td>
                        <td>{{ item.pPrice }}</td>
                        <td style="color:blue;"><button class="btn btn-sm" style="font-weight:bold; color:red;" v-on:click="get_amount(item._id)">매장수량 확인</button></td>
                        <td id="amount_place" v-if="(get_now_id()==item._id) && (get_click_type() == 1)"></td>
                      </tr>
                    </table>

                    <div style="margin-bottom:5px; margin-top:5px;" class="input-group mb-3">
                      <div class="input-group-append">
                        <button type="button" class="btn btn-warning btn-sm" v-on:click="cart_clicked(item._id)">카트 추가</button>
                        <div class="input-group-append" style="margin-left:5px;" v-if="(get_now_id()==item._id) && (get_click_type() == 2)">
                          <input type="number" v-model="user_amount" placeholder="수량" style="width:50px;">
                          <button type="button" class="btn" v-on:click="add_cart(item._id, item.pName)">추가</button>
                        </div>
                      </div>
                      <button type="button" class="btn btn-sm btn-danger" v-on:click="delete_cart(item.pName)">카트 삭제</button>
                    </div>


                  </div>
                </div>
              </div>
            </reactive-list>

          </reactive-base>
        </div>

        <div class="cart">
          <div>
            <h4 style="font-weight: bold;">나의 장바구니</h4>
            <div>
              <md-button class="md-raised md-dense md-accent" v-on:click="cart_reset()">비우기</md-button>
              <md-button class="md-raised md-dense" style="background-color:#44DC72;" v-on:click="goto_pay()">예약하기</md-button>
            </div>

            <div style="margin-top:20px;">
              <div v-if="this.cart_name.length == 0">장바구니가 비어있습니다.</div>
              <table id="cart_lists" style="width:200px;"></table>
            </div>

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
</div>

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
      cart_price: [],
      now_tot_amount: 0,
      click_type: 0,
      tot_price: 0,
      showDialog:false,
    };
  },
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
      this.click_type = 2;
    },
    get_now_id() {
      return (this.now_id);
    },
    get_click_type(){
      return(this.click_type);
    },
    add_cart(id, name, price) {
      if (this.user_amount <= 0) {
        alert("양수를 입력해주세요!");
      } else {
        var a = this.cart_name.indexOf(name);
        if (a == -1) {
          // newly add
          this.cart_name.push(name);
          this.cart_amount.push(this.user_amount);
          this.cart_price.push(price);
          alert("추가되었습니다");
        } else {
          // change amount
          this.cart_amount[a] = this.user_amount;
          alert("수량 변경되었습니다");
        }
        this.user_amount = null;
        var html = '';
        html += '<table><tr><td style="font-weight:bold; color:blue;">제품명</td><td style="font-weight:bold; color:blue;">수량</td></tr>';
        var temp_price = 0;
        for (var i = 0; i < this.cart_name.length; i++) {
          html += '<tr><td>';
          html += this.cart_name[i];
          html += '</td><td>';
          html += this.cart_amount[i];
          html += '</td></tr>';
          // get tot_price
          temp_price += (this.cart_price[i]*this.cart_amount[i]);
        }
        html += '</table>';
        document.getElementById("cart_lists").innerHTML = html;
        this.tot_price = temp_price;
      }
    },
    cart_reset() {
      this.cart_name = [];
      this.cart_amount = [];
      this.cart_price = [];
      this.tot_price = 0;
      document.getElementById("cart_lists").innerHTML = '';
    },
    delete_cart(name) {
      // check if in cart
      var i = this.cart_name.indexOf(name);
      if (i == -1) {
        alert("카트에 없습니다");
      } else {
        this.cart_name.splice(i, 1);
        this.cart_amount.splice(i, 1);
        this.cart_price.splice(i, 1);
        // update cart
        var html = '';
        var temp_price = 0;
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
            // get tot_price
            temp_price += (this.cart_price[i]*this.cart_amount[i]);
          }
          html += '</table>';
        }
        document.getElementById("cart_lists").innerHTML = html;
        this.tot_price = temp_price;
      }
    },
    goto_pay() {
      if (this.cart_name.length != 0) {
        // make cart array (JSON object array)
        var arr = '[';
        for (var i = 0; i < this.cart_name.length; i++) {
          arr += '{ "pName" : "';
          arr += this.cart_name[i];
          arr += '", "pAmount" : "';
          arr += this.cart_amount[i];
          arr += '", "pPrice" : "';
          arr += this.cart_price[i];
          if (i != (this.cart_name.length - 1)) {
            arr += '" },';
          } else {
            arr += '" }]';
          }
        }
        var arr_final = JSON.parse(arr);
        this.$session.set('cart_array', arr_final);
        this.$session.set('cart_price', this.tot_price);
        this.$router.replace('/pay');
      } else {
        alert("장바구니가 비어있습니다!");
      }
    },
    get_amount(id){
      this.click_type = 1;
      this.now_id = id;
      // get total amount
      axios({
          method: 'POST',
          url: baseurl + '/bakery_product/_mget',
          headers: {
            Authorization: 'Basic cnVjeHhkam0zOjdkNWZkM2I2LWYyMzctNGMzMS1hZDJiLTVhYjVmZjNiM2FlMg==',
            'Content-Type': 'application/json'
          },
          data: {
            "docs": [{
              "_id": id,
            }, ]
          }
        })
        .then((response) => {
          console.log(response);
          var detail = response.data.docs[0]._source.pDetail;
          var tot = 0;
          for(var i=0; i<detail.length; i++){
            tot += parseInt(detail[i].pAmount);
          }
          this.now_tot_amount = tot;
          document.getElementById("amount_place").innerHTML = tot;
        }).catch((e) => {
          console.log(e.response)
        })
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
</style>
