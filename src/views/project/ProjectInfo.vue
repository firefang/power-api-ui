<template>
  <anchor-layout>
    <a-card title="基本信息" id="info">
      <a slot="extra">编辑</a>
      <description-list size="small" :col="4">
        <description-list-item term="名称">{{ $route.query.name }}</description-list-item>
        <description-list-item term="归属">XXX组</description-list-item>
        <description-list-item term="创建人">超级管理员</description-list-item>
        <description-list-item term="创建时间">2018-08-07 12:00:00</description-list-item>
        <description-list-item term="备注" :span="24">请于两个工作日内确认请于两个工作日内确认请于两个工作日内确认</description-list-item>
      </description-list>
    </a-card>
    <a-card title="加密类" style="margin-top: 24px" id="encrypt">
      <a slot="extra">编辑</a>
      <span>com.abc.encrypt.CustomEncrypter</span>
    </a-card>
    <a-card title="环境" style="margin-top: 24px" id="env" :bodyStyle="noPadding">
      <a slot="extra">添加</a>
      <a-table :columns="envCols" :dataSource="envs" :pagination="false" rowKey="id">
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
import { envCols, varCols, headerCols, setupTeardownCols } from './cols'

const DescriptionListItem = DescriptionList.Item

export default {
  name: 'ProjectInfo',
  components: {
    AnchorLayout,
    DescriptionList,
    DescriptionListItem
  },
  data () {
    return {
      noPadding: { padding: 0 },
      envCols,
      envs: [{ id: 1, name: '测试环境', address: 'http://127.0.0.1:8080', default: true }],
      varCols,
      vars: [{ id: 1, name: 'test', expression: 'T(java.lang.String).valueOf(#a + @Query.data)' }],
      headerCols,
      headers: [{ id: 1, key: 'x-auth-token', value: '@Login.token' }, { id: 2, key: 'custom', value: 'constant value' }],
      setupTeardownCols,
      setups: [{ id: 1, type: '数据库', expression: 'insert into t (id, name) values (1, "test")' }],
      teardowns: [{ id: 1, type: '数据库', expression: 'delete from t where id = 1' }]
    }
  },
  methods: {
  }
}
</script>
