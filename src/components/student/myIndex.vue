// 学生个人首页
<template>
  <div id="myExam">
    <el-row> </el-row>
    <el-row :gutter="20">
      <div class="cardhello">
        <ul style="font-family: YouYuan; font-size: 30px; font-weight: bold">
          你好，{{
            user.userName
          }}同学！
        </ul>
        <el-divider content-position="left"></el-divider>
        <div class="messstuId">学号：</div>
        <div class="mess">
          {{ user.userId }}
        </div>
        <div class="messtittle">班级：</div>
        <div class="mess">
          {{ user.className }}
        </div>
        <div class="messtittle">老师：</div>
        <div class="mess">{{ user.teacherName }}</div>
      </div>
    </el-row>
    <el-row :gutter="20">
      <div>
        <div class="wrapper">
          <ul class="top">
            <li class="order">课程列表</li>
            <li class="search-li">
              <div class="icon">
                <input
                  type="text"
                  placeholder="课程名称"
                  class="search"
                  v-model="key"
                /><i class="el-icon-search"></i>
              </div>
            </li>
            <li>
              <el-button type="primary" @click="search()">搜索课程</el-button>
            </li>
          </ul>
          <ul class="paper" v-loading="loading">
            <li
              class="item"
              v-for="(item, index) in pagination.records"
              :key="index"
            >
              <h4 @click="toCourseMsg(item.id)">{{ item.name }}</h4>
              <p class="name">创建者-{{ item.owner }}</p>
              <div class="info">
                <!-- <i class="el-icon-loading"></i><span>{{item.examDate.substr(0,10)}}</span> -->
                <i class="iconfont icon-icon-time"></i
                ><span v-if="item.time != null"
                  >推荐时长 {{ item.time }}分钟</span
                >
                <i class="iconfont icon-fenshu"></i
                ><span>难度等级：{{ item.gradle }}</span>
              </div>
            </li>
          </ul>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.current"
              :page-sizes="[6, 10, 20, 40]"
              :page-size="pagination.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  // name: 'myExam'
  data() {
    return {
      loading: false,
      key: null, //搜索关键字
      allCourses: null, //所有信息
      pagination: {
        //分页后的信息
        current: 1, //当前页
        total: null, //记录条数
        size: 6, //每页条数
      },
      user: {
        userName: null,
        userId: null,
        classId: null,
        teacherId: null,
        className: null,
        teacherName: null,
      },
      ctID: {
        classId: null,
        teacherId: null,
      },
    };
  },
  created() {
    this.getUserInfo();
    this.getCourseInfo();
    this.loading = true;
  },
  methods: {
    //获取个人信息
    getUserInfo() {
      //获取用户信息
      let userName = this.$cookies.get("cname");
      let userId = this.$cookies.get("sid");
      let classId = this.$cookies.get("cid");
      let teacherId = this.$cookies.get("tid");
      this.user.userName = userName;
      this.user.userId = userId;
      this.user.classId = classId;
      this.ctID.classId = classId;
      this.ctID.teacherId = teacherId;
      this.$axios({
        url: `/api/onlinestudy/student/message`,
        method: "post",
        data: {
          ...this.ctID,
        },
      }).then((res) => {
        this.user.className = res.data.data.stuMessage.className;
        this.user.teacherName = res.data.data.stuMessage.teacherName;
      });
    },
    //获取当前所有课程信息
    getCourseInfo() {
      this.$axios(
        `/api/courses/allCourses/${this.user.classId}/${this.pagination.current}/${this.pagination.size}`
      )
        .then((res) => {
          this.pagination = res.data.data.allCourses;
          this.loading = false;
          console.log(this.pagination);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getCourseInfo();
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getCourseInfo();
    },
    //搜索课程
    search() {
      this.$axios(`/api/courses/${this.user.classId}`).then((res) => {
        if (res.data.code == 0) {
          let allCourses = res.data.data.allCourses;
          let newPage = allCourses.filter((item) => {
            console.log(item.name);
            return item.name.includes(this.key);
          });
          this.pagination.records = newPage;
        }
      });
    },
    //跳转到实验详情页
    toCourseMsg(courseId) {
      this.$router.push({ path: "/CourseMsg", query: { courseId: courseId } });
      console.log(courseId);
    },
    handleClick(row) {
      console.log(row);
    },
  },
};
</script>

<style lang="scss" scoped>
div.card {
  width: 470px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); //设置两层阴影
  text-align: center;
}

div.cardhello {
  width: 1000px;
  // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);//设置两层阴影
  text-align: left;
}

div.header {
  background-color: rgba(255, 255, 255, 0.678);
  color: black;
  padding: 10px;
  // font-size: 30px;
  width: 450px;
}

div.cardclass {
  margin-top: 20px;
  background-color: white;
  color: black;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); //设置两层阴影
  width: 470px;
}

div.container {
  padding: 10px;
}

div.font {
  font-size: 20px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.pagination {
  padding: 20px 0px 30px 0px;
  .el-pagination {
    display: flex;
    justify-content: center;
  }
}
.paper {
  h4 {
    cursor: pointer;
  }
}
.paper .item a {
  color: #000;
}
.wrapper .top .order {
  cursor: pointer;
}
.wrapper .top .order:hover {
  color: #0195ff;
  border-bottom: 2px solid #0195ff;
}
.wrapper .top .order:visited {
  color: #0195ff;
  border-bottom: 2px solid #0195ff;
}
.item .info i {
  margin-right: 5px;
  color: #0195ff;
}
.item .info span {
  margin-right: 14px;
}
.paper .item {
  width: 380px;
  border-radius: 4px;
  padding: 20px 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 4px 2px rgba(217, 222, 234, 0.3);
  transition: all 0.6s ease;
}
.paper .item:hover {
  box-shadow: 0 0 4px 2px rgba(140, 193, 248, 0.45);
  transform: scale(1.03);
}
.paper .item .info {
  font-size: 14px;
  color: #88949b;
}
.paper .item .name {
  font-size: 14px;
  color: #88949b;
}
.paper * {
  margin: 20px 0;
}
.wrapper .paper {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.top .el-icon-search {
  position: absolute;
  right: 10px;
  top: 10px;
}
.top .icon {
  position: relative;
}
.wrapper .top {
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}
#myExam .search-li {
  margin-left: auto;
}
.top .search-li {
  margin-left: auto;
}
.top li {
  display: flex;
  align-items: center;
}
.top .search {
  margin-left: auto;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #eee;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.top .search:hover {
  color: #0195ff;
  border-color: #0195ff;
}
.wrapper .top {
  display: flex;
}
.wrapper .top li {
  margin: 20px;
}
#myExam {
  width: 1115px;
  margin: 0 auto;
}
#myExam .title {
  margin: 20px;
}
#myExam .wrapper {
  background-color: #fff;
}
.mess {
  font-size: 18px;
  text-align: left;
  font-family: Microsoft YaHei;
  white-space: nowrap;
  display: inline;
}
.messtittle {
  font-size: 18px;
  text-align: left;
  font-family: Microsoft YaHei;
  white-space: nowrap;
  font-weight: bold;
  display: inline;
  margin-left: 15px;
}
.messstuId {
  font-size: 18px;
  text-align: left;
  font-family: Microsoft YaHei;
  white-space: nowrap;
  font-weight: bold;
  display: inline;
}
.message {
  text-align: left;
}
</style>
