// 教师管理页面
<template>
  <div class="all">
    <el-table :data="pagination.records" border>
      <el-table-column fixed="left" prop="stuClass" label="班级名称" width="400"></el-table-column>
      <el-table-column prop="id" label="班级ID" width="400"></el-table-column>
      <el-table-column fixed="right" label="操作" width="450">
        <template slot-scope="scope">
          <el-button @click="deleteById(scope.row.id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.current"
      :page-sizes="[6, 10]"
      :page-size="pagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      class="page">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagination: {
        //分页后的信息
        current: 1, //当前页
        total: null, //记录条数
        size: 6, //每页条数
      },
      dialogVisible: false, //对话框
      form: {}, //保存点击以后当前实验的信息
    };
  },
  created() {
    this.getClazzInfo();
  },
  methods: {
    getClazzInfo() {
      //分页查询所有实验信息
      this.$axios(`/api/stuclass/${this.pagination.current}/${this.pagination.size}`).then(res => {
        this.pagination = res.data.data.allClass;
      }).catch(error => {});
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getClazzInfo();
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getClazzInfo();
    },
    deleteById(classId) { //删除当前
      this.$confirm("确定删除当前班级吗？删除后无法恢复","Warning",{
        confirmButtonText: '确定删除',
        cancelButtonText: '算了,留着吧',
        type: 'danger'
      }).then(()=> { //确认删除
        this.$axios({
          url: `/api/stuclass/deleteClazz/${classId}`,
          method: 'delete',
        }).then(res => {
          if (res.data.code == 0 ) {
            this.$message({
            //成功修改提示
            message: "删除成功",
            type: "success",
          });
          this.getClazzInfo()
          } else {
             this.$message({
            //成功修改提示
            message: res.data.message,
            type: "error",
          });
          }
         
        })
      }).catch(() => {

      })
    },
    handleClose(done) { //关闭提醒
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        }).catch(_ => {});
    },
  }
};
</script>
<style lang="scss" scoped>
.all {
  padding: 0px 40px;
  .page {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .edit {
    margin-left: 20px;
  }
  .el-table tr {
    background-color: #dd5862 !important;
  }
}
.el-table .warning-row {
  background: #000 !important;
}

.el-table .success-row {
  background: #dd5862;
}
</style>
