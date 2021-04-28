<template>
  <div class="table">
    <!-- <p class="title">我的分数</p> -->
    <section class="content-el">
      <div class="title">
        <span class="link-left"></span>
        <span>本班资料</span>
        <!-- <span>/  {{examData.source}}</span> -->
      </div>
      <ul v-loading="loading">
        <li 
        class="minit"
        v-for="(item, index) in dataRecord"
        :key="index"
        >
            <a :href="item.fileAddress"><p class="ptext">{{item.fileName}}</p></a>
        </li>
      </ul>
      <el-divider class="divider"></el-divider>
      <div class="title">
        <span class="link-left"></span>
        <span>公共资料</span>
        <!-- <span>/  {{examData.source}}</span> -->
      </div>
      <ul v-loading="loading">
        <li 
        class="minit"
        v-for="(item, index) in publicRecord"
        :key="index"
        >
            <a :href="item.fileAddress"><p class="ptext">{{item.fileName}}</p></a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false, //加载标识符
      filter: null, //过滤参数
      dataRecord:null,
      publicRecord:null
    };
  },
  created() {
    this.getFile();
    this.getPublicFile();
    this.loading = true; //数据加载则遮罩表格
  },
  methods: {
    getFile() {
      let classId = this.$cookies.get("cid");
      console.log("the classId is" + classId)
      this.$axios(
        `/api/file/${classId}`
      ).then((res) => {
        if (res.data.code == 0) {
          this.loading = false; //数据加载完成去掉遮罩
          this.dataRecord = res.data.data.allFiles;
        }
      });
    },
    getPublicFile() {
      this.$axios(
        `/api/file/publicFile`
      ).then((res) => {
        if (res.data.code == 0) {
          this.loading = false;
          this.publicRecord = res.data.data.allFiles;
        }
      }

      )
    }
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  padding-top: 20px;
}
.table {
  width: 980px;
  margin: 0 auto;
  .title {
    margin: 20px;
  }
  .content-el {
    background-color: #fff;
    padding: 20px;
  }
}
.link-left {
  border-left: solid rgb(64, 158, 255) 10px;
  margin-left: -20px;
  margin-right: 10px;
}
.minit {
   border-radius: 30px;
   border-style:solid;
   border-width:1px;
   border-color:rgb(64, 158, 255);
   margin: 10px;
}
.minit:hover {
   box-shadow: 0 2px 12px 0 rgb(64, 158, 255);
   border-radius: 30px
}
.ptext {
  text-align: center;
  font-size: 20px;
}
</style>
