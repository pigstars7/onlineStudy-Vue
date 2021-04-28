<!-- 添加学生 -->
<template>
  <section class="add">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="form.studentId"></el-input>
      </el-form-item>
      <!-- <el-form-item label="班级">
        <el-input v-model="form.classId"></el-input>
      </el-form-item> -->
       <el-form-item label="班级">
            <el-select
              v-model="form.stuClass"
              placeholder="班级"
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
      <el-form-item label="初始密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">立即创建</el-button>
        <el-button type="text" @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      id: null,
      form: { //表单数据初始化
        name: null,
        studentId: null,
        classId: null,
        password: null,
        teacherId: null,
      }
    };
  },
  methods: {
    onSubmit() { //数据提交
    let teacherId = this.$cookies.get("did")
    this.form.teacherId = teacherId
      this.$axios({
        url: '/api/onlinestudy/student/insertStudent',
        method: 'put',
        data: {
          ...this.form
        }
      }).then(res => {
        if(res.data.code == 0) {
          this.$message({
            message: '数据添加成功',
            type: 'success'
          })
          this.$router.push({path: '/studentManage'})
        }
      })
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
    cancel() { //取消按钮
      this.form = {}
    },
    
  }
};
</script>
<style lang="scss" scoped>
.add {
  padding: 0px 40px;
  width: 400px;
}
</style>

