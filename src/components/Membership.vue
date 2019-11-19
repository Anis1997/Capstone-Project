<!--template>
  <div class="container-start">

      <div class="row">
        <div class="col-lg-12 text-center">
          <h2 class="section-heading text-uppercase" style="font-size: 60px">Membership</h2>
          <h3 class="section-subheading text-muted" style="font-size: 30px">Your info</h3>
        </div>
      </div>

      <br>
      <br>

    <div class="container">
      <div class="text-field" style="font-size:30px">
        <br>
        <br>


        Name: <span class="user_info" style="font-size:25px">{{ this.uName }}</span>
        <div class="crack" />
        Bakery Coin: <span class="user_info" style="font-size:25px">{{ this.bakery_coin }}</span>
        <div class="crack" />
        Barcode: <span class="user_info" style="font-size:25px">{{ this.barcode }}</span>
        <div class="crack" />
       

<button >베이커리코인 충전</button>

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
</template>

<script>
import "./styles.css";
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css';

import axios from 'axios'
const baseurl = 'https://scalr.api.appbase.io'

export default {
  name: 'Membership',
 data() {
    return {
      showDialog: false,
      showDialog1: false,
      uName: null,
      barcode: '',
      bakery_coin: 0,
      contact: '',
      uEmail: null,
      addr: '',
      uPassword: '',
      coupon_lists: null,
      password:null,
      password_trial:null,
    };
  },

  created() {
      this.uName = this.$session.get('uName');
      this.uPassword = this.$session.get('bakery_coin');
      this.uPassword = this.$session.get('barcode');
    },
   
  methods: {
    goto_home() {
      this.$router.replace('/')
    },


  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Arbutus+Slab&display=swap');
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap');
@import 'bootstrap.css';

.crack {
  margin-bottom: 10px;
}
.user_info{
  color: blue;
}

  .md-dialog {
    width: 768px;
  }
</style-->

<template>
<div class="container-start">

      <div class="row">
        <div class="col-lg-12 text-center">
          <h2 class="section-heading text-uppercase" style="font-size: 60px">Membership</h2>
          <h3 class="section-subheading text-muted" style="font-size: 30px">Your info</h3>
        </div>
      </div>

      <br>
      <br>
      
  <div class="container">
    <div class="text-field">

        Name: <span class="user_info" style="font-size:25px">{{ this.uName }}</span>
        <div class="crack" />
        Bakery Coin: <span class="user_info" style="font-size:25px">{{ this.bakery_coin }}</span>
        <div class="crack" />
        Barcode: <span class="user_info" style="font-size:25px">{{ this.barcode }}</span>
        <div class="crack" />
    </div>



          <span>
            <md-dialog :md-active.sync="showDialog" @md-opened="openDialogFunction" @md-closed="closeDialogFunction"> <!--trigger function 추가 -->
              <md-dialog-title>베이커리 코인 충전하기</md-dialog-title>

              <md-tabs md-dynamic-height>
                <md-tab md-label="베이커리 코인 충전하기">
                  <div style="font-weight:bold;">가격: {{this.tot_price}}</div>
                  <span>금액</span>
                  <input type="user_money" v-model="user_money" class="form-control">
                  <md-button class="md-accent md-dense md-raised" @click="got_money()">충전</md-button>
                  <p v-if="remain" style="color:red; font-weight:bold; font-size:20px;">잔돈: {{this.remain}}</p>
                </md-tab>

                

              </md-tabs>

              <md-dialog-actions>
                <md-button class="md-primary" @click="close_pay()">닫기</md-button>
                <md-button id="payButton" class="md-dense md-raised md-primary" @click="pay()" disabled>충전하기</md-button>
              </md-dialog-actions>
            </md-dialog>

            <md-button class="md-primary md-raised" @click="showDialog = true">베이커리 코인 충전하기</md-button>
          </span>


          <md-dialog-confirm :md-active.sync="active" md-title="충전을 취소하시겠습니까?" md-content="" md-confirm-text="확인" md-cancel-text="취소" @md-cancel="onCancel" @md-confirm="close_pay" />
          <md-button class="md-primary md-raised" @click="active = true">취소</md-button>
        </div>
      </div>
</template>


<script>
import axios from 'axios'
const baseurl = 'https://scalr.api.appbase.io'
var payWindow = false;
function numberFormat(inputNumber) { // 정규식으로 숫자 천 단위로 콤마찍기
   return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export default {
  name: 'Membership',
  data() {
    return {
      is_clicked: false,
      active: false,
      showDialog: false,
      user_barcode: null,
      user_money: null,
      user_amount: null,
      uName: null,
      user_bakeryCoin: null,
      user_id: null,
      user_remain_coin: null,
    }
  },
  created() {

    this.uid = this.$session.get('uId');
    this.uName = this.$session.get('uName');
      this.uPassword = this.$session.get('bakery_coin');
      this.uPassword = this.$session.get('barcode');
    // axios POST
    axios({
        method: 'POST',
        url: baseurl + '/bakery_consumer/_mget',
        headers: {
          Authorization: 'Basic eXVkeG5LSXFGOmM4NWFiNGE0LWQ0ZTktNDJjNC1iMDdkLTMzMTMwYTU1MzRhMw==',
          'Content-Type': 'application/json'
        },
        data: {
          "docs": [{
            "_id": this.uid,
          }, ]
        }
      })

  },
  destroyed() {
      this.$barcodeScanner.destroy()
  },
  methods: {
    goto_home() {
      this.$router.replace('/')
    },
    openDialogFunction(){
      payWindow = true;
      this.tot_price = this.sum
    },
    closeDialogFunction(){
      payWindow = false;
    },
    
   
    pay() {
      if (this.ok_pressed) {
        this.remain = null;
        this.showDialog = false;
        if (this.user_money == null){
          // only user BakeryCoin
          this.user_money = 0;
        }
        if (this.user_barcode == null){
          // only use CASH
          this.user_bakeryCoin = 0;
          this.user_name = '익명';
        }
        // set rDetail: rAmount, rName
       
          axios({
              method: 'POST',
              url: baseurl + '/bakery_customer/_doc/' + this.user_id + '/_update',
              headers: {
                Authorization: 'Basic anhaMFFSQzdhOjhlNDhjYzhlLWUxNmUtNDNiNy1hZjUyLTkzODBkZmU1NDVhNA==',
                'Content-Type': 'application/json'
              },
              data: {
                'doc': {
                  'bakeryCoin': this.user_remain_coin,
                }
              }
            })
            .then((response) => {
              //var hits_length = response.data.hits.hits.length
              console.log("")
              console.log(response);
            }).catch((e) => {
              console.log(e.response)
            })
        }

    },
 
    got_money() {
      // when using CASH
      this.remain = null;
      if (this.user_money != null) {
        if (this.user_money < this.sum) {
          alert("잔금 " + (this.sum - this.user_money) + "원은 베이커리 코인으로 결제하세요.");
          this.tot_price = this.sum - this.user_money;
          this.is_remain = true;
          this.is_partial_pay = true;
        } else {
          // big or same Money --> remain!
          this.remain = this.user_money - this.tot_price;
          this.ok_pressed = true;
          document.getElementById("payButton").disabled = false;
        }
      } else {
        alert("에러: 받은 현금이 없습니다!");
      }
    },
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
