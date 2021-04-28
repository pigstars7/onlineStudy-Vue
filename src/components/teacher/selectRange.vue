//查询所有课程
<template>
  <div class="table">
    <el-table :data="pagination.records" border>
      <el-table-column
        fixed="left"
        prop="id"
        label="实验id"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="rangeName"
        label="实验名称"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="owner"
        label="所属老师"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="details"
        label="简介"
        width="528"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="实验地址"
        width="400"
      ></el-table-column>
      <el-table-column  label="操作" width="150">
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
      title="编辑实验信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <section class="update">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="实验名称">
            <el-input v-model="form.rangeName"></el-input>
          </el-form-item>
          <el-form-item label="实验地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="实验介绍">
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
    this.getRangeInfo();
  },
  methods: {
    edit(rangeId) {
      console.log(rangeId);
      //编辑综合实验
      this.dialogVisible = true;
      this.$axios(`/api/range/getOneRange/${rangeId}`).then((res) => {
        //根据实验id请求后台
        if (res.data.code == 0) {
          this.form = res.data.data.range;
          console.log(this.form);
        }
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
      this.loading = true;
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
        url: "/api/range/updateRangeMS",
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
        this.getRangeInfo();
      });
    },
    deleteRecord(RangeId) {
      console.log(RangeId);
      this.$confirm("确定删除该记录吗,该操作不可逆！！！", "删除提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "算了,留着",
        type: "danger",
      })
        .then(() => {
          //确认删除
          this.$axios({
            url: `/api/range/deleteRange/${RangeId}`,
            method: "delete",
          }).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                showClose: true,
                type: "success",
                message: res.data.message,
              });
              this.getRangeInfo();
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
  },
};
</script>
<style lang="scss" scoped>
.table {
  padding: 0px 60px;
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
