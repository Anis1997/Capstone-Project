<template>
<div class="container" id="page-container">

  <div id="mypage">


  <div class="container">
    <div class="text-field">
      <h2 class="section-heading text-uppercase">My Page</h2>
      <h3 class="section-subheading text-muted">Your info</h3>

      <div class="description">
        
        <div class="welcome">
          {{this.uName}}님의 개인정보
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
                    <input type="pwd" v-model="pwd" class="form-control" placeholder="새 비밀번호">
                    <input type="pwd_trial" v-model="pwd_trial" class="form-control" placeholder="새 비밀번호 재입력">
                  </md-tab>
                </md-tabs>

                <md-dialog-actions>
                  <md-button class="md-primary" @click="showDialog = false">취소</md-button>
                  <md-button class="md-primary" @click="change_pwd()">변경</md-button>
                </md-dialog-actions>
              </md-dialog>

              <button class="btn btn-danger btn-sm" @click="showDialog = true" style="margin-left:10px;">비밀번호 변경</button>
            </span>

  

        </span>

        



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
</template>


<script>

import axios from 'axios'
const baseurl = 'https://scalr.api.appbase.io'
export default {
  name: 'page',
  data() {
    return {
      showDialog: false,
      pwd: null,
      pwd_trial: null,
      uid: null,

      uName: '',
      uEmail: '',
      uPassword: '',
    };
  },
  created() {
    console.log("type:"+this.$session.type)
    if(this.$session.get('type') != 'User'){
      alert(" 로그인 해주세요")
      this.$router.replace('/')
    }
    this.uid = this.$session.get('uId');
    // axios POST
    axios({
        method: 'POST',
        url: baseurl + '/_search',
        headers: {
          Authorization: 'Basic anhaMFFSQzdhOjhlNDhjYzhlLWUxNmUtNDNiNy1hZjUyLTkzODBkZmU1NDVhNA==',
          'Content-Type': 'application/json'
        },
        data: {
          "docs": [
            {
              "_id": this.uid,
            },
          ]
        }
      })
      .then((response) => {
        console.log(response);
        this.uName = response.data.docs[0]._source.name;
        this.uEmail = response.data.docs[0]._source.email;
        this.uPassword = response.data.docs[0]._source.password;

      }).catch((e) => {
        console.log(e.response)
      })
  },
  methods: {
    goto_home() {
      this.$router.replace('/#mypage')
    },
    change_pwd() {
      if(this.pwd == this.pwd_trial){
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
                'password': this.pwd,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>