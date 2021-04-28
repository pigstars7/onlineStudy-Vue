//查询所有课程
<template>
  <div class="exam">
    <el-table :data="pagination.records" border>
      <el-table-column
        fixed="left"
        prop="name"
        label="课程名称"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="synopsis"
        label="简介"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="stuClass"
        label="所属班级"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="gradle"
        label="课程难度"
        width="200"
      ></el-table-column>
      <!-- <el-table-column
        prop="details"
        label="创建老师"
        width="100"
      ></el-table-column> -->
      <el-table-column
        prop="time"
        label="推荐时间(min)"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="video"
        label="视频地址"
        width="240"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="实验地址"
        width="240"
      ></el-table-column>
      <!-- <el-table-column prop="type" label="实验类型" width="120"></el-table-column>
      <el-table-column prop="tips" label="考生提示" width="400"></el-table-column> -->
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row.id)" type="primary" size="small"
            >编辑</el-button
          >
          <el-button
            @click="deleteRecord(scope.row.id)"
            type="danger"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.current"
      :page-sizes="[4, 8, 10, 20]"
      :page-size="pagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      class="page"
    >
    </el-pagination>
    <!-- 编辑对话框-->
    <el-dialog
      title="编辑课程信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <section class="update">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="课程名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="form.synopsis"></el-input>
          </el-form-item>
          <!-- <el-form-item label="所属班级">
            <el-input v-model="form.stuClass"></el-input>
          </el-form-item> -->
          <el-form-item label="所属班级">
            <el-select
              v-model="form.stuClass"
              placeholder="所属班级"
              @focus="getClassName()"
              @change="changeClass(form.stuClass)"
            >
              <el-option
                v-for="item in data"
                :key="item.id"
                :value="item.stuClass"
                :label="item.stuClass"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="课程难度">
            <el-input v-model="form.gradle"></el-input>
          </el-form-item> -->
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
          <!-- <el-form-item label="创建老师">
            <el-input v-model="form.grade"></el-input>
          </el-form-item> -->
          <el-form-item label="推荐时间">
            <el-input v-model="form.time"></el-input>
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

          <!-- <div slot="tip" class="el-upload__tip">建议上传mp4格式</div> -->

          <el-form-item label="实验地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="课程详细介绍">
            <el-input type="textarea" v-model="form.details"></el-input>
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
      form: {}, //保存点击以后当前实验的信息
      pagination: {
        //分页后的课程信息
        current: 1, //当前页
        total: null, //记录条数
        size: 4, //每页条数
      },
      dialogVisible: false,
      fileList: [], //上传的文件列表
      loading: false,
      data: null,
      id: null,
    };
  },
  created() {
    this.getCourseInfo();
  },
  methods: {
    edit(courseId) {
      console.log(courseId);
      //编辑课程
      this.dialogVisible = true;
      this.$axios(`/api/courses/CourseVO/${courseId}`).then((res) => {
        //根据课程id请求后台
        if (res.data.code == 0) {
          this.form = res.data.data.courseVo;
          console.log(this.form);
        }
      });
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
        .post("http://49.235.85.77:8080/courses/videoUp", forms)
        .then((res) => {
          param.onSuccess(res);
        })
        .catch(({ err }) => {
          param.onError(err);
        });
    },
    handleClose(done) {
      //关闭提醒
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    submit() {
      //提交修改后的课程信息
      this.dialogVisible = false;
      this.$axios({
        url: "/api/courses/updateCourse",
        method: "put",
        data: {
          ...this.form,
        },
      }).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            //成功修改提示
            message: "更新成功",
            type: "success",
          });
        } else {
          this.$message({
            //成功修改提示
            message: res.data.message,
            type: "error",
          });
        }
        this.getCourseInfo();
      });
    },
    deleteRecord(courseId) {
      console.log(courseId);
      this.$confirm("确定删除该记录吗,该操作不可逆！！！", "删除提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "算了,留着",
        type: "danger",
      })
        .then(() => {
          //确认删除
          this.$axios({
            url: `/api/courses/deleteCourse/${courseId}`,
            method: "delete",
          }).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                showClose: true,
                type: "success",
                message: res.data.message,
              });
              this.getCourseInfo();
            } else {
              this.$message({
                showClose: true,
                type: "error",
                message: res.data.message,
              });
            }
          });
        })
        .catch(() => {});
    },
    getCourseInfo() {
      let teacherId = this.$cookies.get("did");
      this.$axios(
        `/api/courses/coursesById/${teacherId}/${this.pagination.current}/${this.pagination.size}`
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
        this.$message.success("上传成功，视频地址已更新！");
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
    changeClass(className) {
      this.data.map((s, index) => {
        if (s.stuClass === className) {
          this.id = this.data[index].id;
          console.log(className);
          this.form.stuClass = className;
        }
      });
    },
    changeGradle(gradle) {
      console.log("课程难度" + gradle);
      this.form.gradle = gradle;
    },
  },
};
</script>
<style lang="scss" scoped>
.exam {
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
}
</style>
