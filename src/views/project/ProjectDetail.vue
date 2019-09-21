<template>
  <a-spin :spinning="spinning">
    <a-card :bordered="false" class="spin-content">
      <a-row :gutter="20">
        <a-col :span="5">
          <a-input-search placeholder="搜索" style="width: 100%; margin-bottom: 1rem" />
          <a-tree
            showLine
            showIcon
            :loadData="onLoadData"
            :treeData="treeData"
            :defaultSelectedKeys="['root']"
            :expandedKeys.sync="expandedKeys"
            @select="onTreeSelect"
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
  </a-spin>
</template>

<script>
import { RouteView } from '@/layouts'
import { getProjectNameById } from '@/api/project'
import { getApisByProjectId } from '@/api/api'
import { getCasesByApiId } from '@/api/case'

export default {
  name: 'ProjectDetail',
  components: {
    RouteView
  },
  data () {
    return {
      spinning: true,
      root: null,
      treeData: [],
      expandedKeys: []
    }
  },
  mounted () {
    this.initTreeData(this.$route.params.projectId)
  },
  methods: {
    onLoadData (treeNode) {
      return new Promise(resolve => {
        const node = treeNode.dataRef
        if (node.children || node.type !== 'a') {
          resolve()
          return
        }
        const projectId = this.$route.params.projectId
        const apiId = node.id
        getCasesByApiId(projectId, apiId).then(resp => {
          node.children = resp.data.map(d => {
            return {
              id: d.id,
              apiId: d.apiId,
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
    /**
     * e:{selected: bool, selectedNodes, node, event}
     */
    onTreeSelect (selectedKeys, e) {
      const { dataRef } = e.node
      if (!e.selected) {
        // 禁止取消选择
        selectedKeys.push(dataRef.key)
      } else {
        const { id } = dataRef
        switch (dataRef.type) {
          case 'p':
            this.$router.push({ name: 'ProjectInfo', params: { projectId: id } })
            break
          case 'a':
            this.$router.push({ name: 'ApiInfo', params: { projectId: this.root.id, apiId: id } })
            break
          case 'c':
            this.$router.push({ name: 'CaseInfo', params: { projectId: this.root.id, apiId: dataRef.apiId, caseId: id } })
            break
          default:
            break
        }
      }
    },
    initTreeData (projectId) {
      const p1 = getProjectNameById(projectId)
      const p2 = getApisByProjectId(projectId)
      Promise.all([p1, p2])
        .then(results => {
          const name = results[0].data
          const apis = results[1].data
          this.root = { id: this.$route.params.projectId, title: name, key: 'root', type: 'p', scopedSlots: { icon: 'project' } }
          this.root.children = apis.map(d => {
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
        })
        .catch(e => e)
        .finally(() => {
          this.spinning = false
        })
    }
  }
}
</script>
