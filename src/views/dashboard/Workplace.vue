<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
      <div class="title">
        {{ timeFix }}，{{ nickname }}
        <span class="welcome-text">，{{ welcome }}</span>
      </div>
      <div>
        {{ userInfo.roles[0].name }}
        <a-tooltip placement="bottom" v-if="userInfo.roles.length > 1">
          <template slot="title">
            <span>{{ userInfo.roles.map(r => r.name).join('、') }}</span>
          </template>
          ...
        </a-tooltip>
        &nbsp;|&nbsp;
        {{ userInfo.teams[0].name }}
        <a-tooltip placement="bottom" v-if="userInfo.teams.length > 1">
          <template slot="title">
            <span>{{ userInfo.teams.map(t => t.name).join('、') }}</span>
          </template>
          ...
        </a-tooltip>
      </div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="6">
          <head-info title="项目数" :content="totals.projects" :center="false" :bordered="false" />
        </a-col>
        <a-col :span="6">
          <head-info title="接口数" :content="totals.apis" :center="false" :bordered="false" />
        </a-col>
        <a-col :span="6">
          <head-info title="用例数" :content="totals.cases" :center="false" :bordered="false" />
        </a-col>
        <a-col :span="6">
          <head-info title="任务数" :content="totals.tasks" :center="false" />
        </a-col>
      </a-row>
    </div>

    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="近期项目"
            :body-style="{ padding: 0 }"
          >
            <a slot="extra">全部项目</a>
            <div v-if="projects.length > 0">
              <a-card-grid class="project-card-grid" :key="index" v-for="(item, index) in projects">
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a-avatar
                        size="small"
                        :style="{ backgroundColor: colorList[index % colorList.length]}"
                      >{{ item.name.charAt(0) }}</a-avatar>
                      <a>{{ item.name }}</a>
                    </div>
                    <div slot="description" class="card-description">{{ item.description }}</div>
                  </a-card-meta>
                  <div class="project-item">
                    <a>{{ item.team.name }}</a>
                    <span class="datetime">{{ moment(item.createTime).fromNow() }}</span>
                  </div>
                </a-card>
              </a-card-grid>
            </div>
            <div v-else class="ant-list-empty-text">暂无数据</div>
          </a-card>

          <a-card :loading="loading" title="任务动态" :bordered="false">
            <a slot="extra">全部任务</a>
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <a-avatar
                    slot="avatar"
                    :icon="item.success ? 'check' : 'close'"
                    :style="{backgroundColor: item.success ? '#52c41a' : '#f5222d'}"
                  />
                  <div slot="title">
                    任务&nbsp;
                    <a href="#">{{ item.name }}</a>&nbsp;执行
                    <span>{{ item.success ? '成功' : '失败' }}</span>&nbsp;
                    <span>{{ `[总数: ${item.total}, 成功: ${item.pass}, 失败: ${item.fail}]` }}</span>&nbsp;
                    <a href="#">执行报告</a>
                  </div>
                  <div slot="description">{{ moment(item.createTime).fromNow() }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>

        <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" title="团队" style="margin-bottom: 24px" :bordered="false">
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in teams" :key="index">
                  <a>
                    <a-avatar
                      size="small"
                      :style="{ backgroundColor: colorList[index % colorList.length]}"
                    >{{ item.name.charAt(0) }}</a-avatar>
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>
          <a-card title="案例标签" :loading="loading" :bordered="false">
            <tag-cloud v-if="tags.length > 0" :data="tags" />
            <div v-else class="ant-list-empty-text">暂无数据</div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-view>
</template>

<script>
import moment from 'moment'
import { timeFix } from '@/utils/util'
import { mapGetters } from 'vuex'

import { PageView } from '@/layouts'
import { TagCloud } from '@/components'
import HeadInfo from '@/components/tools/HeadInfo'

import { getTotals, getTags } from '@/api/statistic'
import { getProjects } from '@/api/project'
import { getTasks } from '@/api/task'

export default {
  name: 'Workplace',
  components: {
    PageView,
    HeadInfo,
    TagCloud
  },
  data () {
    return {
      colorList: ['#87d068', '#f56a00', '#7265e6', '#ffbf00', '#00a2ae'],
      timeFix: timeFix(),
      avatar: '',
      user: null,
      totals: { projects: '0', apis: '0', cases: '0', tasks: '0' },

      projects: [],
      loading: true,
      activities: [],
      teams: [],
      tags: []
    }
  },
  computed: {
    ...mapGetters([
      'nickname',
      'welcome',
      'userInfo'
    ])
  },
  created () {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar
    this.teams = this.userInfo.teams
  },
  mounted () {
    this.getData()
  },
  methods: {
    moment,
    getData () {
      const that = this
      function processTotals (resp) {
        const data = resp.data
        that.totals.projects = data.projects.toString()
        that.totals.apis = data.apis.toString()
        that.totals.cases = data.cases.toString()
        that.totals.tasks = data.tasks.toString()
      }
      function processProjects (resp) {
        that.projects = resp.data.data
      }
      function processTasks (resp) {
        that.activities = resp.data
      }
      function processTags (resp) {
        that.tags = resp.data
      }
      const p1 = getTotals()
      const p2 = getProjects({ page: 0, size: 6 })
      const p3 = getTasks({ page: 0, size: 6 })
      const p4 = getTags()
      Promise.all([p1, p2, p3, p4])
        .then(results => {
          processTotals(results[0])
          processProjects(results[1])
          processTasks(results[2])
          processTags(results[3])
        })
        .catch(e => e)
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }
  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }
    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }
  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;
  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;
    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }
    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>
