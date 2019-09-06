<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="5">
        <a-input-search placeholder="搜索" style="width: 100%; margin-bottom: 1rem" />
        <a-tree
          showLine
          showIcon
          :loadData="onLoadData"
          :treeData="treeData"
          :defaultSelectedKeys="['root']"
          :expandedKeys.sync="expandedKeys"
        >
          <a-icon slot="project" type="project" />
          <a-icon slot="api" type="api" />
          <a-icon slot="case" type="rocket" />
        </a-tree>
      </a-col>
      <a-col :span="19">
        <route-view></route-view>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { RouteView } from '@/layouts'
import { getApisByProjectId } from '@/api/api'
import { getCasesByApiId } from '@/api/case'

export default {
  name: 'ProjectDetail',
  components: {
    RouteView
  },
  data () {
    return {
      root: null,
      treeData: [],
      expandedKeys: []
    }
  },
  mounted () {
    this.initTreeData(this.$route.params.id)
  },
  methods: {
    onLoadData (treeNode) {
      return new Promise(resolve => {
        const node = treeNode.dataRef
        if (node.children || node.type !== 'a') {
          resolve()
          return
        }
        const projectId = this.$route.params.id
        const apiId = node.id
        getCasesByApiId(projectId, apiId).then(resp => {
          node.children = resp.data.map(d => {
            return {
              id: d.id,
              title: d.name,
              key: `${apiId}-${d.id}`,
              type: 'c',
              scopedSlots: { icon: 'case' },
              isLeaf: true
            }
          })
          this.treeData = [...this.treeData]
          resolve()
        })
      })
    },
    initTreeData (projectId) {
      getApisByProjectId(projectId).then(resp => {
        this.root = { id: this.$route.params.id, title: this.$route.query.name, key: 'root', type: 'p', scopedSlots: { icon: 'project' } }
        this.root.children = resp.data.map(d => {
          return {
            id: d.id,
            title: d.name,
            key: d.id,
            type: 'a',
            scopedSlots: { icon: 'api' }
          }
        })
        this.treeData.push(this.root)
        this.expandedKeys.push('root')
      }).catch(e => e)
    }
  }
}
</script>
