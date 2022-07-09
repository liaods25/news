<template>
  <div
    class="articles"
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
            ><i class="el-icon-date"></i> 文章管理</el-breadcrumb-item
          >
          <el-breadcrumb-item>文章列表</el-breadcrumb-item>
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
          <el-form-item label="文章名称">
            <el-input v-model="query.title" placeholder="文章名称"></el-input>
          </el-form-item>
          <el-form-item label="文章分类">
            <el-select v-model="query.cid" placeholder="文章分类">
              <el-option
                key="1"
                :label="item.cname"
                :value="item.cid"
                v-for="(item, index) in category_list"
                :key="item.cid"
              ></el-option>
            </el-select>
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
      <el-tabs v-model="audit" @tab-click="getList()">
        <el-tab-pane :label="`全部文章(${countTotal.alls})`" name="0">
          <el-table
            :data="list"
            stripe
            border
            style="width: 100%"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="aid" label="文章ID"> </el-table-column>
            <el-table-column prop="title" label="文章名称" width="200">
            </el-table-column>
            <el-table-column prop="cid" label="文章分类">
              <template slot-scope="scope">
                {{ category_text[scope.row.cid] }}
              </template>
            </el-table-column>
            <!-- <el-table-column label="文章图像" width="180" align="center">
              <template slot-scope="scope">
                <el-image
                  style="width: 150px; height: 100px; border-radius: 5px"
                  :src="$apiHost + scope.row.img"
                  :preview-src-list="[$apiHost + scope.row.img]"
                  fit="contain"
                >
                </el-image>
              </template>
            </el-table-column> -->
            <!-- <el-table-column prop="summary" label="文章简介" width="250">
            </el-table-column> -->
            <el-table-column label="文章内容" align="center">
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
            <!-- <el-table-column label="文章内容" width="300" align="center">
              <template slot-scope="scope">
                <div v-text="scope.row.content"></div>
              </template>
            </el-table-column> -->
            <!-- <el-table-column prop="location" label="发布定位">
            </el-table-column> -->
            <el-table-column prop="auditStatus" label="状态">
              <template slot-scope="scope">
                {{ article_text[scope.row.auditStatus] }}
              </template>
            </el-table-column>
            <el-table-column prop="auditReason" label="原因"> </el-table-column>
            <el-table-column prop="uname" label="创建人"> </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              sortable
              width="150"
            >
            </el-table-column>
            <el-table-column prop="updateBy" label="更新人"> </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间"
              sortable
              width="150"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="250"
              align="center"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.auditStatus == 1"
                  size="small"
                  type="success"
                  @click="handleAudit(scope.row)"
                  >审核</el-button
                >
                <el-button
                  v-if="scope.row.auditStatus == 3"
                  size="small"
                  type="success"
                  @click="handleAudit(scope.row)"
                  >重新审核</el-button
                >
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
        </el-tab-pane>
        <el-tab-pane :label="`待审核(${countTotal.wait})`" name="1">
          <el-table
            :data="list"
            stripe
            border
            style="width: 100%"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="aid" label="文章ID"> </el-table-column>
            <el-table-column prop="title" label="文章名称" width="200">
            </el-table-column>
            <el-table-column prop="cid" label="文章分类">
              <template slot-scope="scope">
                {{ category_text[scope.row.cid] }}
              </template>
            </el-table-column>
            <!-- <el-table-column label="文章图像" width="180" align="center">
              <template slot-scope="scope">
                <el-image
                  style="width: 150px; height: 100px; border-radius: 5px"
                  :src="$apiHost + scope.row.img"
                  :preview-src-list="[$apiHost + scope.row.img]"
                  fit="contain"
                >
                </el-image>
              </template>
            </el-table-column> -->
            <!-- <el-table-column prop="summary" label="文章简介" width="250">
            </el-table-column> -->
            <el-table-column label="文章内容" align="center">
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
            <!-- <el-table-column label="文章内容" width="300" align="center">
              <template slot-scope="scope">
                <div v-text="scope.row.content"></div>
              </template>
            </el-table-column> -->
            <!-- <el-table-column prop="location" label="发布定位">
            </el-table-column> -->
            <el-table-column prop="auditStatus" label="状态">
              <template slot-scope="scope">
                {{ article_text[scope.row.auditStatus] }}
              </template>
            </el-table-column>
            <el-table-column prop="auditReason" label="原因"> </el-table-column>
            <el-table-column prop="uname" label="创建人"> </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              sortable
              width="150"
            >
            </el-table-column>
            <el-table-column prop="updateBy" label="更新人"> </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间"
              sortable
              width="150"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="250"
              align="center"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  size="small"
                  type="success"
                  @click="handleAudit(scope.row)"
                  >审核</el-button
                >
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
        </el-tab-pane>
        <el-tab-pane :label="`审核成功(${countTotal.suce})`" name="2">
          <el-table
            :data="list"
            stripe
            border
            style="width: 100%"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="aid" label="文章ID"> </el-table-column>
            <el-table-column prop="title" label="文章名称" width="200">
            </el-table-column>
            <el-table-column prop="cid" label="文章分类">
              <template slot-scope="scope">
                {{ category_text[scope.row.cid] }}
              </template>
            </el-table-column>
            <!-- <el-table-column label="文章图像" width="180" align="center">
              <template slot-scope="scope">
                <el-image
                  style="width: 150px; height: 100px; border-radius: 5px"
                  :src="$apiHost + scope.row.img"
                  :preview-src-list="[$apiHost + scope.row.img]"
                  fit="contain"
                >
                </el-image>
              </template>
            </el-table-column> -->
            <!-- <el-table-column prop="summary" label="文章简介" width="250">
            </el-table-column> -->
            <el-table-column label="文章内容" align="center">
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
            <!-- <el-table-column label="文章内容" width="300" align="center">
              <template slot-scope="scope">
                <div v-text="scope.row.content"></div>
              </template>
            </el-table-column> -->
            <!-- <el-table-column prop="location" label="发布定位">
            </el-table-column> -->
            <el-table-column prop="auditStatus" label="状态">
              <template slot-scope="scope">
                {{ article_text[scope.row.auditStatus] }}
              </template>
            </el-table-column>
            <el-table-column prop="auditReason" label="原因"> </el-table-column>
            <el-table-column prop="uname" label="创建人"> </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              sortable
              width="150"
            >
            </el-table-column>
            <el-table-column prop="updateBy" label="更新人"> </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间"
              sortable
              width="150"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="250"
              align="center"
              fixed="right"
            >
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
        </el-tab-pane>
        <el-tab-pane :label="`审核失败(${countTotal.fail})`" name="3">
          <el-table
            :data="list"
            stripe
            border
            style="width: 100%"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="aid" label="文章ID"> </el-table-column>
            <el-table-column prop="title" label="文章名称" width="200">
            </el-table-column>
            <el-table-column prop="cid" label="文章分类">
              <template slot-scope="scope">
                {{ category_text[scope.row.cid] }}
              </template>
            </el-table-column>
            <!-- <el-table-column label="文章图像" width="180" align="center">
              <template slot-scope="scope">
                <el-image
                  style="width: 150px; height: 100px; border-radius: 5px"
                  :src="$apiHost + scope.row.img"
                  :preview-src-list="[$apiHost + scope.row.img]"
                  fit="contain"
                >
                </el-image>
              </template>
            </el-table-column> -->
            <!-- <el-table-column prop="summary" label="文章简介" width="250">
            </el-table-column> -->
            <el-table-column label="文章内容" align="center">
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
            <!-- <el-table-column label="文章内容" width="300" align="center">
              <template slot-scope="scope">
                <div v-text="scope.row.content"></div>
              </template>
            </el-table-column> -->
            <!-- <el-table-column prop="location" label="发布定位">
            </el-table-column> -->
            <el-table-column prop="auditStatus" label="状态">
              <template slot-scope="scope">
                {{ article_text[scope.row.auditStatus] }}
              </template>
            </el-table-column>
            <el-table-column prop="auditReason" label="原因"> </el-table-column>
            <el-table-column prop="uname" label="创建人"> </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              sortable
              width="150"
            >
            </el-table-column>
            <el-table-column prop="updateBy" label="更新人"> </el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间"
              sortable
              width="150"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              width="250"
              align="center"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  size="small"
                  type="success"
                  @click="handleAudit(scope.row)"
                  >重新审核</el-button
                >
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
        </el-tab-pane>
      </el-tabs>

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
      :title="form.aid ? '编辑' : '新增'"
      :visible.sync="editVisible"
      width="800px"
    >
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="文章名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类">
          <el-select
            v-model="form.cid"
            placeholder="文章分类"
            style="width: 100%"
          >
            <el-option
              key="1"
              :label="item.cname"
              :value="item.cid"
              v-for="(item, index) in category_list"
              :key="item.cid"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="文章图像">
          <el-upload
            class="avatar-uploader"
            :action="$apiHost + '/common/upload'"
            name="article"
            :show-file-list="false"
            :on-success="handleImgSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.img" :src="$apiHost + form.img" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> -->
        <!-- <el-form-item label="文章简介">
          <el-input type="textarea" v-model="form.summary"></el-input>
        </el-form-item> -->
        <el-form-item label="文章内容">
          <quill-editor
            ref="myTextEditor"
            v-model="form.content"
            :options="editorOption"
          ></quill-editor>
        </el-form-item>
        <!-- <el-form-item label="发布定位">
          <el-input v-model="form.location"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 审核弹出框 -->
    <el-dialog title="审核" :visible.sync="auditVisible" width="800px">
      <el-form
        ref="form"
        :model="form"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="文章名称">
          <el-input v-model="form.title" disabled></el-input>
        </el-form-item>
        <el-form-item label="文章分类">
          <el-select
            v-model="form.cid"
            placeholder="文章分类"
            style="width: 100%"
            disabled
          >
            <el-option
              key="1"
              :label="item.cname"
              :value="item.cid"
              v-for="(item, index) in category_list"
              :key="item.cid"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="文章图像">
          <el-upload
            class="avatar-uploader"
            :action="$apiHost + '/common/upload'"
            name="article"
            :show-file-list="false"
            :on-success="handleImgSuccess"
            :before-upload="beforeAvatarUpload"
            disabled
          >
            <img v-if="form.img" :src="$apiHost + form.img" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> -->
        <!-- <el-form-item label="文章简介">
          <el-input type="textarea" v-model="form.summary" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="文章内容">
          <quill-editor
            ref="myTextEditor"
            v-model="form.content"
            :options="editorOption"
            disabled
          ></quill-editor>
        </el-form-item>
        <!-- <el-form-item label="发布定位">
          <el-input v-model="form.location" disabled></el-input>
        </el-form-item> -->

        <el-form-item label="审核意见">
          <el-input type="textarea" v-model="form.auditReason"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="auditVisible = false">取 消</el-button>
        <el-button type="success" @click="saveAudit(2)">同 意</el-button>
        <el-button type="danger" @click="saveAudit(3)">拒 绝</el-button>
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
export default {
  components: {
    quillEditor,
  },
  name: "articles",
  data() {
    return {
      loading: false,
      audit: "0",
      query: {
        total: 0,
        page: 1,
        size: 10,
        title: "",
        cid: "",
      },

      form: {
        aid: "",
      },

      list: [],
      category_list: [],
      category_text: {},
      article_text: {
        1: "待审核",
        2: "审核成功",
        3: "审核失败",
      },
      countTotal: {
        alls: "0",
        wait: "0",
        suce: "0",
        fail: "0",
      },
      editorOption: {
        placeholder: "Hello World",
      },

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
    this.getCategory();
    this.getList();
  },

  methods: {
    // 获取分类列表
    getCategory() {
      var that = this;
      this.$axios
        .get(this.$api.category_list, {})
        .then((res) => {
          if (res.code == 200) {
            this.category_list = res.data;
            this.category_list.map(function (item) {
              that.category_text[item.cid] = item.cname;
            });
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((req) => {
          console.log(req);
        });
    },
    // 获取文章列表
    getList(page) {
      var that = this;
      this.$axios
        .get(this.$api.article_list, {
          headers: {
            token: "",
          },
          params: {
            page: page || 1,
            size: this.query.size,
            auditStatus: this.audit,
            title: this.query.title,
            cid: this.query.cid,
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

            if (this.audit == 0) {
              this.query.total = res.data.countTotal.alls;
            } else if (this.audit == 1) {
              this.query.total = res.data.countTotal.wait;
            } else if (this.audit == 2) {
              this.query.total = res.data.countTotal.suce;
            } else if (this.audit == 3) {
              this.query.total = res.data.countTotal.fail;
            }

            this.query.page = res.data.page;

            this.countTotal = res.data.countTotal;
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
        cid: "",
      };
      this.getList();
    },

    // 单个新增
    handleAdd() {
      this.form = {};
      this.form.aid = "";
      this.editVisible = true;
    },
    // 单个编辑
    handleEdit(row) {
      var that = this;
      this.form.aid = row.aid;

      this.$axios
        .get(this.$api.article_detail + "/" + this.form.aid)
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
    // 单个审核
    handleAudit(row) {
      var that = this;
      this.form.aid = row.aid;

      this.$axios
        .get(this.$api.article_detail + "/" + this.form.aid)
        .then((res) => {
          if (res.code == 200) {
            that.form = res.data;
            that.form.createTime = that.form.createTime
              ? that.$moment(that.form.createTime).format("YYYY-MM-DD HH:mm:ss")
              : null;
            that.form.updateTime = that.form.updateTime
              ? that.$moment(that.form.updateTime).format("YYYY-MM-DD HH:mm:ss")
              : null;
            that.auditVisible = true;
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
      that.form.auditStatus = 1;
      if(this.$pg.isEmojiCharacter(this.form.content)){
          that.$message.error("暂不支持表情输入～");
					return
			}
      that.loading = true;
      if (this.form.aid) {
        this.$axios
          .put(this.$api.article_update, that.form)
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
          .post(this.$api.article_create, that.form)
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

    // 提交审核
    saveAudit(auditStatus) {
      var that = this;

      that.form.auditStatus = auditStatus;

      if (this.form.auditStatus == 3 && !this.form.auditReason) {
        this.$message.error("审核意见不能为空");
        return;
      }

      that.loading = true;
      this.$axios
        .put(this.$api.article_update, that.form)
        .then((res) => {
          if (res.code == 200) {
            that.$message.success(res.msg);
          } else {
            that.$message.error(res.msg);
          }
          that.auditVisible = false;
          that.getList();
          that.loading = false;
        })
        .catch((req) => {
          console.log(req);
          that.loading = false;
        });
    },

    // 单个删除
    handleDelete(row) {
      this.form.aid = row.aid;
      this.delVisible = true;
    },
    // 确定删除
    deleteRow() {
      var that = this;
      this.$axios
        .delete(this.$api.article_delete + "/" + this.form.aid)
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
      this.loading = true;
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt20M;
    },
    // 图片上传结果
    handleImgSuccess(res, file) {
      this.form.img = file.response.data.fileUrl;
      this.loading = false;
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
