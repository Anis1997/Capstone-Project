
<template>
<div class="container-start">
<br>

 <div class="row">
        <div class="col-lg-12 text-center">
          <h2 class="section-heading text-uppercase" style="font-size: 60px">My page</h2>
          <h3 class="section-subheading text-muted" style="font-size: 30px">Your info</h3>
        </div>
      </div>

<br>
<br>

      <div class="welcome" style="margin-bottom:10px;">
        <span style="color:blue;">{{this.uName}}</span>님의 개인정보를 확인하세요
      </div>

      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">이름</th>
            <th scope="col">연락처</th>
            <th scope="col">이메일</th>
            <th scope="col">주소</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-primary">
            <th scope="row">{{this.uName}}</th>
            <td>{{this.contact}}</td>
            <td>{{this.email}}</td>
            <td>{{this.addr}}</td>
          </tr>
        </tbody>
      </table>

      <span style="color:gray;">비밀번호를 변경하시겠습니까?</span>
      <span>
        <span>
          <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>사용자 정보 변경</md-dialog-title>

            <md-tabs md-dynamic-height>
              <md-tab md-label="비밀번호 변경">
                <input type="origin_pwd" v-model="origin_pwd" class="form-control" placeholder="기존 비밀번호">
                <input type="pwd" v-model="new_pwd" class="form-control" placeholder="새 비밀번호">
                <input type="pwd_trial" v-model="new_pwd_trial" class="form-control" placeholder="새 비밀번호 재입력">
              </md-tab>
            </md-tabs>

            <md-dialog-actions>
              <md-button class="md-primary" @click="showDialog = false">취소</md-button>
              <md-button class="md-primary" @click="change_pwd()">변경</md-button>
            </md-dialog-actions>
          </md-dialog>

          <button class="btn btn-danger btn-sm" @click="showDialog = true" style="margin-left:10px;">비밀번호 변경</button>
        </span>

      </span><br>
      <br>
      <br>

      <span>
              <md-dialog :md-active.sync="showDialog1">
                <md-dialog-title>You may like these</md-dialog-title>

       
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
      
                <md-dialog-actions>
                  <md-button class="md-primary" @click="showDialog1 = false">취소</md-button>
                  
                </md-dialog-actions>
              </md-dialog>

              <button class="btn btn-danger btn-sm" @click="showDialog1 = true" style="margin-left:10px;">You may want to check this out!</button>
            </span>

    <br>
    <br>

      <h5 id="theme" style="margin:center, font-weight:bold;">나의 베이커리 코인</h5>
      <div class="sub-container" style="">

        <div class="my_coin">


        </div>

 <div class="card border-info mb-3" style="max-width: 20rem;">
            <div class="card-header">{{this.uName}}님</div>
            <div class="card-body">
     
                <tr>
                  <td>바코드 번호</td>
                  <td>{{this.barcode}}</td>
                </tr>
                 <tr>
                  <td>
                    <barcode v-bind:value="this.barcode" :options="{ format: 'EAN13', lastChar:'>' }" tag="svg">
                      Barcode error <!--오류시 출력 메세지-->
                    </barcode></td>
                </tr>
                <tr>
                  <td>현재 금액</td>
                  <td>{{this.bakery_coin}}</td>
                </tr>

                  <button v-on:click="goto_membership()">My Membership</button>
            
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
var msg=''

function numberFormat(inputNumber) { // 정규식으로 숫자 천 단위로 콤마찍기
   return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function updateCoin(result, id, after_coin){
  if(result){//결제 성공시
    axios({
      method: 'POST',
      url: baseurl + '/bakery_customer/_doc/' + id + '/_update',
      headers: {
        Authorization: 'Basic anhaMFFSQzdhOjhlNDhjYzhlLWUxNmUtNDNiNy1hZjUyLTkzODBkZmU1NDVhNA==',
        'Content-Type': 'application/json'
      },
      data: {
        'doc': {
          'bakeryCoin': after_coin
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
  else{//결제 실패 또는 취소시
  }
  alert(msg);
  msg = '';
  window.history.go(0);
}

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
      showDialog1: false,
      user_pay: null,
    };
  },
  created() {
    this.uName = this.$session.get('uName');
    this.uid = this.$session.get('uId');
    this.barcode = this.$session.get('uBarcode')
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
        this.before_coin = data.bakeryCoin;
      }).catch((e) => {
        console.log(e.response)
      })

       this.$nextTick(() => {
      $(function(){
        var IMP = window.IMP
        IMP.init('imp13189297');
      })
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
       var pg = 'html5_inicis'
      var pay_method = 'card'
      var merchant_uid = 'recharge_'+this.uid+'_'+new Date().getTime()
      var name = '베이커리 코인 : '+this.user_pay +"원"
      var amount = '100' //테스트 결제 시 백원으로 고정
      var buyer_name = this.uName
      var buyer_tel = this.contact
      var buyer_addr = this.addr
      var buyer_email = this.email
      var after_coin = this.before_coin*1 + this.user_pay*1;
      var id = this.uid
      $(function(){
          IMP.request_pay({
          pg : pg,
          pay_method : pay_method,
          merchant_uid : merchant_uid,
          name : name,
          amount : amount,
          buyer_email : buyer_email,
          buyer_name : buyer_name,
          buyer_tel : buyer_tel,
          buyer_addr : buyer_addr,
      }, function(rsp) {
          if ( rsp.success ) {
              msg = '결제가 완료되었습니다.\n';
              //msg += '고유ID : ' + rsp.imp_uid+"\n";
              //msg += '상점 거래ID : ' + rsp.merchant_uid+"\n";
              msg += '결제 금액 : ' + rsp.paid_amount+"\n";
              //msg += '카드 승인번호 : ' + rsp.apply_num+"\n";
              msg += '이용 해 주셔서 감사합니다.'
          } else {
              msg = '결제에 실패하였습니다.\n';
              msg += '에러내용 : ' + rsp.error_msg;
          }
          updateCoin(rsp.success, id, after_coin)
          });
      });
      this.showDialog_2 = false;
    },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Arbutus+Slab&display=swap');
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap');
@import 'bootstrap.css';

.sub-container {
  background-color: #EFEADB;
  display: grid;
  grid-template-areas:
    'my_coin coin_pay';
}
.my_coin {
  grid-area: my_coin;
  display: grid;
}
.coin_pay {
  grid-area: coin_pay;
  display: grid;
}

.container {
  font-family: 'Noto Sans KR', sans-serif;
}
.crack {
  margin-top:5px;
  margin-bottom: 5px;
}
</style>

