<!-- 添加课程 -->
<template>
  <section class="add">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="课程名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="form.synopsis"></el-input>
      </el-form-item>
      <el-form-item label="所属班级">
        <el-select
          v-model="form.classId"
          placeholder="所属班级"
          @focus="getClassName()"
          @change="changeClass(form.classId)"
        >
          <el-option
            v-for="item in data"
            :key="item.id"
            :value="item.id"
            :label="item.stuClass"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程难度">
        <el-select
          v-model="form.gradle"
          placeholder="课程难度"
          @change="changeGradle(form.gradle)"
        >
          <el-option label="简单" value="简单"></el-option>
          <el-option label="中等" value="中等"></el-option>
          <el-option label="高级" value="高级"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="推荐时间">
        <el-input v-model="form.time" style="width: 100px;" placeholder="min"></el-input>
      </el-form-item>
      <el-form-item label="视频上传">
        <el-upload
          class="upload-demo"
          action=""
          ref="upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :http-request="uploadSectionFile"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :data="{ courseId: form.id }"
          :auto-upload="false"
          :on-error="errMS"
          :on-success="successMS"
          :file-list="fileList"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            v-loading.lock="loading"
            element-loading-text="视频上传中,请等待"
            >上传到服务器</el-button
          >
        </el-upload>
      </el-form-item>
      <el-form-item label="实验地址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="课程详细介绍">
        <el-input type="textarea" v-model="form.details" maxlength="6000" show-word-limit></el-input>
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
      fileList: [], //上传的文件列表
      loading: false,
      form: {
        //表单数据初始化
        name: null,
        synopsis: null,
        gradle: null,
        time: null,
        video: null,
        address: null,
        details: null,
        classId: null,
        teacherId: null,
        owner: null,
      },
    };
  },
  methods: {
    onSubmit() {
      let classId = this.$cookies.get("cid");
      this.form.classId = classId;
      let owner = this.$cookies.get("cname");
      this.form.owner = owner;
      let teachId = this.$cookies.get("did");
      this.form.teacherId = teachId;
        this.$axios({
          url: "/api/courses/addNewCourse",
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
            this.$router.push({ path: "/selectCourse" });
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //上传失败
    errMS(err, file, fileList) {
      this.$message.error("上传失败！");
    },
    //上传成功
    successMS(response, file, fileList) {
      if (response.data.code == 0) {
        // file.response=response.data.data;
        // this.fileList.push(file)
        this.loading = false;
        this.form.video = response.data.data.videoPath;
        this.$message.success("上传成功，视频地址已返回！");

      } else {
        this.$message.error(response.data.message); //文件上传错误提示
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    getClassName() {
      // let res = this.axios.get(`/api/stuclass/getClassName`);
      // if (res.code === 0) {
      //    this.data = res.data;  // 把获取到的数据赋给this.data
      // }
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
    changeGradle(gradle) {
      console.log("课程难度" + gradle);
      this.form.gradle = gradle;
    },
    submitUpload() {
      this.$refs.upload.submit();
      this.loading = true;
    },
    //自定义上传
    uploadSectionFile(param) {
      var fileObj = param.file;
      var forms = new FormData();
      // 文件对象
      forms.append("video", fileObj);
      forms.append("courseId", this.form.id);
      this.$axios
        .post("http://49.235.85.77:8080/courses/newVideoUp", forms)
        .then((res) => {
          param.onSuccess(res);
        })
        .catch(({ err }) => {
          param.onError(err);
        });
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

