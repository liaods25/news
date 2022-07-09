<template>
  <div class="user">
    <!-- 列表面版 -->
    <div class="container">
      <!-- 页面标题 -->
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            ><i class="el-icon-date"></i> 用户管理</el-breadcrumb-item
          >
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
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
          <el-form-item label="用户名称">
            <el-input v-model="query.uphone" placeholder="用户名称"></el-input>
          </el-form-item>
          <!-- <el-form-item label="用户性别">
            <el-select v-model="select_cate" placeholder="用户性别">
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
        <el-table-column prop="uid" width="60" label="用户ID">
        </el-table-column>
        <el-table-column prop="uphone" label="用户名称"> </el-table-column>
        <el-table-column prop="upaswd" label="用户密码"> </el-table-column>
        <el-table-column label="用户图像" width="200" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px; border-radius: 50px"
              :src="$apiHost + scope.row.userImg"
              :preview-src-list="[$apiHost + scope.row.userImg]"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="收钱码" width="200" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px; border-radius: 2px"
              :src="$apiHost + scope.row.codeImg"
              :preview-src-list="[$apiHost + scope.row.codeImg]"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          sortable
          width="180"
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
          :current-page="query.page"
          :page-size="query.size"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog
      :title="form.uid ? '编辑' : '新增'"
      :visible.sync="editVisible"
      width="800px"
    >
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="用户名称">
          <el-input v-model="form.uphone"></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="form.upaswd"></el-input>
        </el-form-item>
        <el-form-item label="用户图像">
          <el-upload
            class="avatar-uploader"
            :action="$apiHost + '/common/upload'"
            name="article"
            :show-file-list="false"
            :on-success="handleUserSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="form.userImg"
              :src="$apiHost + form.userImg"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="收钱码">
          <el-upload
            class="avatar-uploader"
            :action="$apiHost + '/common/upload'"
            name="article"
            :show-file-list="false"
            :on-success="handleCodeSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="form.codeImg"
              :src="$apiHost + form.codeImg"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { JSEncrypt } from "encryptlong";
