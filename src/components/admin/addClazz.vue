<!-- 添加教师 -->
<template>
  <section class="add">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="班级名称">
            <el-input v-model="form.stuClass"></el-input>
          </el-form-item>
          <el-form-item label="班级ID">
            <el-input v-model="form.id"></el-input>
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
      form: { //表单数据初始化
        stuClass: null,
        id: null,    
      }
    };
  },
  methods: {
    onSubmit() { //数据提交
      this.$axios({
        url: '/api/stuclass/insertClazz',
        method: 'put',
        data: {
          ...this.form
        }
      }).then(res => {
        if(res.data.code == 0) {
          this.$message({
            message: '班级添加成功',
            type: 'success'
          })
          this.$router.push({path: '/clazzManage'})
        } else {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
        }
      })
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

