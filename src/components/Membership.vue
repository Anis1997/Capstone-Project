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

        이름: <span class="user_info" style="font-size:30px">{{ this.uName }}</span>
        <div class="crack" />
        베이커리 코인: <span class="user_info" style="font-size:30px">{{ this.bakery_coin }}</span>
        <div class="crack" />
        바코드: <span class="user_info" style="font-size:30px">{{ this.barcode }}</span>
        <div class="crack" />
    </div>

    <br>
     <br>
     <br>



        <div class="coin_pay">
          <h6 style="font-weight:bold; font-size:40px">코인 충전하기</h6>
          <br>
          <br>
          <div>
            <span>
              <span>
                <md-dialog :md-active.sync="showDialog_2">
                  <md-dialog-title>베이커리 코인 충전하기</md-dialog-title>

                  <md-tabs md-dynamic-height>
                    <md-tab md-label="결제 진행">
                      <p><span style="font-weight:bold; color:red;">{{this.user_pay}}</span>원 결제 진행하시겠습니까?</p>
                    </md-tab>
                  </md-tabs>

                  <md-dialog-actions>
                    <md-button class="md-primary" @click="showDialog_2 = false">취소</md-button>
                    <md-button class="md-primary" @click="pay()">결제</md-button>
                  </md-dialog-actions>
                </md-dialog>

                <button type="button" class="btn btn-success" style="font-size:40px" v-on:click="click_pay(5000)">5000원</button>
                <button type="button" class="btn btn-success" style="font-size:40px" v-on:click="click_pay(10000)">10000원</button>
                <button type="button" class="btn btn-success" style="font-size:40px" v-on:click="click_pay(20000)">20000원</button>
                <button type="button" class="btn btn-success" style="font-size:40px" v-on:click="click_pay(50000)">50000원</button>

              </span>
            </span><br>
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
</template>


<script>
import "./styles.css";
import axios from 'axios'
const baseurl = 'https://scalr.api.appbase.io'
export default {
  name: 'Mypage',
  data() {
    return {
      uName: '',
      barcode: '',
      bakery_coin: 0,
      contact: '',
      email: '',
      addr: '',
      pwd: '',
      origin_pwd: '',
      new_pwd_trial: '',
      new_pwd: '',
      coupon_lists: null,
      uid: '',
      showDialog: false,
      showDialog_2: false,
      user_pay: null,
    };
  },
  created() {
    this.uName = this.$session.get('uName');
    this.uid = this.$session.get('uId');
    // get user info.
    axios({
        method: 'POST',
        url: baseurl + '/bakery_customer/_mget',
        headers: {
          Authorization: 'Basic anhaMFFSQzdhOjhlNDhjYzhlLWUxNmUtNDNiNy1hZjUyLTkzODBkZmU1NDVhNA==',
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
        this.email = response.data.docs[0]._source.email;
        this.barcode = response.data.docs[0]._source.barcode;
        this.bakery_coin = response.data.docs[0]._source.bakerycoin;
        this.contact = response.data.docs[0]._source.contact;
        this.addr = response.data.docs[0]._source.address;
        this.pwd = response.data.docs[0]._source.password;
      }).catch((e) => {
        console.log(e.response)
      })
  },
  methods: {
    goto_home() {
      this.$router.replace('/home');
    },
        goto_membership(){
      this.$router.replace('/membership');
    },
    change_pwd() {
      if (this.pwd == this.origin_pwd) {
        if (this.new_pwd == this.new_pwd_trial) {
          // axios POST
          axios({
              method: 'POST',
              url: baseurl + '/bakery_customer/_doc/' + this.uid + '/_update',
              headers: {
                Authorization: 'Basic anhaMFFSQzdhOjhlNDhjYzhlLWUxNmUtNDNiNy1hZjUyLTkzODBkZmU1NDVhNA==',
                'Content-Type': 'application/json'
              },
              data: {
                'doc': {
                  'password': this.new_pwd,
                }
              }
            })
            .then((response) => {
              //var hits_length = response.data.hits.hits.length
              console.log(response);
              alert("변경되었습니다");
              window.history.go(0);
            }).catch((e) => {
              console.log(e.response)
            })
          this.showDialog = false;
        } else {
          alert("비밀번호가 일치하지 않습니다!");
        }
      } else {
        alert("현재 비밀번호가 잘못 입력되었습니다!");
      }
    },
    click_pay(pay_amount){
      this.showDialog_2 = true;
      // 결제할 금액
      this.user_pay = pay_amount;
    },
    pay(){
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

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

