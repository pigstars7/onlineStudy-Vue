// 综合实验页面
<template>
  <div id="myExam">
    <div class="title">
      <span class="link-left"></span>
      <span>综合实验场</span>
    </div>
    <el-divider class="divider"></el-divider>
    <div class="wrapper">
      <ul class="top">
        <li class="search-li">
          <div class="icon">
            <input
              type="text"
              placeholder="实验名称"
              class="search"
              v-model="key"
            /><i class="el-icon-search"></i>
          </div>
        </li>
        <li>
          <el-button type="primary" @click="search()">搜索实验</el-button>
        </li>
      </ul>
      <ul class="paper" v-loading="loading">
        <li class="item" v-for="(item,index) in pagination.records" :key="index">
          <h4 @click="toRange(item.address)">{{item.rangeName}}</h4>
          <p class="name">{{item.details}}</p>
          <!-- <div class="info">
            <i class="el-icon-loading"></i><span>12</span>
            <i class="iconfont icon-icon-time"></i><span v-if="item.totalTime != null">限时{{item.totalTime}}分钟</span>
            <i class="iconfont icon-fenshu"></i><span>满分{{item.totalScore}}分</span>
          </div> -->
        </li>
      </ul>
        <!-- <el-col
          v-loading="loading"
          :span="7"
          v-for="(item, index) in pagination.records"
          :key="index"
          :offset="3"
          class="paper"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.pic" class="image" @click="toRange(item.id)" />
            <div class="cardtirm">
              <div class="tittle">
                <p @click="toRange(item.address)">{{ item.rangeName }}</p>
              </div>
              <div class="button">
                <el-button
                  type="primary"
                  size="mini"
                  @click="getRange(item.details)"
                  >了解详情</el-button
                >
              </div>
            </div>
            <el-dialog
              title="详细介绍"
              :visible.sync="dialogVisible"
              width="30%"
            >
              <span>{{ range.details }}</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">知道了</el-button>
              </span>
            </el-dialog>
          </el-card>
        </el-col>
      </el-row> -->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.current"
          :page-sizes="[6, 8, 10, 20]"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- <el-dialog
      title="了解详情"
      :visible.sync="dialogVisible"
      width="30%">
      <span>{{item.details}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">知道了</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  // name: 'allRange'
  data() {
    return {
      src: "",
      dialogVisible: false, //对话框属性
      loading: false,
      key: null, //搜索关键字
      allRange: null, //所有信息
      pagination: {
        //分页后的信息
        current: 1, //当前页
        total: null, //记录条数
        size: 6, //每页条数
      },
      range: {
        details: "",
      },
    };
  },
  created() {
    this.getRangeInfo();
    this.loading = true;
  },
  // watch: {

  // },
  methods: {
    toRange(address) {
      window.location.href = address
    },
    getRange(details) {
      this.dialogVisible = true;
      this.range.details = details;
    },
    //获取当前所有课程信息
    getRangeInfo() {
      this.$axios(
        `/api/range/allRange/${this.pagination.current}/${this.pagination.size}`
      )
        .then((res) => {
          this.pagination = res.data.data.allRange;
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
      this.getRangeInfo();
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getRangeInfo();
    },
    //搜索靶场
    search() {
      this.$axios("/api/range/all").then((res) => {
        if (res.data.code == 0) {
          let allRange = res.data.data.allRange;
          let newPage = allRange.filter((item) => {
            return item.rangeName.includes(this.key);
          });
          this.pagination.records = newPage;
        }
      });
    },
  },
};
</script>


<style lang="scss" scoped>
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
  width: 980px;
  margin: 0 auto;
}
#myExam .title {
  margin: 20px;
}
#myExam .wrapper {
  background-color: #fff;
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
  border-radius: 4px;
  padding: 20px 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 4px 2px rgba(217, 222, 234, 0.3);
  transition: all 0.6s ease;
}
.paper .item:hover {
  box-shadow: 0 0 4px 2px rgba(140, 193, 248, 0.45);
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
  width: 200px;
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
  width: 980px;
  margin: 0 auto;
}
#myExam .title {
  margin: 20px;
}
#myExam .wrapper {
  background-color: #fff;
}
.link-left {
  border-left: solid rgb(64, 158, 255) 10px;
  margin-left: -20px;
  margin-right: 10px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 5px;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.card {
  margin: 20px;
}
.tittle {
  padding: 8px;
  float: left;
}
.cardtirm {
  height: 50px;
}
</style>
