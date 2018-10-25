<!-- by ShiChong main: shichong1023@163.com -->
<template>
  <div id="login">
    <transition name="form-fade" mode="in-out">
      <section class="form-wrap" v-show="showLogin">
        <div class="form-title">
          <p>欢迎登陆</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username" class="form-item-box">
            <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="form-item-box">
            <el-input type="password" placeholder="密码" v-model="loginForm.password" @keyup.enter.native="submitForm('loginForm')"></el-input>
          </el-form-item>
          <el-checkbox v-model="checkedUser">记住用户名</el-checkbox>
          <el-form-item class="form-item-box">
            <el-button type="primary" @click="submitForm('loginForm')" class="submit-btn">登陆</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
import {mixinCache} from './mixins/cache.js'
export default {
  mixins: [mixinCache],
  data () {
    return {
      showError: false,
      errorInfo: "",
      loginForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      },
      showLogin: false,
      checkedUser: false,
    }
  },

  components: {},

  computed: {},

  mounted() {
    this.showLogin = true
    let userName = this.getCookie(this.$config.proName + "_userName")
    let userPwd = this.getCookie(this.$config.proName + "_userPwd")

    if(userName && userName){
      this.loginForm.username = userName
      this.loginForm.password = userPwd
      this.checkedUser = true
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate( (valid) => {
        if (valid) {
					let username = this.allTrim(this.loginForm.username)
          let password = this.allTrim(this.loginForm.password)
          var params = {
            username: username,
            password: password,
            appid: this.$config.appId
					}

					if(username.length <= 0 || password.length <= 0){
            this.errorInfo = "请输入用户名或密码!"
            this.showError = true
            return
          }else{
            this.showError = false
          }

          this.$router.push('index')

         	var url = this.$pathUrl.login;
					// this.$api.get(url, params, (res) => {
					// 		if(1 == res.state){
					// 			this.setSession(this.$config.proName + "_username",res.nickname)
					// 			this.setSession(this.$config.proName + "_userid",res.userid)
					// 			if(res.role){
					// 				this.setSession(this.$config.proName + "_role",res.role)
					// 			}
					// 			//判断复选框是否被勾选 勾选则调用配置cookie方法
					// 			if(true == this.checkedUser){
					// 				//传入用户名，密码，和保存天数3个参数
					// 				this.setCookie(this.loginForm.username, this.loginForm.password, 7)
					// 			}else{
					// 				this.clearCookie()
					// 			}
					// 			//获得用户权限
					// 			this.getUserLimit()
					// 		}else{
					// 			this.errorInfo = "用户名或密码错误!"
          //   		this.showError = true
					// 			this.$message.error(res.message + "!");
					// 		}
					// })
        }else {
          return false;
        }
      });
    },
    //获得用户权限
    getUserLimit(){
      let params = {
        appid: this.$config.appId
      }
      let url = this.$pathUrl.limit
      this.$api.post(url, params, r => {
        let data = r.data
        let list = []
        data.button.forEach((item,i)=>{
          list.push(item.fdButtonStyle)
				})
				this.setSession(null,list)
				this.setSession(this.$config.proName + "_regionId",data.region[0].fdRegionid)
        this.$router.push('index')
      },{isForm: true});
    },
  }
}

</script>

<style lang='scss'>
  #login{
    width: 100%;
    height: 100%;
    background-color: #324057;
    position: relative;
    .form-title{
      position: absolute;
      width: 100%;
      top: -100px;
      left: 0;
      p{
        font-size: 34px;/*no*/
        color: #fff;
      }
    }
    .form-wrap{
      position: absolute;
      top: 50%;
      left: 50%;
      width: 300px;
      height: 250px;
      margin-top: -105px;
      margin-left: -150px;
      padding: 25px;
      border-radius: 5px;
      text-align: center;
      background-color: #fff;

      .form-item-box{
        width: 100%;
        height: 40px;
      }

      .el-checkbox{
        float: left;
        margin-bottom: 5px;

        .el-checkbox__inner{
          position: relative;
          top: -2px;
        }
      }


      .submit-btn{
        width: 100%;
        font-size: 16px;
      }
    }
    .form-fade-enter-active, .form-fade-leave-active {
      transition: all 1s;
    }
    .form-fade-enter, .form-fade-leave-active {
      transform: translate3d(0, -50px, 0);
      opacity: 0;
    }
  }
</style>
