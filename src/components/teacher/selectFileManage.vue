//查询所有资料
<template>
  <div class="exam">
    <div class="title">
      <span class="link-left"></span>
      <span>私有资料</span>
    </div>
    <el-divider class="divider"></el-divider>
    <el-table :data="pagination.records" border>
      <el-table-column
        fixed="left"
        prop="fileName"
        label="资料名称"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="stuClass"
        label="所属班级"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="owner"
        label="资料所有者"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="fileAddress"
        label="文件地址"
        width="880"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row.fileId)" type="primary" size="small"
            >编辑</el-button
          >
          <el-button
            @click="deleteRecord(scope.row.fileId)"
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
    <el-divider class="divider"></el-divider>
    <div class="title">
      <span class="link-left"></span>
      <span>公共资料</span>
    </div>
    <el-divider class="divider"></el-divider>
    <el-table :data="pagination1.records" border>
      <el-table-column
        fixed="left"
        prop="fileName"
        label="资料名称"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="owner"
        label="资料所有者"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="fileAddress"
        label="文件地址"
        width="1000"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="edit1(scope.row.fileId)" type="primary" size="small"
            >编辑</el-button
          >
          <el-button
            @click="deleteRecord1(scope.row.fileId)"
            type="danger"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange1"
      @current-change="handleCurrentChange1"
      :current-page="pagination1.current"
      :page-sizes="[4, 8, 10, 20]"
      :page-size="pagination1.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination1.total"
      class="page"
    >
    </el-pagination>
    <!-- 编辑对话框-->
    <el-dialog
      title="编辑文件信息"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <section class="update">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="资料名称">
            <el-input v-model="form.fileName"></el-input>
          </el-form-item>
          <el-form-item label="所属班级">
            <el-select
              v-model="form.stuClass"
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
              <el-option label="无班级" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资料权限">
            <el-select
              v-model="form.isPublic"
              placeholder="是否公共资料"
              @change="changePublic(form.isPublic)"
            >
              <el-option label="公共" value="1"></el-option>
              <el-option label="私有" value="0"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="课程难度">
            <el-input v-model="form.gradle"></el-input>
          </el-form-item> -->
          <el-form-item label="文件上传">
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
                element-loading-text="文件上传中,请等待"
                >上传到服务器</el-button
              >
            </el-upload>
          </el-form-item>
          <!-- <div slot="tip" class="el-upload__tip">建议上传mp4格式</div> -->
        </el-form>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
