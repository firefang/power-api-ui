<template>
  <anchor-layout>
    <a-card title="基本信息" id="info">
      <a slot="extra">编辑</a>
      <description-list size="small" :col="3">
        <description-list-item term="名称">{{ $route.query.name }}</description-list-item>
        <description-list-item term="创建人">超级管理员</description-list-item>
        <description-list-item term="创建时间">2018-08-07 12:00:00</description-list-item>
        <description-list-item term="请求目标">/api</description-list-item>
        <description-list-item term="方法">GET</description-list-item>
        <description-list-item term="类型">HTTP</description-list-item>
      </description-list>
    </a-card>
    <a-card title="请求参数类型" style="margin-top: 24px" id="paramTypes">
      <a slot="extra">编辑</a>
      <a-list :dataSource="paramTypes" :grid="{ gutter: 16, column: 4 }">
        <a-list-item slot="renderItem" slot-scope="item, index">{{`${index + 1}: ${item}`}}</a-list-item>
      </a-list>
    </a-card>
    <a-card title="变量" style="margin-top: 24px" id="var" :bodyStyle="noPadding">
      <a slot="extra">添加</a>
      <a-table :columns="varCols" :dataSource="vars" :pagination="false" rowKey="id">
        <span slot="action">
          <template>
            <a>修改</a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否删除？" okText="是" cancelText="否">
              <a>删除</a>
            </a-popconfirm>
          </template>
        </span>
      </a-table>
    </a-card>
    <a-card title="HEADER" style="margin-top: 24px" id="header" :bodyStyle="noPadding">
      <a slot="extra">添加</a>
      <a-table :columns="headerCols" :dataSource="headers" :pagination="false" rowKey="id">
        <span slot="action">
          <template>
            <a>修改</a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否删除？" okText="是" cancelText="否">
              <a>删除</a>
            </a-popconfirm>
          </template>
        </span>
      </a-table>
    </a-card>
    <a-card title="加解密参数" style="margin-top: 24px" id="encrypt" :bodyStyle="noPadding">
      <a slot="extra">添加</a>
      <a-table
        :columns="encryptParamCols"
        :dataSource="encryptParams"
        :pagination="false"
        rowKey="id"
      >
        <template slot="isDefault" slot-scope="isDefault">{{ isDefault ? '是' : '否' }}</template>
        <span slot="action">
          <template>
            <a>修改</a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否删除？" okText="是" cancelText="否">
              <a>删除</a>
            </a-popconfirm>
          </template>
        </span>
      </a-table>
    </a-card>
    <a-card title="Setup" style="margin-top: 24px" id="setup" :bodyStyle="noPadding">
      <a slot="extra">添加</a>
      <a-table :columns="setupTeardownCols" :dataSource="setups" :pagination="false" rowKey="id">
        <span slot="action">
          <template>
            <a>修改</a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否删除？" okText="是" cancelText="否">
              <a>删除</a>
            </a-popconfirm>
          </template>
        </span>
      </a-table>
    </a-card>
    <a-card title="Teardown" style="margin-top: 24px" id="setup" :bodyStyle="noPadding">
      <a slot="extra">添加</a>
      <a-table :columns="setupTeardownCols" :dataSource="teardowns" :pagination="false" rowKey="id">
        <span slot="action">
          <template>
            <a>修改</a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否删除？" okText="是" cancelText="否">
              <a>删除</a>
            </a-popconfirm>
          </template>
        </span>
      </a-table>
    </a-card>
  </anchor-layout>
</template>

<script>
import { AnchorLayout } from '@/layouts'
import DescriptionList from '@/components/DescriptionList'
import { varCols, headerCols, encryptParamCols, setupTeardownCols } from './cols'

const DescriptionListItem = DescriptionList.Item

export default {
  name: 'ApiInfo',
  components: {
    AnchorLayout,
    DescriptionList,
    DescriptionListItem
  },
  data () {
    return {
      noPadding: { padding: 0 },
      paramTypes: ['java.lang.String', 'int', 'java.lang.String', 'java.lang.String', 'java.lang.String', 'java.lang.String'],
      varCols,
      vars: [{ id: 1, name: 'test', expression: 'T(java.lang.String).valueOf(#a + @Query.data)' }],
      headerCols,
      headers: [{ id: 1, key: 'x-auth-token', value: '@Login.token' }, { id: 2, key: 'custom', value: 'constant value' }],
      encryptParamCols,
      encryptParams: [],
      setupTeardownCols,
      setups: [{ id: 1, type: '数据库', expression: 'insert into t (id, name) values (1, "test")' }],
      teardowns: [{ id: 1, type: '数据库', expression: 'delete from t where id = 1' }]
    }
  },
  methods: {
  }
}
</script>
