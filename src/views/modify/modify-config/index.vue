<template>
  <div class="app-container">
    <div class="filter-container">
      <el-tabs style="margin-top:15px">
        <!-- 变更类型 -->
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-date">变更类型</i>
          </span>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="modifyTypeQuery.search" size="small" style placeholder="输入变更类型搜索" />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-search"
                @click="handleModifyTypeSearch()"
              >搜索</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="success"
                size="small"
                icon="el-icon-plus"
                @click="handleModifyTypeAdd()"
              >添加</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="dataModifyType" stripe border style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column label="变更类型" prop="name" />
            <el-table-column align="center" label="创建时间" prop="create_time">
              <template slot-scope="scope">
                <span>{{ scope.row.create_time }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <!-- <span @click='handleEdit(scope.$index, scope.row)' class='el-tag el-tag--success'>修改</span> -->
                <span class="el-tag el-tag--danger">
                  <a class="a_underline" @click="handleModifyTypeDelete(scope.$index, scope.row)">删除</a>
                </span>
                <span class="el-tag el-tag--primary">
                  <a class="a_underline" @click="handleModifyTypeEdit(scope.$index, scope.row)">修改</a>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total.modifyType>0"
            :total="total.modifyType"
            :current_page.sync="modifyTypeQuery.current_page"
            :page_size.sync="modifyTypeQuery.page_size"
            align="right"
            @pagination="getModifyTypeList"
          />
          <el-dialog :visible.sync="dialogTypeFormVisible" title="新增/修改变更类型">
            <el-form ref="typeForm" :model="type_form" label-width="120px">
              <el-form-item label="ID">
                <el-input v-model="type_form.id" disabled />
              </el-form-item>
              <el-form-item label="变更类型">
                <el-input v-model="type_form.name" />
              </el-form-item>
              <el-form-item align="right" style="padding-right: 48px">
                <el-button
                  type="primary"
                  @click="dialogTypeStatus==='create'?createModifyTypeData():updateModifyTypeData()"
                >确定</el-button>
                <el-button @click="dialogTypeFormVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </el-tab-pane>
        <!-- 变更等级 -->
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-star-off">变更等级</i>
          </span>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-button
                type="success"
                size="small"
                icon="el-icon-plus"
                @click="handleModifyLevelAdd()"
              >添加</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="dataModifyLevel" stripe border style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column label="等级名称" prop="name" />
            <el-table-column label="变更等级" prop="level" />
            <el-table-column label="变更时效(小时)" prop="time" />
            <el-table-column align="center" label="创建时间" prop="create_time">
              <template slot-scope="scope">
                <span>{{ scope.row.create_time }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <span class="el-tag el-tag--danger">
                  <a
                    class="a_underline"
                    @click="handleModifyLevelDelete(scope.$index, scope.row)"
                  >删除</a>
                </span>
                <span class="el-tag el-tag--primary">
                  <a class="a_underline" @click="handleModifyLevelEdit(scope.$index, scope.row)">修改</a>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog :visible.sync="dialogLevelFormVisible" title="新增/修改变更等级">
            <el-form ref="levelForm" :model="level_form" label-width="120px">
              <el-form-item label="ID">
                <el-input v-model="level_form.id" disabled />
              </el-form-item>
              <el-form-item label="变更中文名称">
                <el-input v-model="level_form.name" />
              </el-form-item>
              <el-form-item label="变更等级">
                <el-input-number v-model="level_form.level" :min="0" :max="8" label="等级" />
              </el-form-item>
              <el-form-item label="变更时效(小时)">
                <el-input-number v-model="level_form.time" :min="0" :max="128" />
              </el-form-item>
              <el-form-item align="right" style="padding-right: 48px">
                <el-button
                  type="primary"
                  @click="dialogLevelStatus==='create'?createModifyLevelData():updateModifyLevelData()"
                >确定</el-button>
                <el-button @click="dialogLevelFormVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </el-tab-pane>
        <!-- 变更来源 -->
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-share">变更来源</i>
          </span>
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-button
                type="success"
                size="small"
                icon="el-icon-plus"
                @click="handleModifySourceAdd()"
              >添加</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="dataModifySource" stripe border style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column label="来源名称" prop="name" />
            <el-table-column align="center" label="创建时间" prop="create_time">
              <template slot-scope="scope">
                <span>{{ scope.row.create_time }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <span class="el-tag el-tag--danger">
                  <a
                    class="a_underline"
                    @click="handleModifySourceDelete(scope.$index, scope.row)"
                  >删除</a>
                </span>
                <span class="el-tag el-tag--primary">
                  <a class="a_underline" @click="handleModifySourceEdit(scope.$index, scope.row)">修改</a>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog :visible.sync="dialogSourceFormVisible" title="新增/修改变更来源">
            <el-form ref="sourceForm" :model="source_form" label-width="120px">
              <el-form-item label="ID">
                <el-input v-model="source_form.id" disabled />
              </el-form-item>
              <el-form-item label="变更来源名称">
                <el-input v-model="source_form.name" />
              </el-form-item>
              <el-form-item align="right" style="padding-right: 48px">
                <el-button
                  type="primary"
                  @click="dialogSourceStatus==='create'?createModifySourceData():updateModifySourceData()"
                >确定</el-button>
                <el-button @click="dialogSourceFormVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

import {
  getModifyLevelList,
  addModifyLevel,
  updateModifyLevel,
  deleteModifyLevel
} from '@/api/modify'

import {
  getModifyTypeList,
  addModifyType,
  updateModifyType,
  deleteModifyType
} from '@/api/modify'

import {
  getModifySourceList,
  addModifySource,
  updateModifySource,
  deleteModifySource
} from '@/api/modify'

import Pagination from '@/components/Pagination'

export default {
  name: 'ModifyConfig',
  components: { Pagination },
  data() {
    return {
      // 变更类型tableData
      dataModifyType: [],
      // 变更等级tableData
      dataModifyLevel: [],
      // 变更来源tableData
      dataModifySource: [],
      total: {
        modifyType: 0
      },
      modifyTypeQuery: {
        current_page: 1,
        page_size: 20,
        search: ''
      },
      dialogTypeStatus: '',
      dialogTypeFormVisible: false,
      dialogLevelStatus: '',
      dialogLevelFormVisible: false,
      dialogSourceStatus: '',
      dialogSourceFormVisible: false,
      // 变更类型dialog Form数据
      type_form: {
        id: undefined,
        name: ''
      },
      // 变更level_form:
      level_form: {
        id: undefined,
        name: '',
        level: 0,
        time: 0
      },
      source_form: {
        id: undefined,
        name: ''
      }
    }
  },
  created() {
    this.getModifyTypeList()
    this.getModifySourceList()
    this.getModifyLevelList()
  },
  methods: {
    resetTemp() {
      this.type_form = {
        id: undefined,
        name: ''
      }
      this.level_form = {
        id: undefined,
        name: '',
        level: 0,
        time: 0
      }
      this.source_form = {
        id: undefined,
        name: ''
      }
    },
    // 获取变更类型列表
    getModifyTypeList() {
      const This = this
      getModifyTypeList(This.modifyTypeQuery).then(response => {
        This.dataModifyType = response.data
        This.$set(This.total, 'modifyType', response.total)
      })
    },
    // 搜索变更类型
    handleModifyTypeSearch() {
      const This = this
      getModifyTypeList(This.modifyTypeQuery).then(response => {
        This.dataModifyType = response.data
        This.$set(This.total, 'modifyType', response.total)
      })
    },
    // 触发添加变更类型dialog
    handleModifyTypeAdd() {
      this.resetTemp()
      this.dialogTypeStatus = 'create'
      this.dialogTypeFormVisible = true
    },
    // 触发修改变更类型dialog
    handleModifyTypeEdit(index, row) {
      this.resetTemp()
      this.type_form = Object.assign({}, row)
      this.dialogTypeStatus = 'update'
      this.dialogTypeFormVisible = true
    },
    // 触发删除变更类型dialog
    handleModifyTypeDelete(index, row) {
      const This = this
      This.$confirm('是否删除变更类型?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteModifyType(row.id)
          .then(response => {
            This.$message({
              message: response.message,
              type: 'success',
              duration: 1000,
              onClose: function refresh() {
                This.getModifyTypeList()
              }
            })
          })
          .catch(() => {
            This.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      })
    },
    // 创建变更类型
    createModifyTypeData() {
      const This = this
      addModifyType(this.type_form).then(response => {
        this.$message({
          message: response.message,
          duration: 1000,
          type: 'success',
          onClose: function refresh() {
            This.dialogTypeFormVisible = false
            This.getModifyTypeList()
          }
        })
      })
    },
    // 更新变更类型
    updateModifyTypeData() {
      const This = this
      updateModifyType(this.type_form).then(response => {
        this.$message({
          message: response.message,
          duration: 1000,
          type: 'success',
          onClose: function refresh() {
            This.dialogTypeFormVisible = false
            This.getModifyTypeList()
          }
        })
      })
    },
    // 获取变更等级列表
    getModifyLevelList() {
      const This = this
      getModifyLevelList(This.tickeLevelQuery).then(response => {
        This.dataModifyLevel = response.data
      })
    },
    // 触发添加变更等级dialog
    handleModifyLevelAdd() {
      this.resetTemp()
      this.dialogLevelStatus = 'create'
      this.dialogLevelFormVisible = true
    },
    // 创建变更等级
    createModifyLevelData() {
      const This = this
      addModifyLevel(this.level_form).then(response => {
        this.$message({
          message: response.message,
          duration: 1000,
          type: 'success',
          onClose: function refresh() {
            This.dialogLevelFormVisible = false
            This.getModifyLevelList()
          }
        })
      })
    },
    // 触发修改变更等级dialog
    handleModifyLevelEdit(index, row) {
      this.resetTemp()
      this.level_form = Object.assign({}, row)
      this.dialogLevelStatus = 'update'
      this.dialogLevelFormVisible = true
    },
    // 更新变更等级
    updateModifyLevelData() {
      const This = this
      updateModifyLevel(this.level_form).then(response => {
        this.$message({
          message: response.message,
          duration: 1000,
          type: 'success',
          onClose: function refresh() {
            This.dialogLevelFormVisible = false
            This.getModifyLevelList()
          }
        })
      })
    },
    // 触发删除变更等级dialog
    handleModifyLevelDelete(index, row) {
      const This = this
      This.$confirm('是否删除变更等级?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteModifyLevel(row.id)
          .then(response => {
            This.$message({
              message: response.message,
              type: 'success',
              duration: 1000,
              onClose: function refresh() {
                This.getModifyLevelList()
              }
            })
          })
          .catch(() => {
            This.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      })
    },
    // 获取变更来源列表
    getModifySourceList() {
      const This = this
      getModifySourceList().then(response => {
        This.dataModifySource = response.data
      })
    },
    // 触发添加变更来源dialog
    handleModifySourceAdd() {
      this.resetTemp()
      this.dialogSourceStatus = 'create'
      this.dialogSourceFormVisible = true
    },
    // 创建变更来源
    createModifySourceData() {
      const This = this
      addModifySource(this.source_form).then(response => {
        this.$message({
          message: response.message,
          duration: 1000,
          type: 'success',
          onClose: function refresh() {
            This.dialogLevelFormVisible = false
            This.getModifySourceList()
          }
        })
      })
      This.dialogSourceFormVisible = false
    },
    // 触发修改变更来源dialog
    handleModifySourceEdit(index, row) {
      this.resetTemp()
      this.source_form = Object.assign({}, row)
      this.dialogSourceStatus = 'update'
      this.dialogSourceFormVisible = true
    },
    // 更新变更等级
    updateModifySourceData() {
      const This = this
      updateModifySource(This.source_form).then(response => {
        This.$message({
          message: response.message,
          duration: 1000,
          type: 'success',
          onClose: function refresh() {
            This.getModifySourceList()
          }
        })
      })
      This.dialogSourceFormVisible = false
    },
    // 触发删除变更来源dialog
    handleModifySourceDelete(index, row) {
      const This = this
      This.$confirm('是否删除变更来源?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteModifySource(row.id)
          .then(response => {
            This.$message({
              message: response.message,
              type: 'success',
              duration: 1000,
              onClose: function refresh() {
                This.getModifySourceList()
              }
            })
          })
          .catch(() => {
            This.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      })
    }
  }
}
</script>