<!-- 编辑对话框2-->
    <el-dialog
      title="编辑文件信息"
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose"
    >
      <section class="update">
        <el-form ref="form1" :model="form1" label-width="80px">
          <el-form-item label="资料名称">
            <el-input v-model="form1.fileName"></el-input>
          </el-form-item>
          <el-form-item label="所属班级">
            <el-select
              v-model="form1.stuClass"
              placeholder="所属班级"
              @focus="getClassName()"
              @change="changeClass1(form1.classId)"
            >
              <el-option
                v-for="item in data"
                :key="item.id"
                :value="item.id"
                :label="item.stuClass"
              ></el-option>
              <el-option label="无班级" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资料权限">
            <el-select
              v-model="form1.isPublic"
              placeholder="是否公共资料"
              @change="changePublic(form.isPublic)"
            >
              <el-option label="公共" value="1"></el-option>
              <el-option label="私有" value="0"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="课程难度">
            <el-input v-model="form.gradle"></el-input>
          </el-form-item> -->
          <el-form-item label="文件上传">
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
              :auto-upload="false"
              :on-error="errMS"
              :on-success="successMS1"
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
                element-loading-text="文件上传中,请等待"
                >上传到服务器</el-button
              >
            </el-upload>
          </el-form-item>
          <!-- <div slot="tip" class="el-upload__tip">建议上传mp4格式</div> -->
        </el-form>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="submit1()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}, //保存点击以后当前资料的信息
      form1:{},
      pagination: {
        //分页后的课程信息
        current: 1, //当前页
        total: null, //记录条数
        size: 4, //每页条数
      },
      pagination1: {
        //分页后的课程信息
        current: 1, //当前页
        total: null, //记录条数
        size: 4, //每页条数
      },
      dialogVisible: false,
      dialogVisible1: false,
      fileList: [], //上传的文件列表
      loading: false,
      data: null,
      id: null,
    };
  },
  created() {
    this.getPublicFileInfo();
    this.getPrivateFileInfo();
  },
  methods: {
    edit(fileId) {
      console.log(fileId);
      //编辑课程
      this.dialogVisible = true;
      this.$axios(`/api/file/getOneFile/${fileId}`).then((res) => {
        //根据课程id请求后台
        if (res.data.code == 0) {
          this.form = res.data.data.fileMS;
          console.log(this.form);
        }
      });
    },
    edit1(fileId) {
      console.log(fileId);
      //编辑课程
      this.dialogVisible1 = true;
      this.$axios(`/api/file/getOnePublicFile/${fileId}`).then((res) => {
        //根据课程id请求后台
        if (res.data.code == 0) {
          this.form1 = res.data.data.fileMS;
          console.log(this.form1);
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
      forms.append("file", fileObj);
      this.$axios
        .post("http://49.235.85.77:8080/file/upload", forms)
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
        url: "/api/file/updateFileMS",
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
        this.getPublicFileInfo();
        this.getPrivateFileInfo();
      });
    },
    submit1() {
      //提交修改后的课程信息
      this.dialogVisible1 = false;
      this.$axios({
        url: "/api/file/updateFileMS",
        method: "put",
        data: {
          ...this.form1,
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
        this.getPublicFileInfo();
        this.getPrivateFileInfo();
      });
    },
    deleteRecord(fileId) {
      console.log(fileId);
      this.$confirm("确定删除该记录吗,该操作不可逆！！！", "删除提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "算了,留着",
        type: "danger",
      })
        .then(() => {
          //确认删除
          this.$axios({
            url: `/api/file/deleteFile/${fileId}`,
            method: "delete",
          }).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                showClose: true,
                type: "success",
                message: res.data.message,
              });
              this.getPrivateFileInfo();
              this.getPublicFileInfo();
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
      deleteRecord1(fileId) {
      console.log(fileId);
      this.$confirm("确定删除该记录吗,该操作不可逆！！！", "删除提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "算了,留着",
        type: "danger",
      })
        .then(() => {
          //确认删除
          this.$axios({
            url: `/api/file/deleteFile/${fileId}`,
            method: "delete",
          }).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                showClose: true,
                type: "success",
                message: res.data.message,
              });
              this.getPrivateFileInfo();
              this.getPublicFileInfo();
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
    getPrivateFileInfo() {
      this.$axios(
        `/api/file/getPrivateFiles/${this.pagination.current}/${this.pagination.size}`
      )
        .then((res) => {
          this.pagination = res.data.data.allFiles;
          this.loading = false;
          console.log(this.pagination);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPublicFileInfo() {
      this.$axios(
        `/api/file/getPublicFiles/${this.pagination1.current}/${this.pagination1.size}`
      )
        .then((res) => {
          this.pagination1 = res.data.data.allPublicFiles;
          this.loading = false;
          console.log(this.pagination1);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getPrivateFileInfo();
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getPrivateFileInfo();
    },
    //改变当前记录条数
    handleSizeChange1(val) {
      this.pagination1.size = val;

      this.getPublicFileInfo();
    },
    //改变当前页码，重新发送请求
    handleCurrentChange1(val) {
      this.pagination1.current = val;

      this.getPublicFileInfo();
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
        this.form.fileAddress = response.data.data.filePath;
        this.$message.success("上传成功，文件地址已保存！");
      } else {
        this.$message.error(response.data.message); //文件上传错误提示
      }
    },
     successMS1(response, file, fileList) {
      if (response.data.code == 0) {
        // file.response=response.data.data;
        // this.fileList.push(file)
        this.loading = false;
        this.form1.fileAddress = response.data.data.filePath;
        this.$message.success("上传成功，文件地址已保存！");
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
     changeClass1(classId) {
      this.form1.classId = classId;
      console.log(this.form1.classId);
    },
    changePublic(isPublic) {
      console.log("资料权限" + isPublic);
      this.form.isPublic = isPublic;
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
.link-left {
  border-left: solid rgb(64, 158, 255) 10px;
  margin-left: -20px;
  margin-right: 10px;
}
</style>
