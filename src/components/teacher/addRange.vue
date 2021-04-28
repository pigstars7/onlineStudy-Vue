<!-- 添加实验 -->
<template>
  <section class="add">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="实验名称">
        <el-input v-model="form.rangeName"></el-input>
      </el-form-item>
      <el-form-item label="实验地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="实验详细介绍">
        <el-input type="textarea" v-model="form.details" maxlength="500" show-word-limit></el-input>
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
      loading: false,
      form: {
        //表单数据初始化
        rangeName: null,
        address: null,
        details: null,
        owner: null,
      },
    };
  },
  methods: {
    onSubmit() {
      let owner = this.$cookies.get("cname");
      this.form.owner = owner;
        this.$axios({
          url: "/api/range/insertRange",
          method: "put",
          data: {
            ...this.form,
          },
        }).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: "数据添加成功",
              type: "success",
            });
            this.$router.push({ path: "/selectRange" });
          } else {
            this.$message({
              message: res.data.message,
              type: "error",
            });
          }
        });
    },
    cancel() {
      //取消按钮
      this.form = {};
    },
  },
};
</script>
<style lang="scss" scoped>
.add {
  padding: 0px 40px;
  width: 800px;
}
</style>

