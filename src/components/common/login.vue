<!-- 用户登录界面 -->
<template>
  <div id="login">
    <div class="bg"></div>
    <el-row class="main-container">
      <el-col :lg="8" :xs="16" :md="10" :span="10">
        <div class="top">
          <i class="iconfont el-icon-connection"></i><span class="title">网安在线教学平台</span>
        </div>
        <div class="bottom">
          <div class="container">
            <p class="title">账号登录</p>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="用户名">
                <el-input v-model="formLabelAlign.userId" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="formLabelAlign.password" placeholder="请输入密码" type='password'></el-input>
              </el-form-item>
               <el-form-item label="验证码">
                    <el-input type="text" maxlength="11" v-model="formLabelAlign.captchaCode" placeholder="请输入验证码" ></el-input>
                    <img class="get_verification" :src="captcha" alt="captcha" @click="getCaptcha" ref="captcha" />
                </el-form-item>
              <div class="submit">
                <el-button type="primary" class="row-login" @click="login()">登录</el-button>
              </div>
              <!-- <div class="options">
                <p class="find"><a href="javascript:;">找回密码</a></p>
                <div class="register">
                  <span>没有账号?</span>
                  <span><a href="javascript:;">去注册</a></span>
                </div>
              </div> -->
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="footer">
      <el-col>
        <a class="msg2" href="https://beian.miit.gov.cn/#/Integrated/index">陕ICP备2021003983号-1 | 版权所有 ©2021 西安邮电大学-朱星鑫</a>
      </el-col>
    </el-row>
    <!-- <section class="remind">
      <span>管理员账号：9527</span>
      <span>教师账号：20081213</span>
      <span>密码都是：123qwe</span>
    </section> -->
  </div>
</template>

<script>
import store from '@/vuex/store'
import {mapState} from 'vuex'
export default {
  store,
  name: "login",
  data() {
    return {
      role: 2,
      labelPosition: 'left',
      formLabelAlign: {
        userId: '',
        password: '',
        captchaCode: '', // 验证码用户输入值
      },
      captcha: '', // 图形验证码
    }
  },
  methods: {
    //用户登录请求后台处理
    login() {
      console.log("登录操作执行-------");
      this.$axios({
        url: `/api/onlinestudy/login`,
        method: 'post',
        data: {
          ...this.formLabelAlign
        }
      }).then(res=>{
        let resData = res.data.data.user
        console.log(resData)
        if(res.data.code == 0) {
          switch(resData.role) {
            case 0:  //管理员
              this.$cookies.set("cname", resData.adminName)
              this.$cookies.set("did", resData.adminId)
              this.$cookies.set("role", 0)
              localStorage.setItem("cname", resData.adminName)
              this.$router.push({path: '/admin' }) //跳转到首页
              break
            case 1: //教师
              console.log(resData.role)
              this.$cookies.set("cname", resData.teacherName)
              this.$cookies.set("did", resData.teacherId)
              this.$cookies.set('cid', resData.classId)
              this.$cookies.set("role", 1)
              localStorage.setItem("cname", resData.teacherName)
              this.$router.push({path: '/index' }) //跳转到教师用户
              break
            case 2: //学生
              console.log(resData.role)
              this.$cookies.set("cname", resData.studentName)
              this.$cookies.set("sid", resData.studentId)
              this.$cookies.set('cid', resData.classId)
              this.$cookies.set('tid', resData.teacherId)
              localStorage.setItem("cname", resData.studentName)
              this.$router.push({path: '/student'})
              break
          }
        }
        if(res.data.code == -1) { //错误提示
          this.$message({
            showClose: true,
            type: 'error',
            message: res.data.message
          }),
          this.getCaptcha()
        }
      })
    },
    clickTag(key) {
      this.role = key
    },
    async getCaptcha () {
      this.$axios({
        url:'/api/onlinestudy/captcha',
        methods:'get'
      }).then(result => {
        this.captcha = result.data.data.captcha
        // console.log(this.captcha)
      })
    }
  },
  computed: mapState(["userInfo"]),
  mounted() {
    this.getCaptcha()
  }
}
</script>

<style lang="scss" scoped>
.remind {
  border-radius: 4px;
  padding: 10px 20px;
  display: flex;
  position: fixed;
  right: 20px;
  bottom: 50%;
  flex-direction: column;
  color: #606266;
  background-color: #fff;
  border-left: 4px solid #409eff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
}
.get_verification {
    margin-left: 55%;
}
.container {
  margin-bottom: 32px;
}
.container .el-radio-group {
  margin: 30px 0px;
}
a:link {
  color:#ff962a;
  text-decoration:none;
}
#login {
  font-size: 14px;
  color: #000;
  background-color: #fff;
}
#login .bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  overflow-y: auto;
  height: 100%;
  background: url('../../assets/img/loginbg.jpg')center top / cover no-repeat;
  background-color: #b6bccdd1 !important;
}
#login .main-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
#login .main-container .top {
  margin-top: 100px;
  font-size: 30px;
  color: rgb(64, 158, 255);
  display: flex;
  justify-content: center;
}
#login .top .el-icon-connection {
  font-size: 80px;
}
#login .top .title {
  margin-top: 20px;
}
#login .bottom {
  display:flex;
  justify-content: center;
  background-color:#fff;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
#login .bottom .title {
  text-align: center;
  font-size: 30px;
}
.bottom .container .title {
  margin: 30px 0px;;
}
.bottom .submit .row-login {
  width: 100%;
  background-color: #04468b;
  border-color: #04468b;
  margin: 20px 0px 10px 0px;
  padding: 15px 20px;
}
.bottom .submit {
  display: flex;
  justify-content: center;
}
.footer {
  margin-top: 50px;
  text-align: center;
}
.footer .msg1 {
  font-size: 18px;
  color: #fff;
  margin-bottom: 15px;
}
.footer .msg2 {
  font-size: 14px;
  color: #e3e3e3;
  margin-top: 70px;
}
.bottom .options {
  margin-bottom: 40px;
  color: #ff962a;
  display: flex;
  justify-content: space-between;
}
.bottom .options > a {
  color: #ff962a;
}
.bottom .options .register span:nth-child(1) {
  color: #8C8C8C;
}
</style>
