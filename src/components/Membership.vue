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
      .then((response) => {
        console.log(response);
        this.buying_manager = response.data.docs[0]._source.name;
        this.buying_store = response.data.docs[0]._source.address;
      }).catch((e) => {
        console.log(e.response)
      })
    var currentDate = new Date();
    var currentDateWithFormat = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
    this.buying_date = currentDateWithFormat;
  },
  destroyed() {
      this.$barcodeScanner.destroy()
  },
  methods: {
    goto_home() {
      this.$router.replace('/home')
    },
    openDialogFunction(){
      payWindow = true;
      this.tot_price = this.sum
    },
    closeDialogFunction(){
      payWindow = false;
    },
    check_coin(){
      if(this.user_barcode == null){
         //test용 테스트시 alert 부분 주석처리하고 이거 사용할것
        //this.user_barcode = "8801111000000"
        alert("바코드를 입력해주세요.")
      }
      if(payWindow == true && this.user_barcode != null){
        axios({
            method: 'POST',
            url : baseurl+'/bakery_customer/_search',
            headers: {
                Authorization: 'Basic anhaMFFSQzdhOjhlNDhjYzhlLWUxNmUtNDNiNy1hZjUyLTkzODBkZmU1NDVhNA==',
                'Content-Type': 'application/json'
            },
            data: {
                  'query':{
                      'match_phrase':{
                          'barcode': this.user_barcode
                      }
                  }
               }
        }).then((response) => {
            console.log(response);
            if(response.data.hits.hits.legnth != 0 ){
              var data = response.data.hits.hits[0]._source
              var coin = data.bakeryCoin
              this.user_name = data.name
              this.user_id = response.data.hits.hits[0]._id
              if(this.tot_price <= coin){
                this.user_remain_coin = coin*1 - this.tot_price*1
                alert("결제 가능합니다.\n현재 Bakery Coin 잔액 : "+numberFormat(coin)+"원\n결제 후 Bakery Coin 잔액 : "+numberFormat(this.user_remain_coin)+"원")
                this.user_bakeryCoin = this.tot_price
                document.getElementById("payButton").disabled = false
                this.ok_pressed = true
              }
              else{
                alert("잔액이 부족합니다.\n현재 Bakery Coin 잔액 : "+numberFormat(coin)+"원")
              }
            }
            else {
              alert("회원 정보에 해당 바코드가 존재하지 않습니다.\n회원이 아니시거나 바코드가 잘못되었습니다.")
            }
        }).catch((ex)=> {
            console.log("ERR!!!!! : ", ex)
        })
      }
    },
    defaultQuery: function(value, props){
      return {
        query: {
          match: {
            pManagerID: this.uid
          }
        }
      }
    },
    onBarcodeScanned (barcode) {
      console.log(barcode)
      if(payWindow == true){ // 결제창일때 바코드 작동
        document.getElementById("user_barcode").value = barcode // 바코드란 값 변경해주기
        this.user_barcode = barcode;
      }
      else{ //결제창 아닐때 바코드 작동
        axios({
          method: 'GET',
          url : baseurl+'/bakery_product/_search?q=*'+barcode+'*',
          headers: {
            Authorization: 'Basic cnVjeHhkam0zOjdkNWZkM2I2LWYyMzctNGMzMS1hZDJiLTVhYjVmZjNiM2FlMg=='
          }
        }).then((response) => {
            console.log(response);
            var pName = ''
            var pPrice = ''
            pName = response.data.hits.hits[0]._source.pName
            pPrice = response.data.hits.hits[0]._source.pPrice
            if (this.product_list.includes(pName)) {
              alert("이미 목록에 존재하는 상품입니다.")
            } else {
              this.product_list.push(pName)
              this.product_amount.push(1)
              this.sum += parseInt(pPrice)
            }
            var html = '<table>';
            for (var i = 0; i < this.product_list.length; i++) {
              html += '<tr>';
              html += '<td>' + this.product_list[i] + '</td>';
              html += '<td>' + this.product_amount[i] + '</td>';
              html += '</tr>';
            }
            html += '</table>';
            document.getElementById("lists").innerHTML = html;
        }).catch((ex)=> {
            alert("바코드에 해당되는 상품이 없습니다!")
            console.log("ERR!!!!! : ", ex)
        })
      }
    },
    get_name(name, price, id) {
      this.product_name = name
      if (this.product_list.includes(name)) {
        alert("이미 품목에 추가되었습니다")
      } else {
        this.product_list.push(name)
        this.product_amount.push(1)
        this.product_id.push(id)
        this.sum += parseInt(price)
      }
      var html = '<table>';
      for (var i = 0; i < this.product_list.length; i++) {
        html += '<tr>';
        html += '<td>' + this.product_list[i] + '</td>';
        html += '<td>' + this.product_amount[i] + '</td>';
        html += '</tr>';
      }
      html += '</table>';
      document.getElementById("lists").innerHTML = html;
    },
    reset() {
      this.product_list = []
      this.product_amount = []
      this.product_id = []
      this.sum = 0
      this.tot_price = 0
      document.getElementById("lists").innerHTML = this.product_list
    },
    delete_product(name, price) {
      var a = this.product_list.indexOf(name);
      if (a != -1) {
        var temp = (this.product_amount[a]) * parseInt(price);
        this.product_list.splice(a, 1);
        this.product_amount.splice(a, 1);
        this.product_id.splice(a, 1);
        this.sum -= temp;
        var html = '<table>';
        for (var i = 0; i < this.product_list.length; i++) {
          html += '<tr>';
          html += '<td>' + this.product_list[i] + '</td>';
          html += '<td>' + this.product_amount[i] + '</td>';
          html += '</tr>';
        }
        html += '</table>';
        document.getElementById("lists").innerHTML = html;
      }
    },
    change_amount(name, price) {
      var a = this.product_list.indexOf(name);
      if (a != -1) {
        if (this.user_amount > 0) {
          if (this.user_amount > this.product_amount[a]) {
            // add (input-original)
            this.sum += (this.user_amount - this.product_amount[a]) * parseInt(price);
          } else if (this.user_amount < this.product_amount[a]) {
            // gap
            this.sum -= (this.product_amount[a] - this.user_amount) * parseInt(price);
          }
          this.product_amount[a] = this.user_amount;
          this.user_amount = null;
          var html = '<table>';
          for (var i = 0; i < this.product_list.length; i++) {
            html += '<tr>';
            html += '<td>' + this.product_list[i] + '</td>';
            html += '<td>' + this.product_amount[i] + '</td>';
            html += '</tr>';
          }
          html += '</table>';
          document.getElementById("lists").innerHTML = html;
          this.is_clicked = false;
        } else {
          alert("숫자를 입력하세요!");
        }
      } else {
        alert("메뉴를 먼저 선택하세요!");
      }
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
        var user_detail = '[';
        var length = this.product_list.length;
        for (var i = 0; i < length; i++) {
          user_detail += '{ "rAmount" : "';
          user_detail += this.product_amount[i];
          user_detail += '", "rName" : "';
          user_detail += this.product_list[i];
          if (i != length - 1) {
            user_detail += '" },';
          } else {
            user_detail += '" }]';
          }
        }
        // set rType: cash, coin
        var user_type = '{ "cash" : "';
        user_type += this.user_money;
        user_type += '", "coin" : "';
        user_type += this.user_bakeryCoin;
        user_type += '" }';
        if(this.user_barcode != null && this.bakeryCoin != 0){
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
              console.log("바코드 유저 결제 완료")
              console.log(response);
            }).catch((e) => {
              console.log(e.response)
            })
        }
        //axios POST 레코드 생성
        axios({
            method: 'POST',
            url: baseurl + '/bakery_record/_doc',
            headers: {
              Authorization: 'Basic VHF6Z0M3cHhTOjIyMmQyNTE3LTIzNzUtNDMyNC1iZjc1LTEzMDg1ZWM0YWE3ZA==',
              'Content-Type': 'application/json'
            },
            data: {
              "rStore": this.buying_store,
              "rDate": this.buying_date,
              "rBuyer": this.user_name,
              "rPrice": this.sum,
              "rDetail": JSON.parse(user_detail),
              "rType": JSON.parse(user_type),
              "rManagerID": this.uid,
            }
          })
          .then((response) => {
            console.log(response);
            alert("record DB에 입력 완료!");
            alert("결제가 성공적으로 진행되었습니다");
            window.history.go(0);
          }).catch((e) => {
            console.log(e.response)
          })
      } else {
        alert("에러: 승인 거부");
      }
    },
    onCancel() {},
    edit_clicked(name) {
      var a = this.product_list.indexOf(name);
      if (a != -1) {
        this.now_product_name = name;
        this.is_clicked = true;
      } else {
        alert("메뉴를 먼저 선택하세요!");
      }
    },
    get_now_name() {
      return (this.now_product_name);
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
    close_pay() {
      this.remain = null;
      this.user_money = null;
      this.card_number = null;
      this.showDialog = false;
      this.tot_price = 0;
      this.product_list = [];
      this.product_amount = [];
      this.product_price = [];
      this.product_id = [];
      document.getElementById("lists").innerHTML = this.product_list
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
