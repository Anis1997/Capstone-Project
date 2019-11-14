<template>
  <div class="container-start">

      <div class="row">
        <div class="col-lg-12 text-center">
          <h2 class="section-heading text-uppercase" style="font-size: 60px">My page</h2>
          <h3 class="section-subheading text-muted" style="font-size: 30px">Your info</h3>
        </div>
      </div>

    <div class="container">
      <div class="text-field">
        <h5 id="theme" style="font-weight:bold;">마이 페이지</h5>

        <div class="welcome">
          {{this.uName}}님의 개인정보를 확인하세요
        </div>

        Name: <span class="user_info">{{ this.uName }}</span>
        <div class="crack" />
        Email: <span class="user_info">{{ this.uEmail }}</span>
        <div class="crack" />
        Password: <span class="user_info">{{ this.uPassword }}</span>
        <div class="crack" />
        <span>
          <span>
              <md-dialog :md-active.sync="showDialog">
                <md-dialog-title>Change info</md-dialog-title>

                <md-tabs md-dynamic-height>
                  <md-tab md-label="비밀번호 변경">
                    <input type="password" v-model="password" class="form-control" placeholder="새 비밀번호">
                    <input type="password_trial" v-model="password_trial" class="form-control" placeholder="새 비밀번호 재입력">
                  </md-tab>
                </md-tabs>

                <md-dialog-actions>
                  <md-button class="md-primary" @click="showDialog = false">취소</md-button>
                  <md-button class="md-primary" @click="change_password()">변경</md-button>
                </md-dialog-actions>
              </md-dialog>

              <button class="btn btn-danger btn-sm" @click="showDialog = true" style="margin-left:10px;">비밀번호 변경</button>
            </span><br><br>

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

  

        </span>



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

import axios from 'axios'
const baseurl = 'https://scalr.api.appbase.io'

export default {
  name: 'Mypage',
 data() {
    return {
      showDialog: false,
      showDialog1: false,
      uName: '',
      barcode: '',
      bakery_coin: 0,
      contact: '',
      uEmail: '',
      addr: '',
      uPassword: '',
      coupon_lists: null,
    };
  },

  created() {
      this.uName = this.$session.get('uName');
      this.uEmail = this.$session.get('uEmail');
      this.uPassword = this.$session.get('uPassword');
    },
   
  methods: {
    goto_home() {
      this.$router.replace('/')
    },
    change_password() {
      if(this.password == this.password_trial){
        // axios POST
        axios({
            method: 'POST',
            url: baseurl + '/bakery_consumer' + this.uName + '/_update',
            headers: {
              Authorization: 'Basic eXVkeG5LSXFGOmM4NWFiNGE0LWQ0ZTktNDJjNC1iMDdkLTMzMTMwYTU1MzRhMw==',
              'Content-Type': 'application/json'
            },
            data: {
              'doc': {
                'password': this.password,
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
       
      }else{
        alert("비밀번호가 일치하지 않습니다!");
      }
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
</style>
