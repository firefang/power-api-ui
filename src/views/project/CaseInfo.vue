<template>
  <anchor-layout>
    <a-card title="基本信息" id="info">
      <a slot="extra">编辑</a>
      <description-list size="small" :col="3">
        <description-list-item term="名称">{{ $route.query.name }}</description-list-item>
        <description-list-item term="创建人">超级管理员</description-list-item>
        <description-list-item term="创建时间">2018-08-07 12:00:00</description-list-item>
        <description-list-item term="key">TestKey</description-list-item>
      </description-list>
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
    <a-card title="请求参数" style="margin-top: 24px" id="request" :bodyStyle="noPadding">
      <a slot="extra">编辑</a>
      <a-tabs defaultActiveKey="1" :tabBarStyle="{margin: 0}">
        <a-tab-pane tab="Form" key="1">
          <a-table :columns="reqParamCols" :dataSource="reqForm" :pagination="false" rowKey="id">
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
        </a-tab-pane>
        <a-tab-pane tab="Body" key="2" forceRender>
          <pre style="margin-top: 16px">{{reqBody}}</pre>
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <a-card title="断言" style="margin-top: 24px" id="assertion" :bodyStyle="noPadding">
      <a slot="extra">添加</a>
      <a-table :columns="assertionCols" :dataSource="assertions" :pagination="false" rowKey="id">
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
import { operation, varCols, headerCols, assertionCols, setupTeardownCols } from './cols'

const DescriptionListItem = DescriptionList.Item

export default {
  name: 'CaseInfo',
  components: {
    AnchorLayout,
    DescriptionList,
    DescriptionListItem
  },
  data () {
    return {
      noPadding: { padding: 0 },
      varCols,
      vars: [{ id: 1, name: 'test', expression: 'T(java.lang.String).valueOf(#a + @Query.data)' }],
      headerCols,
      headers: [{ id: 1, key: 'x-auth-token', value: '@Login.token' }, { id: 2, key: 'custom', value: 'constant value' }],
      assertionCols,
      assertions: [],
      setupTeardownCols,
      setups: [{ id: 1, type: '数据库', expression: 'insert into t (id, name) values (1, "test")' }],
      teardowns: [{ id: 1, type: '数据库', expression: 'delete from t where id = 1' }],
      reqParamCols: [
        {
          title: 'key',
          dataIndex: 'key'
        },
        {
          title: 'value',
          dataIndex: 'value'
        },
        operation
      ],
      reqForm: [],
      reqBody: '{"TODO": true}'
    }
  },
  methods: {
  }
}
</script>
