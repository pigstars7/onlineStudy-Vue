// 教师管理页面
<template>
  <div class="all">
    <el-table :data="pagination.records" border>
      <el-table-column fixed="left" prop="teacherName" label="老师姓名" width="300"></el-table-column>
      <el-table-column prop="stuClass" label="所教班级" width="300"></el-table-column>
      <el-table-column prop="teacherId" label="教师ID" width="300"></el-table-column>
      <el-table-column fixed="right" label="操作" width="450">
        <template slot-scope="scope">
          <el-button @click="checkGrade(scope.row.teacherId)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteById(scope.row.teacherId)" type="danger" size="small">删除</el-button>
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
    <!-- 编辑对话框-->
    <el-dialog
      title="编辑教师信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <section class="update">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="form.teacherName"></el-input>
          </el-form-item>
             <el-form-item label="所教班级">
            <el-select
              v-model="form.stuClass"
              placeholder="所教班级"
              @focus="getClassName()"
              @change="changeClass(form.stuClass)"
            >
              <el-option
                v-for="item in data"
                :key="item.id"
                :value="item.id"
                :label="item.stuClass"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data:null,
      id:null,
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
    this.getTeacherInfo();
  },
  methods: {
    getTeacherInfo() {
      //分页查询所有实验信息
      this.$axios(`/api/teacher/${this.pagination.current}/${this.pagination.size}`).then(res => {
        this.pagination = res.data.data.allTeachers;
      }).catch(error => {});
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getTeacherInfo();
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getTeacherInfo();
    },
    checkGrade(teacherId) { //修改教师信息
      this.dialogVisible = true
      this.$axios(`/api/teacher/getOne/${teacherId}`).then(res => {
        this.form = res.data.data.Teach
      })
    },
    deleteById(teacherId) { //删除当前
      this.$confirm("确定删除当前教师吗？删除后无法恢复","Warning",{
        confirmButtonText: '确定删除',
        cancelButtonText: '算了,留着吧',
        type: 'danger'
      }).then(()=> { //确认删除
        this.$axios({
          url: `/api/teacher/deleteTeacher/${teacherId}`,
          method: 'delete',
        }).then(res => {
          this.getTeacherInfo()
        })
      }).catch(() => {

      })
    },
    submit() { //提交更改
      this.dialogVisible = false
      this.$axios({
        url: '/api/teacher/updateTeacherMS',
        method: 'put',
        data: {
          ...this.form
        }
      }).then(res => {
        console.log(res)
        if(res.data.code ==0) {
          this.$message({
            message: '教师信息更新成功',
            type: 'success'
          })
          this.getTeacherInfo()
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      })
    },
    handleClose(done) { //关闭提醒
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        }).catch(_ => {});
    },
    getClassName() {
      this.$axios(`/api/stuclass/getClassName`).then((res) => {
        if (res.data.code == 0) {
          this.data = res.data.data.className;
        }
      });
    },
     changeClass(classId) {
      this.form.classId = classId;
      console.log(this.form.classId);
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
