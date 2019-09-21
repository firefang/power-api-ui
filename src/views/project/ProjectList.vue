<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="名称">
              <a-input v-model="queryParam.name" placeholder="请输入项目名称" />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="归属">
                <a-select v-model="queryParam.team" placeholder="请选择" default-value="0">
                  <a-select-option value="0">组一</a-select-option>
                  <a-select-option value="1">组二</a-select-option>
                  <a-select-option value="2">组三</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="创建日期">
                <a-range-picker v-model="queryParam.createTime" format="YYYY-MM-DD HH:mm" />
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="advanced && { float: 'right', overflow: 'hidden' } || {}"
            >
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.createProjectModal.open()">新建</a-button>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
      :pageSize="15"
    >
      <router-link slot="name" slot-scope="text, record" :to="`/project/${record.id}`">{{text}}</router-link>
      <span slot="description" slot-scope="text">
        <ellipsis :length="30" tooltip>{{ text }}</ellipsis>
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="$refs.editProjectModal.open(record)">修改</a>
          <a-divider type="vertical" />
          <a-popconfirm title="是否删除该项目？" @confirm="handleDelete(record)" okText="是" cancelText="否">
            <a>删除</a>
          </a-popconfirm>
        </template>
      </span>
    </s-table>

    <!-- 对话框 -->
    <create-project-modal ref="createProjectModal" @ok="handleCreateProjectOK" />
    <edit-project-modal ref="editProjectModal" @ok="handleEditProjectOK" />
  </a-card>
</template>

<script>
import { Ellipsis, STable } from '@/components'
import { getProjects } from '@/api/project'
import CreateProjectModal from './modal/CreateProjectModal'
import EditProjectModal from './modal/EditProjectModal'

export default {
  name: 'ProjectList',
  components: {
    Ellipsis,
    STable,
    CreateProjectModal,
    EditProjectModal
  },
  data () {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: 'id',
          sorter: true
        },
        {
          title: '名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
          sorter: true
        },
        {
          title: '描述',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          sorter: true
        },
        {
          title: '归属',
          dataIndex: 'team.name'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const pageParam = { page: parameter.pageNo, size: parameter.pageSize }
        return getProjects(Object.assign(pageParam, this.queryParam)).then(resp => {
          return resp.data
        })
      }
    }
  },
  methods: {
    handleDelete (record) {
      console.log(record)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    handleCreateProjectOK () {

    },
    handleEditProjectOK () {

    }
  }
}
</script>
