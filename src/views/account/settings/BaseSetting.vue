<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form layout="vertical">
          <a-form-item label="昵称">
            <a-input placeholder="给自己起个名字" />
          </a-form-item>
          <a-form-item label="个性签名">
            <a-textarea rows="4" placeholder="You are not alone." />
          </a-form-item>

          <a-form-item label="电子邮件" :required="false">
            <a-input placeholder="exp@admin.com" />
          </a-form-item>

          <a-form-item>
            <a-button type="primary">提交</a-button>
            <a-button style="margin-left: 8px">保存</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
