<template>
  <div class="table">
    <!-- 列表面版 -->
    <div class="container">
      <!-- 页面标题 -->
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            ><i class="el-src-date"></i> Banner管理</el-breadcrumb-item
          >
          <el-breadcrumb-item>Banner列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 数据操作 -->
      <div class="handle-box">
        <el-form
          ref="form"
          :inline="true"
          :model="form"
          label-position="left"
          label-width="100px"
        >
          <el-form-item label="Banner名称">
            <el-input v-model="query.title" placeholder="Banner名称"></el-input>
          </el-form-item>
          <!-- <el-form-item label="Banner性别">
                <el-select v-model="select_cate" placeholder="Banner性别">
                    <el-option key="1" label="男" value="男"></el-option>
                    <el-option key="2" label="女" value="女"></el-option>
                </el-select>
            </el-form-item> -->
          <el-form-item label="">
            <el-button @click="reset">重置</el-button>
            <el-button type="success" @click="getList()">搜索</el-button>
          </el-form-item>
        </el-form>
        <el-row>
          <el-button type="primary" @click="handleAdd">新增</el-button>
          <el-button type="danger" @click="delAll">删除</el-button>
        </el-row>
      </div>

      <!-- 数据列表 -->
      <el-table
        :data="list"
        stripe
        border
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="bid" label="BannerID" width="80"> </el-table-column>
        <el-table-column prop="title" label="Banner名称"> </el-table-column>
        <el-table-column label="Banner预览" width="300" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 250px; height: 150px; border-radius: 2px"
              :src="$apiHost + scope.row.src"
              :preview-src-list="[$apiHost + scope.row.src]"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="link" label="跳转链接"> </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          sortable
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          sortable
          width="150"
        >
        </el-table-column>
        <el-table-column label="操作" width="180" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页处理 -->
      <div class="pagination" v-if="query.total">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="total,prev, pager, next"
          :total="query.total"
          :page-size="query.size"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog
      :title="form.bid ? '编辑' : '新增'"
      :visible.sync="editVisible"
      width="800px"
    >
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="Banner名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="Banner预览">
          <el-upload
            class="avatar-uploader"
            :action="$apiHost + '/common/upload'"
            name="banner"
            :show-file-list="false"
            :on-success="handlesrcSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.src" :src="$apiHost + form.src" class="avatar" />
            <i v-else class="el-src-plus avatar-uploader-src"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="跳转链接">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除提示框 -->
    <el-dialog title="温馨提示" :visible.sync="delVisible" width="450px" center>
      <div>当前操作不可恢复，是否确定继续操作？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const hi = "hha";
export default {
  name: "banner",
  data() {
    return {
      query: {
        total: 0,
        page: 1,
        size: 5,
        title: "",
      },

      form: {
        bid: "",
      },

      list: [],

      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      editVisible: false,
      delVisible: false,
    };
  },
  created() {
    this.getList();
  },

  methods: {
    // 获取Banner列表
    getList(page) {
      var that = this;
      this.$axios
        .get(this.$api.banner_list, {
          headers: {
            token: "",
          },
          params: {
            page: page || 1,
            size: this.query.size,
            title: this.query.title,
          },
        })
        .then((res) => {
          if (res.code == 200) {
            this.list = res.data.map(function (e) {
              e.createTime = e.createTime
                ? that.$moment(e.createTime).format("YYYY-MM-DD HH:mm:ss")
                : "-";
              e.updateTime = e.updateTime
                ? that.$moment(e.updateTime).format("YYYY-MM-DD HH:mm:ss")
                : "-";
              return e;
            });

            this.query.total = 0;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((req) => {
          console.log(req);
        });
    },
    // 分页获取数据
    handleCurrentChange(page) {
      this.query.page = page;
      this.getList(page);
    },

    // 重置
    reset() {
      this.query = {
        total: 0,
        page: 1,
        size: 5,
        title: "",
      };
      this.getList();
    },

    // 单个新增
    handleAdd() {
      this.form = {
        title: "",
        src: "",
        link: "",
      };
      this.form.bid = "";
      this.editVisible = true;
    },
    // 单个编辑
    handleEdit(row) {
      var that = this;
      this.form.bid = row.bid;

      this.$axios
        .get(this.$api.banner_detail + "/" + this.form.bid)
        .then((res) => {
          if (res.code == 200) {
            that.form = res.data;
            that.form.createTime = that.form.createTime
              ? that.$moment(that.form.createTime).format("YYYY-MM-DD HH:mm:ss")
              : null;
            that.form.updateTime = that.form.updateTime
              ? that.$moment(that.form.updateTime).format("YYYY-MM-DD HH:mm:ss")
              : null;
            that.editVisible = true;
          } else {
            that.$message.error(res.msg);
          }
        })
        .catch((req) => {
          console.log(req);
        });
    },

    // 保存编辑
    saveEdit() {
      var that = this;
      if (this.form.bid) {
        this.$axios
          .put(this.$api.banner_update, that.form)
          .then((res) => {
            if (res.code == 200) {
              that.$message.success(res.msg);
            } else {
              that.$message.error(res.msg);
            }
            that.editVisible = false;
            that.getList();
          })
          .catch((req) => {
            console.log(req);
          });
      } else {
        this.$axios
          .post(this.$api.banner_create, that.form)
          .then((res) => {
            if (res.code == 200) {
              that.$message.success(res.msg);
            } else {
              that.$message.error(res.msg);
            }
            that.editVisible = false;
            that.getList();
          })
          .catch((req) => {
            console.log(req);
          });
      }
    },

    // 单个删除
    handleDelete(row) {
      this.form.bid = row.bid;
      this.delVisible = true;
    },
    // 确定删除
    deleteRow() {
      var that = this;
      this.$axios
        .delete(this.$api.banner_delete + "/" + this.form.bid)
        .then((res) => {
          if (res.code == 200) {
            that.$message.success("删除成功");
          } else {
            that.$message.error(res.msg);
          }
          that.delVisible = false;
          that.getList();
        })
        .catch((req) => {
          console.log(req);
        });
    },

    // 批量删除
    delAll() {
      const length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error("删除了" + str);
      this.multipleSelection = [];
    },

    // 全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 图片上传限制
    beforeAvatarUpload(file) {
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt20M;
    },
    // 图片上传结果
    handlesrcSuccess(res, file) {
      this.form.src = file.response.data.fileUrl;
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 250px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.el-upload--text {
  font-size: 28px;
  color: #8c939d;
  width: 250px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 250px;
  height: 150px;
  display: block;
}
</style>