export default {
  name: "user",
  data() {
    return {
      query: {
        total: 0,
        page: 1,
        size: 5,
        uphone: "",
      },

      form: {
        uid: "",
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
    // 获取用户列表
    getList(page) {
      var that = this;
      this.$axios
        .get(this.$api.user_list, {
          headers: {
            token: "",
          },
          params: {
            page: page || 1,
            size: this.query.size,
            uphone: this.query.uphone,
          },
        })
        .then((res) => {
          if (res.code == 200) {
            this.list = res.data.list.map(function (e) {
              e.createTime = e.createTime
                ? that.$moment(e.createTime).format("YYYY-MM-DD HH:mm:ss")
                : "-";
              e.updateTime = e.updateTime
                ? that.$moment(e.updateTime).format("YYYY-MM-DD HH:mm:ss")
                : "-";
              return e;
            });

            this.query.total = res.data.total;
            this.query.page = res.data.page;
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
        uphone: "",
      };
      this.getList();
    },

    // 单个新增
    handleAdd() {
      this.form = {
        userImg: "",
        codeImg: "",
      };
      this.form.uid = "";
      this.editVisible = true;
    },
    // 单个编辑
    handleEdit(row) {
      var that = this;
      this.form.uid = row.uid;

      this.$axios
        .get(this.$api.user_info + "/" + this.form.uid)
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

      // RSA 加密密码
      // console.log(this.form.upaswd);
      // this.encryptedData(this.form);
      // return;

      if (this.form.uid) {
        this.$axios
          .put(this.$api.user_update, that.form)
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
          .post(this.$api.user_create, that.form)
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
      this.form.uid = row.uid;
      this.delVisible = true;
    },
    // 确定删除
    deleteRow() {
      var that = this;
      this.$axios
        .delete(this.$api.user_delete + "/" + this.form.uid)
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

    // 图片上传限制
    beforeAvatarUpload(file) {
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt20M;
    },
    // 图片上传结果
    handleUserSuccess(res, file) {
      this.form.userImg = file.response.data.fileUrl;
    },
    handleCodeSuccess(res, file) {
      this.form.codeImg = file.response.data.fileUrl;
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

    // RSA加密
    encryptedData(data) {
      // 设置密码
      var PUBLIC_KEY = `
      -----BEGIN PUBLIC KEY-----
      AAAAB3NzaC1yc2EAAAADAQABAAABAQC6EESHa8A624XjsmuJbwQ+wP0Y7kpmjT5kHlh9EC
      6ItyPZIlqLUMghCYwFKrcXuPPiANzyZqAv4irencoc5/+VC/FNm+7LcyF78fRUay2bqlPB
      5o8kmDWI5aQ+ol476ATvj5ce6XCconD/Vk9uJAsfH6Beezga+NVanITrH5crq7Ht6OiMEf
      4XjiAmu83l9EhKVd3TZQZgWsTFyCDbxVCXfUDvPWyIlOEB52zBkZ2J2vBu0PKf40MDk1XK
      AN0zRUeKUIzBtZtMwF3oQVzZKA3teI1vUto9Ih4v3lb8WUVh9HtC/B7xlWqmQJ2ozZ5j4q
      FKDGevikVUHHpMiUedg4t5
      -----END PUBLIC KEY-----`;
      var PRIVATE_KEY = `
      -----BEGIN OPENSSH PRIVATE KEY-----
      b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn
      NhAAAAAwEAAQAAAQEAuhBEh2vAOtuF47JriW8EPsD9GO5KZo0+ZB5YfRAuiLcj2SJai1DI
      IQmMBSq3F7jz4gDc8magL+Iq3p3KHOf/lQvxTZvuy3Mhe/H0VGstm6pTweaPJJg1iOWkPq
      JeO+gE74+XHulwnKJw/1ZPbiQLHx+gXns4GvjVWpyE6x+XK6ux7ejojBH+F44gJrvN5fRI
      SlXd02UGYFrExcgg28VQl31A7z1siJThAedswZGdidrwbtDyn+NDA5NVygDdM0VHilCMwb
      WbTMBd6EFc2SgN7XiNb1LaPSIeL95W/FlFYfR7Qvwe8ZVqpkCdqM2eY+KhSgxnr4pFVBx6
      TIlHnYOLeQAAA9jGHK5GxhyuRgAAAAdzc2gtcnNhAAABAQC6EESHa8A624XjsmuJbwQ+wP
      0Y7kpmjT5kHlh9EC6ItyPZIlqLUMghCYwFKrcXuPPiANzyZqAv4irencoc5/+VC/FNm+7L
      cyF78fRUay2bqlPB5o8kmDWI5aQ+ol476ATvj5ce6XCconD/Vk9uJAsfH6Beezga+NVanI
      TrH5crq7Ht6OiMEf4XjiAmu83l9EhKVd3TZQZgWsTFyCDbxVCXfUDvPWyIlOEB52zBkZ2J
      2vBu0PKf40MDk1XKAN0zRUeKUIzBtZtMwF3oQVzZKA3teI1vUto9Ih4v3lb8WUVh9HtC/B
      7xlWqmQJ2ozZ5j4qFKDGevikVUHHpMiUedg4t5AAAAAwEAAQAAAQEAlXWj1rQzQhQ8xN75
      ivhmjJIxvOkNUrt6tqm5oxxwhNm4Lh9uZCKL4B3vH+dkE+Y54f2Xfg/59PzUOua9B+NEZt
      GlEBaGB1+AMjP1dCp0BGsZxNQTf+3UcxckjDuZPr3t2RGa7vXNw8SoyDLosyy40lNxWvPX
      6bKgj5zTGJvTrvtp29oT/8WIWr8pNgbdhwzZ3D+qI018+JHNnZsk9Y4yoR5UeBpT1sBEaD
      zVt3R5EZxdTtBLL8rBjdIUo1sNYLhkvjGaNCV9xgn1Oth2khtVExjAWZtqrQR2tN0Ewo5e
      Ij+3YxzMFtJZ1wSPEylLy8Y85peyJVvUa7RPRNyz2ZrYAQAAAIEAxbko+Pa4Q3VrR3qN2l
      FMPYXKwXjxgbArc1E5oRXUwGrCaVr78hy/Duoh+V89HMFt+6RR30wBDNwEEJKaj3tzs7E3
      x+gFiyuuMDHLgp2UmgBO5fwnYZNAbNL50lJwIzFq5405W5efa+xpGTpQX3Wwl2Ywal+JjT
      PrgjhxTJ4GYFgAAACBANszRE7QUdmYCLjnf7V4JfPNL1B87RDxGRFuPgNUN214kNDblown
      sLsTB+ns0TcyhDjUjbh95YJ/XYSTDeSvkV6ilu4+1fUtP6dDDmj/raLSObAo5rKAwyNdcl
      /sV6qTUJmT0Uw39ixSv8ZvLYTWv9ePJ9dYaj+YYkCFPiohvSw5AAAAgQDZTNwJqtIEjrwF
      6AihENYMPbFTiH/ay60evG4mtQkmXh3WL1FPXOwviiXMh/JeLk8KBa9ZBW1WlM3WZrQtlD
      pU1BZSmnNBnrJlWp01bVumdddis0YRZ0tzr8K63MuByihHhKBLSWoZV6d7AeA3e1jv/Ke3
      Ws+t7pHjcos0P/fZQQAAAB5ob255YUBob255YWRlTWFjQm9vay1Qcm8ubG9jYWwBAgM=
      -----END OPENSSH PRIVATE KEY-----
      `;

      // 新建JSEncrypt对象
      let enc = new JSEncrypt();
      enc.setPublicKey(PUBLIC_KEY);
      enc.setPrivateKey(PRIVATE_KEY);

      // 长文本加密加密
      var encryptData = enc.encryptLong(data);
      var decryptData = enc.decryptLong(encryptData);
      console.log(encryptData);
      console.log(decryptData);

      return encryptData;
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.el-upload--text {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
