<template>
  <div
    class="config"
    v-loading.body="loading"
    element-loading-text="处理中,请稍等..."
    element-loading-spinner="el-icon-loading"
  >
    <!-- 列表面版 -->
    <div class="container">
      <!-- 页面标题 -->
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            ><i class="el-icon-date"></i> 配置管理</el-breadcrumb-item
          >
          <el-breadcrumb-item>配置列表</el-breadcrumb-item>
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
          <el-form-item label="配置名称">
            <el-input
              v-model="query.describle"
              placeholder="配置名称"
            ></el-input>
          </el-form-item>
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
        <el-table-column prop="qid" label="配置ID"> </el-table-column>
        <el-table-column prop="describle" label="配置名称"></el-table-column>
        <el-table-column label="配置内容" align="center">
          <template slot-scope="scope">
            <p
              style="color: #ff4747; cursor: pointer"
              @click="handleEdit(scope.row)"
            >
              查看
            </p>
            <!-- <div v-html="scope.row.content" style="padding:10px;"></div> -->
          </template>
        </el-table-column>
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
        <el-table-column label="操作" width="250" align="center" fixed="right">
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
      :title="form.qid ? '编辑' : '新增'"
      :visible.sync="editVisible"
      width="800px"
    >
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="配置名称">
          <el-input v-model="form.describle"></el-input>
        </el-form-item>
        <el-form-item label="配置内容">
          <quill-editor
            ref="myTextEditor"
            v-model="form.content"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
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
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import quillConfig from '../components/common/quill-config.js'
export default {
  components: {
    quillEditor,
  },
  name: "config",
  data() {
    return {
      loading: false,
      query: {
        total: 0,
        page: 1,
        size: 5,
        describle: "",
        qid: "",
      },

      form: {
        qid: "",
      },

      list: [],
      editorOption: {},

      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      editVisible: false,
      delVisible: false,
      auditVisible: false,
    };
  },
  created() {
    this.getList();
  },

  methods: {
    // 获取配置列表
    getList(page) {
      var that = this;
      this.$axios
        .get(this.$api.config_list, {
          headers: {
            token: "",
          },
          params: {
            page: page || 1,
            size: this.query.size,
            describle: this.query.describle,
            qid: this.query.qid,
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
        describle: "",
        qid: "",
      };
      this.getList();
    },

    // 单个新增
    handleAdd() {
      this.form = {
        describle: "",
        content: "",
      };
      this.form.qid = "";
      this.editVisible = true;
    },
    // 单个编辑
    handleEdit(row) {
      var that = this;
      this.form.qid = row.qid;

      this.$axios
        .get(this.$api.config_detail + "/" + this.form.qid)
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
      if (this.$pg.isEmojiCharacter(this.form.content)) {
        that.$message.error("暂不支持表情输入～");
        return;
      }

      that.loading = true;
      if (this.form.qid) {
        this.$axios
          .put(this.$api.config_update, that.form)
          .then((res) => {
            if (res.code == 200) {
              that.$message.success(res.msg);
            } else {
              that.$message.error(res.msg);
            }
            that.editVisible = false;
            that.getList();
            that.loading = false;
          })
          .catch((req) => {
            console.log(req);
            that.loading = false;
          });
      } else {
        this.$axios
          .post(this.$api.config_create, that.form)
          .then((res) => {
            if (res.code == 200) {
              that.$message.success(res.msg);
            } else {
              that.$message.error(res.msg);
            }
            that.editVisible = false;
            that.getList();
            that.loading = false;
          })
          .catch((req) => {
            console.log(req);
            that.loading = false;
          });
      }
    },

    // 单个删除
    handleDelete(row) {
      this.form.qid = row.qid;
      this.delVisible = true;
    },
    // 确定删除
    deleteRow() {
      var that = this;
      this.$axios
        .delete(this.$api.config_delete + "/" + this.form.qid)
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

    // 富文本处理
    onEditorBlur(quill) {
      // console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      // console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      // console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      // this.content = html;
      // console.log("editor change!", quill, html, text);
      //this.$emit('change', html)
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
